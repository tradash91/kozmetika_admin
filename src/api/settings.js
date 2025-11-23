import { supabase } from "./supabase";

export async function getOpeningHours() {
  let { data, error } = await supabase.from("opening_hours").select("*");
  return data;
}

export async function getSettings() {
  let { data: Settings, error } = await supabase.from("Settings").select("*");
  return Settings;
}

export async function getSocial() {
  let { data: social_links, error } = await supabase
    .from("social_links")
    .select("*");

  return social_links;
}

export async function getContacts() {
  let { data: contacts, error } = await supabase.from("contacts").select("*");
  return contacts;
}

export async function updateOpeningHour({ id, time }) {
  const { error } = await supabase
    .from("opening_hours")
    .update({ time: time })
    .eq("id", id);
}

export async function updateLinks({ id, data }) {
  const { error } = await supabase
    .from("social_links")
    .update({ link: data })
    .eq("id", id);
}

export async function updateSettings({ id, data }) {
  const { error } = await supabase
    .from("Settings")
    .update({ value: data })
    .eq("id", id);
}

export async function updateContacts({ id, data }) {
  const { error } = await supabase
    .from("contacts")
    .update({ address: data })
    .eq("id", id);
}
