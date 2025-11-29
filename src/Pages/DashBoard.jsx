import { Link, Outlet } from "react-router";
import styled from "styled-components";
import { flex } from "../styles/GlobalStyles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/apiAuth";
import { getNotifications } from "../api/giftcard";
import { useNotifications } from "../context/NotificationsContext";
import { supabase } from "../api/supabase";

import { h1 } from "motion/react-client";
import { useEffect } from "react";
import { useRealTimeNotifications } from "../hooks/useRealTimeNotifications";
const StyledDashboardNav = styled.nav`
  ${flex("row")}
  gap: 5rem;
  font-size: 18px;
  font-weight: 400;
  background-color: var(--blue-600);
  color: var(--neutral-0);
  padding: 1rem 3rem;

  a {
    &:hover {
      transform: scale(1.1);
    }
  }
  .counterWrapper {
    position: relative;
    .counter {
    background-color: var(--red-500);
  ${flex('column')}
    
  top: 0;
  right: -35px;
 width: 30px;
 height: 30px;
  position: absolute;
  font-size: 12px;
  border-radius:50%;
    }
  }
`;
const StyledCounter = styled.span`
 
`
function DashBoard() {
 /*  const {notifications} = useNotifications(); */
 
 const { data: notifications,isLoading } = useQuery({
   queryKey: ["getNotifications"],
   staleTime:50,
   queryFn: getNotifications,
  });
  

 
  useRealTimeNotifications()

  const { mutate } = useMutation({
    mutationFn: logout,
  });


  return (
    <div>
     
      <nav>
        <StyledDashboardNav>
          <Link to={"settings"}>Beállítások</Link>
          <Link to={"blog"}>Blog</Link>
          <Link to={"services"}>Szolgáltatások</Link>
          <div className="counterWrapper">
          <Link to={"giftcard"}>
            Ajándék kártyák 
          {notifications?.length > 0 && <div className="counter">{ `${notifications?.length}`}</div>}
          </Link>
          </div>
          <Link
            style={{
              padding: "0 1rem",
              backgroundColor: "var(--neutral-0)",
              color: "var(--red-700)",
              marginLeft: "auto",
            }}
            onClick={() => {
              mutate();
            }}
            to={"/"}
          >
            Kijelentkezés
          </Link>
        </StyledDashboardNav>
      </nav>
      <Outlet />
    </div>
  );
}

export default DashBoard;
