import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deletePost, getBlogPosts, uploadBlogPost } from "../api/Blog";
import styled from "styled-components";
import { flex } from "../styles/GlobalStyles";
import { useRealTimeNotifications } from "../hooks/useRealTimeNotifications";
const StyledPostsWrapper = styled.main`
  padding: 0 5rem;
`;
const StyledPosts = styled.div`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }

  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background-color: #80808022;
    padding: 3rem 2rem;
    img {
      width: 150px;
    }

    h2 {
      font-size: 2.5rem;
      grid-column: 1/3;
      grid-row: 1/3;
    }
    p {
      font-size: 1.5rem;
    }
    button {
      font-size: 1.5rem;
      grid-row: 1/4;
      grid-column: 3;
      align-self: center;
      justify-self: center;
      background-color: red;
      color: white;
    }
  }
`;
const StyledForm = styled.form`
  ${flex("column")}
  gap: 2rem;
  padding: 2rem 0;
  font-size: 18px;
  textarea {
    resize: none;
    width: 200px;
    height: 130px;
  }
  button {
    background-color: #2cad2c;
    color: white;
  }
`;
function Blog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const queryClient = useQueryClient();
  let url;
  const { isPending, mutate } = useMutation({
    mutationFn: ({ title, body, url }) => uploadBlogPost({ title, body, url }),
    mutationKey: ["uploadPost"],
    onSuccess: () => {
      queryClient.invalidateQueries("getPost");
    },
  });
  const { isPending: isDeleting, mutate: mutateDeletePost } = useMutation({
    mutationFn: deletePost,
    mutationKey: ["dsada"],
    onSuccess: () => {
      queryClient.invalidateQueries("getPost");
    },
  });
  const { isLoading, data } = useQuery({
    queryFn: getBlogPosts,
    queryKey: ["getPost"],
  });

  const uploadImage = async () => {
    setIsImageUploading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "blog_post"); // unsigned preset neve
    formData.append("folder", "blog_posts"); // 👈 ide a mappaneved Cloudinaryban

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) url = await uploadImage();

    // 2️⃣ DB mentés
    mutate({ title, body, url });
    url = "";
  };

 useRealTimeNotifications()

  if (isPending || isLoading || isImageUploading || isDeleting)
    return <h1>...Betöltés</h1>;
  console.log(data);
  return (
    <StyledPostsWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <input
          placeholder="Cím"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
        />

        <textarea
          placeholder="Szöveg"
          onChange={(e) => setBody(e.target.value)}
          id="body"
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Feltöltés</button>
      </StyledForm>
      <StyledPosts>
        <ul>
          {data.map((post) => {
            return (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                {post.img_url && <img src={post.img_url} alt="" />}
                <button
                  onClick={() => {
                    mutateDeletePost(post.id);
                  }}
                >
                  Törlés
                </button>
              </li>
            );
          })}
        </ul>
      </StyledPosts>
    </StyledPostsWrapper>
  );
}

export default Blog;
