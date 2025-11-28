import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getNotifications,
  getOrders,
  updateNotification,
} from "../api/giftcard";
import { StyledOrderInitiate } from "./gifcard.styles";
import { formatDate } from "../utils/formatData";
import { supabase } from "../api/supabase";
import { StyledNotificationIcon, StyledOrder } from "./orders.styles";
import { useRealTimeNotifications } from "../hooks/useRealTimeNotifications";

function Orders() {
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(5);
  const [currActive, setCurrActive] = useState(0);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getOrders", rangeStart, rangeEnd],
    queryFn: ({ queryKey }) => {
      const [_, rangeStart, rangeEnd] = queryKey;
      return getOrders(rangeStart, rangeEnd);
    },
  });

  const { data: notifications, isLoading: isNotificationsLoading } = useQuery({
    queryFn: getNotifications,
    queryKey: ["getNotifications"],
  });

  const {
    mutate: mutateUpdateNotification,
    isPending: isNotificationUpdating,
  } = useMutation({
    mutationFn: updateNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
    },
  });

  /*  useEffect(() => {
    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        (payload) => {
          console.log("Realtime változás:", payload);

          // ha új megrendelés jön → újra fetch
          queryClient.invalidateQueries({ queryKey: ["getNotifications"] });

        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]); */

  useRealTimeNotifications();
  useEffect(() => {
    const channel = supabase
      .channel("order-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          console.log("Realtime változás:", payload);

          // ha új megrendelés jön → újra fetch
          queryClient.invalidateQueries(["getOrders"]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  if (isLoading || isNotificationsLoading) return <h1>...Betöltés</h1>;

  const pageCount = Math.ceil(data.count / 5);

  return (
    <div>
      {data.data.length === 0 && <h1>Jelenleg nincs megredelési kérelem.</h1>}
      {data.data.map((order, i) => {
        console.log(order);

        return (
          <StyledOrder
            key={i}
            onClick={() => {
              mutateUpdateNotification(order.order_id);
            }}
          >
            {notifications.map((notification, index) => {
              return (
                notification.order_id === order.order_id &&
                notification.isNew && (
                  <StyledNotificationIcon key={index}>!</StyledNotificationIcon>
                )
              );
            })}
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
            <p>{order.service}</p>
            <p>{order.service_price} Ft</p>
          </StyledOrder>
        );
      })}
      {Array.from({ length: Number(pageCount) }, (_, index) => {
        return (
          <button
            style={{
              backgroundColor: currActive !== index ? "#ffffff" : "#33a756",
            }}
            onClick={() => {
              setCurrActive(index);
              setRangeStart(index * 5);
              setRangeEnd((index + 1) * 5);
            }}
            key={index}
          >
            {index + 1}
          </button>
        );
      })}
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

export default Orders;
