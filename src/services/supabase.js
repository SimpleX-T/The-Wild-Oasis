import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mywivwpgcuxoiwpzswwl.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15d2l2d3BnY3V4b2l3cHpzd3dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyNDg4OTYsImV4cCI6MjAzMTgyNDg5Nn0.fcmZn9qM3pDEEJebI2CYda-f6knWq-jPZNojirXPL_o";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
