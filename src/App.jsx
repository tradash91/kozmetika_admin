import { BrowserRouter, Route, Routes } from "react-router";

import GlobalStyles from "./styles/GlobalStyles";

import { useEffect, useReducer } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AppContext, initialState, reducer } from "./context/Appcontext";
import Login from "./Pages/Login";
import ProtectedRoute from "./utils/protectedRoutes";
import Settings from "./Pages/Settings";
import DashBoard from "./Pages/DashBoard";
import Blog from "./Pages/Blog";
import Services from "./Pages/Services";
import GiftCard from "./Pages/GiftCard";
import { getNotifications } from "./api/giftcard";
import { h1 } from "motion/react-client";
import { supabase } from "./api/supabase";
import { NotificationsContext } from "./context/NotificationsContext";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: notifications, isLoading } = useQuery({
    queryFn: getNotifications,
    queryKey: ["getNotifications"],
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        (payload) => {
          console.log("Realtime változás:", payload);

          // ha új megrendelés jön → újra fetch
          queryClient.invalidateQueries(["getNotifications"]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) return <h1>...Betöltés</h1>;

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <GlobalStyles />
      <NotificationsContext.Provider value={notifications}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <DashBoard notifications={notifications} />
                </ProtectedRoute>
              }
            >
              <Route path="settings" element={<Settings />} />
              <Route path="blog" element={<Blog />} />
              <Route path="services" element={<Services />} />
              <Route
                path="giftcard"
                element={<GiftCard notifications={notifications} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationsContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
