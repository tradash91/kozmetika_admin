import { useState } from "react";
import { supabase } from "../api/supabase";
import { useQuery } from "@tanstack/react-query";
import { getOrderInitiates} from "../api/giftcard";
import { StyledOrderInitiate } from "./gifcard.styles";

function OrderInitiates () {


  const [rangeStart,setRangeStart] = useState(0)
  const [rangeEnd,setRangeEnd] = useState(4)
  const [currActive,setCurrActive] = useState(0)
  const btnArr = []
  let start = 0
  
   const {data,isLoading}= useQuery({
    queryKey:['getGiftCards',rangeStart,rangeEnd],
    queryFn: ({queryKey})=>{
      const [_,rangeStart,rangeEnd] = queryKey
      return getOrderInitiates(rangeStart,rangeEnd)
    },
})


  if (isLoading) return <h1>...Betöltés</h1>


for (let i = 0; i< data?.count;i++) {
  btnArr.push(i)
}
const pageCount = Math.ceil(data.count / 4);

   return (
    <div>
      {data.data.length === 0 && <h1>Jelenleg nincs megredelési kérelem.</h1>}
      {data?.data.map((order,i)=>{
      
        
        return <StyledOrderInitiate key={i}>
          <p><span>Név: </span>{order.name}</p>
          <p><span>Email: </span>{order.email}</p>
          <p><span>Telefon: </span>{order.phone}</p>
          <p><span>Cím: </span>{order.zip},{order.city},{order.street}</p>
          
        </StyledOrderInitiate>
      })}
      {Array.from({length:Number(pageCount)},(_,index)=>{
            return <button style={{backgroundColor: currActive !== index? "#ffffff" : '#33a756'}}  onClick={()=>{
              setCurrActive(index )
              setRangeStart(index * 4)
              setRangeEnd((index + 1) * 4)
            }} key={index} >{index + 1}</button>
          }) }
    </div>
  );
}


export default OrderInitiates