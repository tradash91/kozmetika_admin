import { BrowserRouter, Route, Routes } from "react-router";

import GlobalStyles from "./styles/GlobalStyles";

import { useReducer } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContext, initialState, reducer } from "./context/Appcontext";
import Login from "./Pages/Login";
import ProtectedRoute from "./utils/protectedRoutes";
import Settings from "./Pages/Settings";
import DashBoard from "./Pages/DashBoard";
import Blog from "./Pages/Blog";
import Services from "./Pages/Services";
import GiftCard from "./Pages/GiftCard";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
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
              <Route path="giftcard" element={<GiftCard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
