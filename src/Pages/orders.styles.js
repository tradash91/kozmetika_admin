import styled from "styled-components";
import { flex } from "../styles/GlobalStyles";
import { style } from "motion/react-client";

export const StyledOrder = styled.div`
  cursor: pointer;
  font-size: 14px;
  border-bottom: 1px solid #000;
  position: relative;
  padding: 1rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  
  .nav {
    ${flex('row')}
    gap: 1rem;
    align-self: start;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  p {
    span {
      font-weight: 500;
    }
    align-self: start;
  }
  @media (max-width:780px) {
    ${flex('column')}
  }
`;

export const StyledNotificationIcon = styled.div`
  background-color: #509b50ff;
  display: grid;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 50px;
  height: 50px;
  right: 40px;
  top: 50%;
  border-radius: 50%;
  color: white;
  font-size: 25px;
  font-weight: 600;
  padding-top: 0 !important;
   @media (max-width:780px) {
   top: 5px;
   right: 5px;
   width: 20px;
   height: 20px;
   font-size: 12px;
  }
`;

export const StyledOrdersWrapper = styled.main`
  padding: 5rem;
z-index: 1;

display: block;
  div {
    padding-top: 1rem;
    h1 {
      text-align: center;
    }
  }
`;

export const StyledPagination = styled.nav`
  ${flex("row")}
  align-items: center;
  font-size: 16px;
  width: 100%;
  gap: 1rem;
  padding: 3rem;
`;

export const StyledOrderButton = styled.button`
  background-color: #33a756;
  color: var(--neutral-0);
`;
