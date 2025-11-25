import { useState } from "react";
import OrderInitiates from "./OrderInitiates";
import Orders from "./Orders";
import { useRealTimeNotifications } from "../hooks/useRealTimeNotifications";

function GiftCard({ notifications }) {
  const [view, setView] = useState(true);
   useRealTimeNotifications()
  return (
    <main>
      <nav>
        <button
          style={{ backgroundColor: view && "var(--green-500)" }}
          onClick={() => {
            setView(true);
          }}
        >
          Megerősített
        </button>
        <button
          style={{ backgroundColor: !view && "var(--green-500)" }}
          onClick={() => {
            setView(false);
          }}
        >
          Kérelmek
        </button>
      </nav>

      {view ? <Orders notifications={notifications} /> : <OrderInitiates />}
    </main>
  );
}

export default GiftCard;
