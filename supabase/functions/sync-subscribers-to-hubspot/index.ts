
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

// Constants
const HUBSPOT_API_KEY = Deno.env.get("HUBSPOT_API_KEY") || "";
const SUPABASE_URL = "https://nmgzwxqrfawknamqtxfn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZ3p3eHFyZmF3a25hbXF0eGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2Mjc0NDcsImV4cCI6MjA2MjIwMzQ0N30.ASQ17GmI2q5xx8_rYUdFiFgUaj2oBdjhOp-igt4x-BI";
const BATCH_SIZE = 50;
const SERVICE_NAME = "hubspot_waitlist";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Get the last synchronization metadata
 */
async function getSyncMetadata() {
  const { data, error } = await supabase
    .from("sync_metadata")
    .select("last_synced_at, records_processed")
    .eq("service_name", SERVICE_NAME)
    .maybeSingle();
  
  if (error) {
    console.error("Error fetching sync metadata:", error);
    throw error;
  }
  
  return data;
}

/**
 * Update sync metadata with new timestamp and records count
 */
async function updateSyncMetadata(status: string, recordsProcessed: number) {
  const { error } = await supabase
    .from("sync_metadata")
    .update({ 
      last_synced_at: new Date().toISOString(),
      status,
      records_processed: recordsProcessed
    })
    .eq("service_name", SERVICE_NAME);
  
  if (error) {
    console.error("Error updating sync metadata:", error);
    throw error;
  }
}

/**
 * Get new subscribers since last sync
 */
async function getNewSubscribers(lastSyncedAt: string) {
  const { data, error } = await supabase
    .from("waitlist_subscribers")
    .select("email, source, created_at")
    .gt("created_at", lastSyncedAt)
    .order("created_at", { ascending: true })
    .limit(BATCH_SIZE);
  
  if (error) {
    console.error("Error fetching new subscribers:", error);
    throw error;
  }
  
  return data || [];
}

/**
 * Format subscribers for HubSpot batch import
 */
function formatForHubSpot(subscribers: any[]) {
  return subscribers.map(subscriber => ({
    email: subscriber.email,
    properties: {
      email: subscriber.email,
      source: subscriber.source || "landing_page",
      created_at: subscriber.created_at,
      waitlist_signup_date: new Date(subscriber.created_at).toISOString().split('T')[0],
      lifecyclestage: "lead"
    }
  }));
}

/**
 * Send contacts to HubSpot
 */
async function sendToHubSpot(contacts: any[]) {
  if (contacts.length === 0) {
    return { status: "success", message: "No new contacts to send" };
  }

  if (!HUBSPOT_API_KEY) {
    throw new Error("HUBSPOT_API_KEY environment variable is not set");
  }

  try {
    // HubSpot API endpoint for batch creating contacts
    const endpoint = "https://api.hubapi.com/crm/v3/objects/contacts/batch/create";
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${HUBSPOT_API_KEY}`
      },
      body: JSON.stringify({
        inputs: contacts
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("HubSpot API error:", errorData);
      throw new Error(`HubSpot API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { status: "success", results: result };

  } catch (error) {
    console.error("Error sending contacts to HubSpot:", error);
    throw error;
  }
}

/**
 * Main function to sync subscribers to HubSpot
 */
async function syncSubscribersToHubSpot() {
  try {
    // Get last sync timestamp
    const metadata = await getSyncMetadata();
    const lastSyncedAt = metadata?.last_synced_at || new Date(0).toISOString();
    
    // Update status to indicate sync is in progress
    await updateSyncMetadata("syncing", metadata?.records_processed || 0);
    
    // Get new subscribers
    const subscribers = await getNewSubscribers(lastSyncedAt);
    console.log(`Found ${subscribers.length} new subscribers since ${lastSyncedAt}`);
    
    if (subscribers.length > 0) {
      // Format and send to HubSpot
      const hubspotContacts = formatForHubSpot(subscribers);
      const result = await sendToHubSpot(hubspotContacts);
      
      // Update sync metadata with success status and new count
      await updateSyncMetadata(
        "success", 
        (metadata?.records_processed || 0) + subscribers.length
      );
      
      return { 
        success: true,
        message: `Synchronized ${subscribers.length} subscribers to HubSpot`,
        details: result
      };
    } else {
      // No new subscribers
      await updateSyncMetadata("success", metadata?.records_processed || 0);
      
      return { 
        success: true,
        message: "No new subscribers to synchronize",
        lastSyncedAt
      };
    }
    
  } catch (error) {
    console.error("Error synchronizing to HubSpot:", error);
    
    // Update sync metadata with error status
    try {
      await updateSyncMetadata(`error: ${error.message}`, 0);
    } catch (updateError) {
      console.error("Could not update sync status:", updateError);
    }
    
    return { 
      success: false, 
      error: error.message,
      stack: error.stack
    };
  }
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Run the sync process
    const result = await syncSubscribersToHubSpot();
    
    // Return the response
    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error("Unhandled error in edge function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});
