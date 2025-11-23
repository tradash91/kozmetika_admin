import { supabase } from "./supabase"

export async function getOrderInitiates(rangeStart,rangeEnd) {
    
let { data,count, error } = await supabase
  .from('order_intents')
  .select('*',{count:'exact'}).range(rangeStart,rangeEnd)
          
  return {data,count}
}

export async function getOrders(rangeStart,rangeEnd) {
    
let { data,count, error } = await supabase
  .from('orders')
  .select('*',{count:'exact'}).range(rangeStart,rangeEnd)
          
  return {data,count}
}