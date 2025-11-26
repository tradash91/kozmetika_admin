import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../api/supabase";



/* export function useRealTimeNotifications (key = ["getNotifications","getOrders"], table="notifications") {

    const queryClient = useQueryClient( );
        
    useEffect(() => {
        const channel = supabase
          .channel("notifications-realtime")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: 'notifications' },
            (payload) => {
              console.log("Realtime változás:", payload);
    
              // ha új megrendelés jön → újra fetch
              key.forEach((k)=>{
          queryClient.invalidateQueries({ queryKey:[k] });
          
              })
              
    
            }
          )
          .subscribe();
    
        return () => {
          supabase.removeChannel(channel);
        };
      }, [queryClient,key,table]);
} */


export function useRealTimeNotifications (key = ["getNotifications"], table="notifications") {

    const queryClient = useQueryClient( );
        
    useEffect(() => {
        const channel = supabase
          .channel("notifications-realtime")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: table },
            (payload) => {
              console.log("Realtime változás:", payload);
    
              // ha új megrendelés jön → újra fetch
              queryClient.invalidateQueries({ queryKey: key });
    
            }
          )
          .subscribe();
    
        return () => {
          supabase.removeChannel(channel);
        };
      }, [queryClient,key,table]);
}


/* /// chat gpt
export function useRealTimeNotifications (key = ["getNotifications"], table="notifications") {
      const queryClient = useQueryClient( );
useEffect(() => {
  const channel = supabase
    .channel("notifications-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table },
      (payload) => {
        console.log("Realtime változás:", payload);
        key.forEach((k) => {
          queryClient.invalidateQueries({ queryKey: [k] });
        });
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, [queryClient, table]);
} */



/* 
export function useRealTimeOrders(key = ["getOrders"], table="orders") {

const queryClient = useQueryClient();

 useEffect(() => {
        const channel = supabase
          .channel("notifications-realtime")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: table },
            (payload) => {
              console.log("Realtime változás:", payload);
    
              // ha új megrendelés jön → újra fetch
              queryClient.invalidateQueries({ queryKey: key });
    
            }
          )
          .subscribe();
    
        return () => {
          supabase.removeChannel(channel);
        };
      }, [queryClient,key,table]);
} */