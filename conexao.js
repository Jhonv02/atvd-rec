import { createClient } from "@supabase/supabase-js";
const link = "https://amswnalbdampzijgghne.supabase.co"
const chave = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtc3duYWxiZGFtcHppamdnaG5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NjAwNjAsImV4cCI6MjAzNDIzNjA2MH0.m7K1FvRI0il2TSMK5_Jc2GkMfvQxOGqNfCQSZVVNv6g"
export const supabase = createClient(link, chave);
