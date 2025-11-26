import { duration } from "@mui/material";
import { supabase } from "./supabase";

export async function getServices() {
  const { data, error } = await supabase.from("categories").select(`
      id,
      name,
      bg_url,
      num,
      isActive,  
      sub_categories (
        id,
        category_id,
        name,
        description,
        duration,
        price,
        details,
        category_name,
        isActive
      )
    `);

  if (error) {
    console.error(error);
    return [];
  }
const filteredData = data.sort((a,b)=>a.num-b.num)
  return filteredData;
}

export async function createMainCategory({ name, bg_url, num }) {
  const { data, error } = await supabase
    .from("categories")
    .insert([{ name: name, bg_url: bg_url, num }])
    .select();
}

export async function createSubCategory({
  category_id,
  name,
  description,
  duration,
  price,
  details,
  category_name,
}) {
  const { data, error } = await supabase
    .from("sub_categories")
    .insert([
      {
        category_id,
        name,
        description,
        duration,
        price,
        details,
        category_name,
      },
    ])
    .select();
}

export async function deleteMainCategory(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
}

export async function deleteSubCategory(id) {
  const { error } = await supabase.from("sub_categories").delete().eq("id", id);
}

export async function updateMainCategoryName({ id, val, field }) {
  const { data, error } = await supabase
    .from("categories")
    .update({ [field]: val })
    .eq("id", id)
    .select();
}

export async function getSubcategory() {
  let { data: sub_categories, error } = await supabase
    .from("sub_categories")
    .select("*");

  return sub_categories;
}

export async function updateSubcategory({ id, val }) {
  const { error } = await supabase
    .from("sub_categories")
    .update({
      name: val.name,
      description: val.description,
      duration: val.duration,
      price: val.price,
      details: val.details,
      category_id: val.subCategoryID,
      category_name: val.subCategoryName,
      isActive: val.isActive,
    })
    .eq("id", id)
    .select();
  console.log(val);
}
