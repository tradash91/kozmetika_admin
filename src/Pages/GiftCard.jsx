import { useState } from "react";
import { supabase } from "../api/supabase";

function GiftCard() {
  const [test, setTest] = useState("");
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch(
            "https://ddvnuqohudlphhbsdtzg.supabase.co/functions/v1/rapid-handler",
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ test }),
            }
          );
        }}
      >
        <input
          onChange={(e) => {
            setTest(e.target.value);
          }}
          type="text"
        />
        <button type="submit">ok</button>
      </form>
    </div>
  );
}

export default GiftCard;
