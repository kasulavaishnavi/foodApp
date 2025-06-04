import React, { useContext } from 'react';
import './SummaryOrder.css'; // Ensure this path is correct relative to OrderSummary.jsx
import { DashboardContext } from "../../Context/DashBoardContext"; // Ensure this path is correct relative to OrderSummary.jsx
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const OrderSummary = () => {
  const {
    view, // Get view from context
    setView, // Get setView from context
    totalDineIn,
    totalTakeaway,
    totalOrdersDone,
  } = useContext(DashboardContext);

  // Calculate total orders for percentage calculation
  const totalOrders = totalOrdersDone + totalDineIn + totalTakeaway;

  // Calculate percentages, handling division by zero to prevent NaN
  const servedPercent = totalOrders ? Math.round((totalOrdersDone / totalOrders) * 100) : 0;
  const dineInPercent = totalOrders ? Math.round((totalDineIn / totalOrders) * 100) : 0;
  const takeawayPercent = totalOrders ? Math.round((totalTakeaway / totalOrders) * 100) : 0;

  // Data for the Pie Chart, based on calculated totals
  const pieChartData = [
    { name: 'Take Away', value: totalTakeaway },
    { name: 'Served', value: totalOrdersDone },
    { name: 'Dine In', value: totalDineIn },
  ];

  // Colors for the Pie Chart segments (matching the grayscale/neutrals in the image)
  const COLORS = ['#666666', '#999999', '#CCCCCC'];

  return (
    <div className="SummaryCard">
      <div className="card-header">
        <h3>Order Summary</h3>
        <div className="dropdownContainer">
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className=" selectRevenue"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      </div>
      <div className="summary-values">
        {/* Display total served orders */}
        <div className="value-item">
          <div className="value">{totalOrdersDone}</div>
          <div className="label">Served</div>
        </div>
        {/* Display total dine-in orders */}
        <div className="value-item">
          <div className="value">{totalDineIn}</div>
          <div className="label">Dine In</div>
        </div>
        {/* Display total takeaway orders */}
        <div className="value-item">
          <div className="value">{totalTakeaway}</div>
          <div className="label">Take Away</div>
        </div>
      </div>

      <div className="chart-and-progress-container">
        {/* Pie Chart Section */}
        <div className="pie-chart-section">
          <ResponsiveContainer width="100%" height={100}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="40%"
                cy="40%"
                innerRadius={30} // Creates the donut effect
                outerRadius={40}
                fill="#8884d8" // Default fill, overridden by Cell colors
                paddingAngle={3}
                dataKey="value"
              >
                {/* Map over pieChartData to assign colors to each segment */}
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {/* Tooltip for pie chart can be added here if needed */}
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Bars Section */}
        <div className="progress-bars">
          {/* Progress bar for Take Away orders */}
          <div className="progress-item">
            <div className="label">Take Away ({takeawayPercent}%)</div>
            <div className="progress-bar">
              <div className="progress1" style={{ width: `${takeawayPercent}%` }}></div>
            </div>
          </div>
          {/* Progress bar for Served orders */}
          <div className="progress-item">
            <div className="label">Served ({servedPercent}%)</div>
            <div className="progress-bar">
              <div className="progress2" style={{ width: `${servedPercent}%` }}></div>
            </div>
          </div>
          {/* Progress bar for Dine In orders */}
          <div className="progress-item">
            <div className="label">Dine In ({dineInPercent}%)</div>
            <div className="progress-bar">
              <div className="progress3" style={{ width: `${dineInPercent}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
