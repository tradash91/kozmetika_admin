import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function adminLogin({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error("bad email or pass");

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("bad email or pass");

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
}
