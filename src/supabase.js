import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dybnfvdafvytvgrgzdek.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5Ym5mdmRhZnZ5dHZncmd6ZGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2NjA5ODQsImV4cCI6MjAwMjIzNjk4NH0.CrCjCapyvld7d5GWc3F0TJOErFnHd4_q9szqJyq0Bi8";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
