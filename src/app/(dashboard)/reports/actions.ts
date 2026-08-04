"use server";

import { createClient } from "@/lib/supabase/server";

export async function getReportsData() {
  const supabase = await createClient();

  // Get metrics
  const { data: orders } = await supabase.from("orders").select("*");
  const { data: inventory } = await supabase.from("inventory").select("*");
  const { data: customers } = await supabase.from("customers").select("id, created_at");
  const { data: orderItems } = await supabase.from("order_items").select(`
    quantity,
    unit_price,
    inventory (
      category
    )
  `);

  let totalRevenue = 0;
  orders?.forEach((o) => totalRevenue += o.total_amount);

  let netProfit = totalRevenue * 0.37; // estimated profit margin for demo

  let inventoryValue = 0;
  let itemsInStock = 0;
  inventory?.forEach((item) => {
    inventoryValue += (item.purchase_price * item.stock_quantity);
    itemsInStock += item.stock_quantity;
  });

  const newCustomers = customers?.length || 0;

  // Generate last 7 days revenue
  const revenueData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    
    let dayRevenue = 0;
    orders?.forEach((o) => {
      if (o.created_at.startsWith(dateStr)) {
        dayRevenue += o.total_amount;
      }
    });
    
    revenueData.push({ name: dayName, revenue: dayRevenue });
  }

  // Generate sales by category
  const categories: Record<string, number> = {
    "Frames": 0,
    "Lenses": 0,
    "Sunglasses": 0,
    "Contact Lenses": 0,
    "Accessories": 0
  };

  orderItems?.forEach((item: any) => {
    const cat = item.inventory?.category || "Accessories";
    if (categories[cat] !== undefined) {
      categories[cat] += (item.quantity * item.unit_price);
    } else {
      categories[cat] = (item.quantity * item.unit_price);
    }
  });

  const categoryData = Object.entries(categories)
    .filter(([_, sales]) => sales > 0)
    .map(([name, sales]) => ({ name, sales }))
    .sort((a, b) => b.sales - a.sales);

  return {
    kpis: {
      totalRevenue,
      netProfit,
      inventoryValue,
      itemsInStock,
      newCustomers
    },
    revenueData,
    categoryData: categoryData.length > 0 ? categoryData : [
      { name: "Frames", sales: 0 },
      { name: "Lenses", sales: 0 },
      { name: "Sunglasses", sales: 0 },
      { name: "Contact Lenses", sales: 0 },
      { name: "Accessories", sales: 0 }
    ]
  };
}
