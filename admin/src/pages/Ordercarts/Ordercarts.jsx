import React, { useContext } from "react";
import "./Ordercart.css";
import OrderItem from "../../components/OrderItem/OrderItem";
import { DashboardContext } from "../../Context/DashBoardContext";

const OrderCarts = () => {
  const { orders, userDetails, loading } = useContext(DashboardContext);

  if (loading) return <div>Loading order info...</div>;
  if (!orders || orders.length === 0) return <div>No orders available</div>;

  // Merge orders with user details to add table info
  const mergedOrders = orders.map((order) => {
    const matchingUser = userDetails.find(
      (user) => user.orderType === order.orderType
    );
    return {
      ...order,
      table: matchingUser ? matchingUser.table : null,
    };
  });

  return (
    <div className="ordersContainer">

      <input type="text" placeholder="search"/>
      <div className="orderCards">
      <h2>Order Line</h2>
      <div className="Mainorder">
      <div className="SubContainer">
      {mergedOrders. sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  .map((order, idx) => (
        <OrderItem key={order._id} order={order} tableInfo={order.table}   displayOrderId={`# ${idx + 1}`} />
      ))}
      </div>
        </div>
    </div>
      </div>
  );
};

export default OrderCarts;
