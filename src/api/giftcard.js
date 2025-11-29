import { supabase } from "./supabase";

export async function getOrderInitiates(rangeStart, rangeEnd) {
  let { data, count, error } = await supabase
    .from("order_intents")
    .select("*", { count: "exact" })
    .order("id", { ascending: false })
    .range(rangeStart, rangeEnd);

  return { data, count };
}

export async function getOrders(rangeStart, rangeEnd) {
  let { data, count, error } = await supabase
    .from("orders")
    .select("*", { count: "exact" })
    .order("id", { ascending: false })
    .range(rangeStart, rangeEnd);

  return { data, count };
}

export async function getNotifications() {
  let { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("isNew", true);
  return notifications;
}

export async function updateNotification(id) {
  console.log("what");
  const { data, error } = await supabase
    .from("notifications")
    .update({ isNew: false })
    .eq("order_id", id)
    .select();
  return data;
}

export async function updateOrderPaymentStatus(order_id) {
  const { data, error } = await supabase
    .from("orders")
    .update({ isPaid: true })
    .eq("order_id", order_id)
    .select();

  return data;
}

export async function updateShippingStatus(order_id) {
  console.log("shipping updated");
  const res = await fetch(
    "https://ddvnuqohudlphhbsdtzg.supabase.co/functions/v1/send_email_card_posted",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        order_id,
      }),
    }
  );

  const data = await res.json();

  return data;
}
