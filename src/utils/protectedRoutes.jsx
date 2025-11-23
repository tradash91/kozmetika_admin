import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../api/apiAuth";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  ///Load the authenticated user

  const { isLoading, data: user } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });
  const isAuthenticated = user?.role === "authenticated";
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/admin");
    },
    [isAuthenticated, navigate, isLoading]
  );

  if (isLoading) return <h1>...loading</h1>;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
