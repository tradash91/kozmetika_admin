import { useEffect, useState } from "react";
import { supabase } from "../api/supabase";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrderInitiates } from "../api/giftcard";
import { StyledOrderInitiate } from "./gifcard.styles";
import { StyledOrder, StyledPagination } from "./orders.styles";
import { formatDate } from "../utils/formatData";

function OrderInitiates() {
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(4);
  const [currActive, setCurrActive] = useState(0);
  const btnArr = [];
  let start = 0;

  const { data, isLoading } = useQuery({
    queryKey: ["getGiftCards", rangeStart, rangeEnd],
    staleTime: 60,
    queryFn: ({ queryKey }) => {
      const [_, rangeStart, rangeEnd] = queryKey;
      return getOrderInitiates(rangeStart, rangeEnd);
    },
  });
  /*   const queryClient = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel("order-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "order_intents" },
        (payload) => {
          console.log("Realtime változás:", payload);

          // ha új megrendelés jön → újra fetch
          queryClient.invalidateQueries(["getGiftCards"]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]); */

  if (isLoading) return <h1>...Betöltés</h1>;

  for (let i = 0; i < data?.count; i++) {
    btnArr.push(i);
  }
  const pageCount = Math.ceil(data.count / 4);

  return (
    <div>
      {data.data.length === 0 && <h1>Jelenleg nincs megredelési kérelem.</h1>}
      {data?.data.map((order, i) => {
        return (
          <StyledOrder key={i}>
           <div className="">
             <p>{order.order_id}</p>
            <p>
              <span>Létrehozva: </span>
              {formatDate(order.created_at)}
            </p>
            <p>
              <span>Név: </span>
              {order.name}
            </p>
            <p>
              <span>Email: </span>
              {order.email}
            </p>
            <p>
              <span>Telefon: </span>
              {order.phone}
            </p>
            <p>
              <span>Cím: </span>
              {order.zip},{order.city},{order.street}
            </p>
            <p>
              <span>Szolgáltatás: </span>
              {order.service}
            </p>
            <p>
              <span>Ár: </span>
              {order.service_price}
            </p>
           </div>
          </StyledOrder>
        );
      })}
      <StyledPagination>
        {Array.from({ length: Number(pageCount) }, (_, index) => {
          return (
            <button
              style={{
                backgroundColor: currActive !== index ? "#ffffff" : "#33a756",
                color: currActive !== index ? "#1f1e1e" : "#fdfdfd",
              }}
              onClick={() => {
                setCurrActive(index);
                setRangeStart(index * 4);
                setRangeEnd((index + 1) * 4);
              }}
              key={index}
            >
              {index + 1}
            </button>
          );
        })}
      </StyledPagination>
    </div>
  );
}

export default OrderInitiates;
