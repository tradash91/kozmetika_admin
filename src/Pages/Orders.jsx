import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getOrders } from "../api/giftcard"
import { StyledOrderInitiate } from "./gifcard.styles"
import { number } from "motion"

function Orders() {

     const [rangeStart,setRangeStart] = useState(0)
      const [rangeEnd,setRangeEnd] = useState(5)
      const [currActive,setCurrActive] = useState(0)
      const btnArr = []
      let start = 0
      
       const {data,isLoading}= useQuery({
        queryKey:['getOrders',rangeStart,rangeEnd],
        queryFn: ({queryKey})=>{
          const [_,rangeStart,rangeEnd] = queryKey
          return getOrders(rangeStart,rangeEnd)
        },
    })
    
    
      if (isLoading) return <h1>...Betöltés</h1>
    
      for (let i = 0; i< data?.count;i++) {
        btnArr.push(i)
      }
      const pageCount = Math.ceil(data.count / 5);
       return (
        <div>
          {data.data.length === 0 && <h1>Jelenleg nincs megredelési kérelem.</h1>}
          {data?.data.reverse().map((order,i)=>{
            console.log(order);
            
            return <StyledOrderInitiate key={i}>
              <p><span>Létrehozva: </span>{order.created_at}</p>
              <p><span>Név: </span>{order.name}</p>
              <p><span>Email: </span>{order.email}</p>
              <p><span>Telefon: </span>{order.phone}</p>
              <p><span>Cím: </span>{order.zip},{order.city},{order.street}</p>
              
            </StyledOrderInitiate>
          })}
          {Array.from({length:Number(pageCount)},(_,index)=>{
            return <button style={{backgroundColor: currActive !== index? "#ffffff" : '#33a756'}}   onClick={()=>{
              setCurrActive(index)
              setRangeStart(index * 5)
              setRangeEnd((index + 1) * 5)
            }} key={index} >{index + 1}</button>
          }) }
         {/*  {btnArr.map((btn,i)=> {
            
            if(btn % 5 === 0) {
             
              start++         
              
              return <button key={i} data-curr ={start} onClick={(e)=>{
                 setRangeStart((Number(e.currentTarget.dataset.curr) -1) *5) 
                setRangeEnd(Number(e.currentTarget.dataset.curr) *5)
                 }} >{start}</button>
              
            }                     
          })} */}
        </div>
      );
}

export default Orders