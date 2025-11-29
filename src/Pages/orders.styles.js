import styled from "styled-components";
import { flex } from "../styles/GlobalStyles";
import { style } from "motion/react-client";

export const StyledOrder = styled.div`
  cursor: pointer;
  font-size: 14px;
  border-bottom: 1px solid #000;
  position: relative;
  padding: 1rem;

  p {
    span {
      font-weight: 500;
    }
  }
`;

export const StyledNotificationIcon = styled.div`
  background-color: #509b50ff;
  ${flex("column")}
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 50px;
  height: 50px;
  right: 40px;
  top: 20px;
  border-radius: 50%;
  color: white;
  font-size: 25px;
  font-weight: 600;
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
