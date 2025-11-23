import { supabase } from "./supabase";

export async function uploadBlogPost({ title, body, url }) {
  const { data, error } = await supabase
    .from("blog")
    .insert({ title, body, img_url: url })
    .select();
}

export async function getBlogPosts() {
  let { data, error } = await supabase.from("blog").select("*");
  return data;
}

export async function deletePost(id) {
  console.log(id);
  const { error } = await supabase.from("blog").delete().eq("id", id);
}
