import { useState } from "react";
import OrderInitiates from "./OrderInitiates";
import Orders from "./Orders";
import { useRealTimeNotifications } from "../hooks/useRealTimeNotifications";
import styled from "styled-components";
import { StyledOrdersWrapper } from "./orders.styles";
import { flex } from "../styles/GlobalStyles";


const StyledNav = styled.nav`
  ${flex('row')}
  gap: 1rem;
  align-items: center;
  width: 100%;
  font-size: 20px;

  button {
    padding: 1rem 3rem;
  }

`

function GiftCard({ notifications }) {
  const [view, setView] = useState(true);
   useRealTimeNotifications()
   
  return (
    <StyledOrdersWrapper>
      <StyledNav>
        <button
          style={{ backgroundColor: view && "var(--green-500)" ,color: view && "#faf9f9"  }}
          onClick={() => {
            setView(true);
          }}
        >
          Megerősített
        </button>
        <button
          style={{ backgroundColor: !view && "var(--green-500)",color: !view && "#faf9f9" }}
          onClick={() => {
            setView(false);
          }}
        >
          Kérelmek
        </button>
      </StyledNav>

      {view ? <Orders notifications={notifications} /> : <OrderInitiates />}
    </StyledOrdersWrapper>
  );
}

export default GiftCard;
