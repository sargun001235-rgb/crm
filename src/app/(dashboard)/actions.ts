"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDashboardMetrics() {
  const supabase = await createClient();
  
  // Get all orders to calculate aggregate metrics
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(`
      *,
      customers (
        first_name,
        last_name,
        email
      )
    `)
    .order("created_at", { ascending: false });

  if (ordersError) {
    console.error("Error fetching dashboard metrics:", ordersError);
    return {
      totalRevenue: 0,
      pendingOrders: 0,
      activeCustomers: 0,
      advanceCollectedToday: 0,
      recentSales: []
    };
  }

  // Calculate metrics
  let totalRevenue = 0;
  let pendingOrders = 0;
  let activeCustomers = 0;
  let advanceCollectedToday = 0;

  const today = new Date().toISOString().split('T')[0];
  const uniqueCustomers = new Set();

  orders.forEach((order: any) => {
    totalRevenue += order.total_amount;
    uniqueCustomers.add(order.customer_id);

    if (order.status !== 'Delivered' && order.status !== 'Cancelled') {
      pendingOrders++;
    }

    const orderDate = order.created_at.split('T')[0];
    if (orderDate === today) {
      advanceCollectedToday += order.advance_paid;
    }
  });

  activeCustomers = uniqueCustomers.size;

  const recentSales = orders.slice(0, 5).map((order: any) => ({
    id: order.id,
    customer_name: `${order.customers?.first_name || ""} ${order.customers?.last_name || ""}`.trim(),
    email: order.customers?.email || "No email",
    amount: order.total_amount
  }));

  return {
    totalRevenue,
    pendingOrders,
    activeCustomers,
    advanceCollectedToday,
    recentSales
  };
}
