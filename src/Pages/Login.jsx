import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { adminLogin } from "../api/apiAuth";
import LoadingPage from "../components/LoadingPage";

const StyledLoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  gap: 2rem;
  button {
    background-color: var(--indigo-200);
    color: #000;
    padding: 1rem 3rem;
  }
`;

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate,
    isLoading: isLoginLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => adminLogin({ email, password }),
    onSuccess: () => {
      navigate("/admin");
      console.log("logged in");
    },
    onError: () => {
      console.log(error);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    mutate({ email, password });
  }

  if (isLoginLoading) return <LoadingPage/>;

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        required
        value={email}
        type="email"
        autoComplete="username"
        id="email"
        disabled={isLoginLoading}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <label htmlFor="password">Jelszó</label>

      <input
        required
        value={password}
        type="password"
        id="password"
        disabled={isLoginLoading}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Bejelentkezés</button>
    </StyledLoginForm>
  );
}

export default Login;
