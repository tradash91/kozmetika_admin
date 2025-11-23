export const uploadImage = async (setIsImageUploading, folder_name, image) => {
  setIsImageUploading(true);
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", folder_name); // unsigned preset neve
  formData.append("folder", folder_name); // 👈 ide a mappaneved Cloudinaryban

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dap5ov8qg/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  setIsImageUploading(false);
  const data = await res.json();
  return data.secure_url; // visszaadja a feltöltött kép URL-jét
};
