import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../Context/DashBoardContext";
import "./Chef.css";

const ChefOrdersTable = () => {
  const { orders: contextOrders } = useContext(DashboardContext);

  const [chefOrders, setChefOrders] = useState([]);

  useEffect(() => {
    if (!contextOrders || contextOrders.length === 0) return;

    const chefs = ["Manesh", "Pritam", "Yash", "Tenzen"];
    const chefState = chefs.map((name) => ({ name, orders: [] }));

    contextOrders.forEach((order, index) => {
      const minutes = parseInt(order.statusDetails); // "89 Min" → 89
      const currentChef =
        chefState.find((c) => c.orders.length === 0) ||
        chefState.reduce((minChef, chef) => {
          const totalRemaining = chef.orders.reduce((sum, ord) => sum + parseInt(ord.statusDetails), 0);
          const minTotalRemaining = minChef.orders.reduce((sum, ord) => sum + parseInt(ord.statusDetails), 0);
          return totalRemaining < minTotalRemaining ? chef : minChef;
        });

      currentChef.orders.push(order);
    });

    // Flatten to name + order count
    const result = chefState.map((c) => ({
      name: c.name,
      orders: c.orders.length,
    }));

    setChefOrders(result);
  }, [contextOrders]);

  return (
    <div className="chef-orders-card">
      <table>
        <thead>
          <tr>
            <th>Chef Name</th>
            <th>Order Taken</th>
          </tr>
        </thead>
        <tbody>
          {chefOrders.map((chef) => (
            <tr key={chef.name}>
              <td>{chef.name}</td>
              <td>{chef.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChefOrdersTable;
