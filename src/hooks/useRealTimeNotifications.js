import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../api/supabase";


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