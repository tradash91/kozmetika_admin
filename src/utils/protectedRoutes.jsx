import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../api/apiAuth";
import { useEffect } from "react";
import { supabase } from "../api/supabase";
import { getNotifications } from "../api/giftcard";

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

  if (isLoading ) return <h1>...loading</h1>;

  if (isAuthenticated) return children;
}
/* function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isLoading, data: user } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/"); // login page
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <h1>...loading</h1>;

  if (isAuthenticated) return children;

  return null;
} */

export default ProtectedRoute;
