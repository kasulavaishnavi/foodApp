  import React, { createContext, useEffect, useState } from "react";
  import { food_list,menu_list } from "../assests/assets";

  export const DashboardContext = createContext();

  export const DashboardProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [loading, setLoading] = useState(true);
  const [view, setView] = useState("daily");
    const calculateTotalRevenue = (orders) => {
      return orders.reduce((sum, order) => {
        const orderTotal = order.items.reduce((orderSum, item) => {
          const foodItem = food_list.find(
            (f) => f.name.toLowerCase() === item.name.toLowerCase()
          );
          const price = foodItem ? foodItem.price : 0;
          const quantity = item.quantity || 1;
          return orderSum + price * quantity;
        }, 0);
        return sum + orderTotal;
      }, 0);
    };

    useEffect(() => {
      Promise.all([
        fetch("https://foodapp-backend-h4kc.onrender.com/api/food/orders").then((res) => res.json()),
        fetch("https://foodapp-backend-h4kc.onrender.com/api/food").then((res) => res.json()),
      ])
        .then(([ordersData, userDetailsData]) => {
          setOrders(ordersData);
          setUserDetails(userDetailsData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setLoading(false);
        });
    }, []);



  const calculateOrderSummary = (orders) => {
  let totalDineIn = 0;
  let totalTakeaway = 0;
  let totalOrdersDone = 0;

  const parseOrderTime = (timeStr) => {
    if (!timeStr) return null;
    const [time, meridian] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;

    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
  };

  orders.forEach((order) => {
    if (order.orderType === "Dine In") totalDineIn++;
    else if (order.orderType === "Take Away") totalTakeaway++;

    // Calculate preparation time
    let totalPreparationTime = 0;
    order.items.forEach((orderItem) => {
      const foodItem = food_list.find(
        (item) => item.name.toLowerCase() === orderItem.name.toLowerCase()
      );
      if (foodItem) {
        const menuItem = menu_list.find(
          (item) => item.menu_name === foodItem.category
        );
        if (menuItem) {
          totalPreparationTime += menuItem.time * orderItem.quantity;
        }
      }
    });

    const createdAt = parseOrderTime(order.orderTime);
    if (!createdAt) return;

    const now = new Date();
    const elapsed = Math.floor((now - createdAt) / 60000);
    const remainingTime = Math.max(totalPreparationTime - elapsed, 0);

    // ✅ This is the new condition — if order is **not processing** and remainingTime === 0, it's done
    if (remainingTime <= 0) {
      totalOrdersDone++;
    }
  });

  return { totalDineIn, totalTakeaway, totalOrdersDone };
};


    // Compute total values
    const totalRevenue = calculateTotalRevenue(orders);
    const totalOrders = orders.length;
    const uniqueClients = new Set(userDetails.map((o) => o.number)).size;
  const { totalDineIn, totalTakeaway, totalOrdersDone } = calculateOrderSummary(orders);
    return (
      <DashboardContext.Provider
        value={{
          orders,
          userDetails,
          loading,
          totalRevenue,
          totalOrders,
          totalClients: uniqueClients,
            totalDineIn,
          totalTakeaway,
          totalOrdersDone,
          food_list,
           view,
        setView,
        }}
      >
        {children}
      </DashboardContext.Provider>
    );
  };
