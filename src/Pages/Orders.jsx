import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getNotifications,
  getOrders,
  updateNotification,
  updateOrderPaymentStatus,
  updateShippingStatus,
} from "../api/giftcard";
import { StyledOrderInitiate } from "./gifcard.styles";
import { formatDate } from "../utils/formatData";
import { supabase } from "../api/supabase";
import {
  StyledNotificationIcon,
  StyledOrder,
  StyledOrderButton,
  StyledOrdersWrapper,
  StyledPagination,
} from "./orders.styles";
import { useRealTimeNotifications } from "../hooks/useRealTimeNotifications";
import { button } from "motion/react-client";
import LoadingPage from "../components/LoadingPage";

function Orders() {
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(5);
  const [currActive, setCurrActive] = useState(0);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getOrders", rangeStart, rangeEnd],
    staleTime: 60,
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

  const {
    mutate: mutateUpdatePaymentStatus,
    isPending: isPaymentStatusUpdating,
  } = useMutation({
    mutationFn: updateOrderPaymentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getOrders"] });
    },
  });

  const {
    mutate: mutateUpdateShippingStatus,
    isPending: isShippingStatusUpdating,
  } = useMutation({
    mutationFn: updateShippingStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getOrders"] });
    },
  });

  if (isLoading || isNotificationsLoading || isShippingStatusUpdating)
    return <LoadingPage />;

  const pageCount = Math.ceil(data.count / 5);
  console.log(data);
  return (
    <div>
      {data.data.length === 0 && <h1>Jelenleg nincs megredelés.</h1>}
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
                <span>Szállítási mód: </span>
                {order?.delivery}
              </p>
              <p>
                <span>Ár: </span>
                {order.service_price}
              </p>
              <p style={{ color: order.isPaid ? "green" : "red" }}>
                <span>Fizetve: </span>
                {order.isPaid ? " Igen" : " Függőben"}
              </p>
              {order.delivery === "posta" && (
                <p style={{ color: order.isShipped ? "green" : "red" }}>
                  <span>Szállítva: </span>
                  {order.isShipped ? " Igen" : " Függőben"}
                </p>
              )}
            </div>
            <div className="nav">
              {!order.isPaid && (
                <StyledOrderButton
                  onClick={() => {
                    mutateUpdatePaymentStatus(order.order_id);

                    console.log(order.order_id);
                  }}
                >
                  Megjelölés fizetettként
                </StyledOrderButton>
              )}
              {!order.isShipped && order.delivery === "posta" && (
                <StyledOrderButton
                  onClick={() => {
                    mutateUpdateShippingStatus(order.order_id);
                  }}
                >
                  Megjelölés szállítottként
                </StyledOrderButton>
              )}
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
                setRangeStart(index * 5);
                setRangeEnd((index + 1) * 5);
              }}
              key={index}
            >
              {index + 1}
            </button>
          );
        })}
      </StyledPagination>
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
