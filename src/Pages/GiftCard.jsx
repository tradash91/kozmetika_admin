import { useState } from "react";
import OrderInitiates from "./OrderInitiates";
import Orders from "./Orders";






function GiftCard() {
  const [view,setView] = useState(true)
return (<main>
  <nav><button style={{backgroundColor: view && 'var(--green-500)'}} onClick={()=>{setView(true)}} >Megerősített</button>
   <button style ={{backgroundColor: !view && 'var(--green-500)'}} onClick={()=>{setView(false)}} >Kérelmek</button>
   </nav>
  
  {view ? <Orders/>  : <OrderInitiates/> }
  
  
</main>)
}

export default GiftCard;
