import { Link, Outlet } from "react-router";
import styled, { css } from "styled-components";
import { flex } from "../styles/GlobalStyles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/apiAuth";
import { getNotifications } from "../api/giftcard";
import { useNotifications } from "../context/NotificationsContext";
import { supabase } from "../api/supabase";

import { h1 } from "motion/react-client";
import { useEffect, useState } from "react";
import { useRealTimeNotifications } from "../hooks/useRealTimeNotifications";
import { Hamburger } from "../components/Hamburger";
const StyledDashboardNav = styled.nav`
  ${flex("row")}
  gap: 5rem;
  font-size: 18px;
  font-weight: 400;
  background-color: var(--blue-600);
  color: var(--neutral-0);
  padding: 1rem 3rem;
z-index: 40;
  @media (max-width:780px) {
    width: 80%;
    position: absolute;
    height: 100dvh;
    right: 0;
    flex-direction: column;
    display: none;
    
     ${({ $open }) =>
      $open &&
      css`
        display: flex;
      `}
  }

  .logoutBtn {
    
              padding: 0 1rem;
              background-color: var(--neutral-0);
              color:var(--red-700);
              margin-left: auto;

               @media (max-width:780px) {
               margin-left: 0%;
                  }
  }



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
const StyledHamburger = styled.div`
display: none;
 cursor: pointer;
  width: 25px;
  height: 20px;
  position: absolute;
  z-index: 99;
  top: 10px;
  right: 10px;
  @media (max-width:780px) {
    display: block;
  }
   div {
      position: absolute;
      width: 100%;
      height: 3px;
      background: #161616;
      border-radius: 3px;
      left: 0;
      transition: 0.3s ease;
  
      &:nth-child(1) {
        top: 0;
      }
      &:nth-child(2) {
        top: 8px;
      }
      &:nth-child(3) {
        top: 16px;
      }
    }
  
    ${({ $open }) =>
      $open &&
      css`
        div:nth-child(1) {
          transform: rotate(45deg);
          top: 8px;
        }
        div:nth-child(2) {
          opacity: 0;
        }
        div:nth-child(3) {
          transform: rotate(-45deg);
          top: 8px;
        }
      `}
`
function DashBoard() {
 /*  const {notifications} = useNotifications(); */
 const [isOpen,setIsOpen] = useState(false)
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
    <div style={{position:"relative",zIndex:"1"}}>
     {/*  <Hamburger/> */}
    
          <StyledHamburger $open={isOpen} onClick={()=>{setIsOpen((open)=>!open)}} >
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
     </StyledHamburger>
        <StyledDashboardNav $open={isOpen}>
          <Link onClick={()=>{setIsOpen(false)}} to={"settings"}>Beállítások</Link>
          <Link onClick={()=>{setIsOpen(false)}} to={"blog"}>Blog</Link>
          <Link onClick={()=>{setIsOpen(false)}} to={"services"}>Szolgáltatások</Link>
          <div className="counterWrapper">
          <Link onClick={()=>{setIsOpen(false)}} to={"giftcard"}>
            Ajándék kártyák 
          {notifications?.length > 0 && <div className="counter">{ `${notifications?.length}`}</div>}
          </Link>
          </div>
          <Link
          className="logoutBtn"
            style={{
              
            }}
            onClick={() => {
              mutate();
            }}
            to={"/"}
          >
            Kijelentkezés
          </Link>
        </StyledDashboardNav>
      
      <Outlet />
    </div>
  );
}

export default DashBoard;
