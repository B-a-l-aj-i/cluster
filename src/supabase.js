import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oybbnxxntubkdjajiwjr.supabase.co'
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95YmJueHhudHVia2RqYWppd2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4Njk0NjcsImV4cCI6MjA0NjQ0NTQ2N30.vVp2qBZWk13VErDBwvWT6J-M2MQJ43hL1xthgHxk-l8"

const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;
