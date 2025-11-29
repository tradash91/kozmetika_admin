import styled, { css } from "styled-components";

export const Hamburger = styled.div`
  
  cursor: pointer;
  width: 25px;
  height: 20px;
  position: relative;
  z-index: 9999999999999;
  
    
  @media (max-width: 780px) {
    display: block;
    z-index: 9999;
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
`;


