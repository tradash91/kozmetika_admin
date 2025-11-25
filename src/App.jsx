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
import { supabase } from "./api/supabase";


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
          queryClient.invalidateQueries({ queryKey: ["getNotifications"] });

        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);


  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <GlobalStyles />
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              }
            >
              <Route path="settings" element={<Settings />} />
              <Route path="blog" element={<Blog />} />
              <Route path="services" element={<Services />} />
              <Route
                path="giftcard"
                element={<GiftCard />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
     
    </AppContext.Provider>
  );
}

export default App;
