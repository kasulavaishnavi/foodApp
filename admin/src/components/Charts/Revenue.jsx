import React, { useContext, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { DashboardContext } from "../../Context/DashBoardContext"; // Ensure this path is correct relative to Revenue.jsx
import "./Revenue.css"; // Ensure this path is correct relative to Revenue.jsx

const Revenue = () => {
  const { orders, food_list } = useContext(DashboardContext);
  const [view, setView] = useState("daily");

  // Helper function to safely parse a date string into a Date object
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return isNaN(d) ? new Date() : d;
  };

  // --- Helper functions for generating keys and display names for different time periods ---

  // For Daily view: Returns day of the week (e.g., "Mon")
  const getDayKey = (date) =>
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];

  // For Weekly view: Returns a key like "YYYY-MM-DD" (Monday of the week) for grouping
  const getWeekKey = (date) => {
    const d = new Date(date);
    // Go to Monday of the current week (adjusting for Sunday being 0)
    d.setDate(d.getDate() - (d.getDay() === 0 ? 6 : d.getDay() - 1));
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // For Weekly view: Returns a display name like "Week of Jun 3"
  const getWeekDisplayName = (dateKey) => {
    const d = new Date(dateKey);
    const options = { month: 'short', day: 'numeric' };
    return `Week of ${d.toLocaleDateString('en-US', options)}`;
  };

  // For Monthly view: Returns a key like "YYYY-MM" for grouping
  const getMonthKey = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  };

  // For Monthly view: Returns a display name like "Jun 2024"
  const getMonthDisplayName = (dateKey) => {
    const [year, month] = dateKey.split('-');
    const d = new Date(parseInt(year), parseInt(month) - 1, 1);
    return d.toLocaleString('default', { month: 'short', year: 'numeric' });
  };

  // For Yearly view: Returns a key and display name like "YYYY"
  const getYearKey = (date) => date.getFullYear().toString();
  const getYearDisplayName = (dateKey) => dateKey;

  // Helper function to get the price of a food item
  const getPrice = (itemName) => {
    const food = food_list.find((f) => f.name.toLowerCase() === itemName.toLowerCase());
    return food ? food.price : 0;
  };

  // Object to store aggregated revenue data
  const revenueData = {};

  // Iterate through orders to aggregate revenue based on the selected view
  orders.forEach((order) => {
    const date = formatDate(order.createdAt);
    let key;

    // Determine the key based on the current view
    if (view === "daily") {
      key = getDayKey(date);
    } else if (view === "weekly") {
      key = getWeekKey(date);
    } else if (view === "monthly") {
      key = getMonthKey(date);
    } else if (view === "yearly") {
      key = getYearKey(date);
    }

    // Calculate the total amount for the current order
    const total = order.items.reduce((sum, item) => {
      const price = getPrice(item.name);
      return sum + price * (item.quantity || 1);
    }, 0);

    // Add the total to the corresponding key in revenueData
    revenueData[key] = (revenueData[key] || 0) + total;
  });

  // --- Logic to generate chart data for the last 7 periods ---

  // Function to get the last N periods (weeks, months, years)
  const getLastNPeriods = (num, type) => {
    const periods = [];
    let currentDate = new Date(); // Start from today

    for (let i = 0; i < num; i++) {
      let periodKey, displayName;
      let dateForPeriod = new Date(currentDate); // Create a new date object for each iteration

      if (type === 'weekly') {
        // Go back 'i' weeks from current date's Monday
        dateForPeriod.setDate(dateForPeriod.getDate() - (dateForPeriod.getDay() === 0 ? 6 : dateForPeriod.getDay() - 1)); // Go to current Monday
        dateForPeriod.setDate(dateForPeriod.getDate() - (i * 7)); // Go back 'i' weeks
        periodKey = getWeekKey(dateForPeriod);
        displayName = getWeekDisplayName(periodKey);
      } else if (type === 'monthly') {
        // Go back 'i' months from current date
        dateForPeriod.setMonth(currentDate.getMonth() - i);
        dateForPeriod.setDate(1); // Set to first day of the month for consistency
        periodKey = getMonthKey(dateForPeriod);
        displayName = getMonthDisplayName(periodKey);
      } else if (type === 'yearly') {
        // Go back 'i' years from current date
        dateForPeriod.setFullYear(currentDate.getFullYear() - i);
        dateForPeriod.setMonth(0); // Set to January 1st
        dateForPeriod.setDate(1);
        periodKey = getYearKey(dateForPeriod);
        displayName = getYearDisplayName(periodKey);
      }
      periods.unshift({ key: periodKey, name: displayName }); // Add to the beginning to maintain chronological order
    }
    return periods;
  };

  let chartData = [];

  if (view === "daily") {
    // Fixed order for daily view
    const dailyOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    chartData = dailyOrder.map((day) => ({
      name: day,
      revenue: revenueData[day] || 0,
    }));
  } else {
    // Get the last 7 periods dynamically for weekly, monthly, or yearly views
    const last7Periods = getLastNPeriods(7, view);
    chartData = last7Periods.map(period => ({
      name: period.name,
      revenue: revenueData[period.key] || 0, // Use the aggregated revenue or 0 if no data
    }));
  }

  return (
    <div className="Revenue">
      {/* Dropdown for selecting the view (daily, weekly, monthly, yearly) */}
      <h3>Revenue</h3>
      <div className="dropdown-container">
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

      {/* Responsive container for the chart */}

      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={chartData} key={view}> {/* Added key prop here */}
          {/* Bar chart for revenue */}
          <Bar dataKey="revenue" barSize={30} fill="#D9D9D9" radius={[5, 5, 5, 5]} />
          {/* Line chart overlay for trend */}
          <Line type="monotone" dataKey="revenue" stroke="#000" strokeWidth={2} dot={false} />
          {/* X-Axis displaying the time period names */}
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          {/* Y-Axis (hidden as per original code) */}
          <YAxis hide />
          {/* Tooltip for displaying data on hover */}
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Revenue;
