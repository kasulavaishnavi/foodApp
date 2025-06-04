const Order = require("../../models/orderDetails");

// ✅ Fetch all orders (latest first) and format for admin panel
const listOrders = async (req, res) => {
  try {
    const ordersFromDB = await Order.find().sort({ createdAt: -1 }); // .lean() for plain JS objects

    const formattedOrders = ordersFromDB.map(order => {
      // Calculate total item count
      const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

      // Determine status details, action button text, and icon based on order status
      // let statusDetails = null;
      // let actionButtonText = "";
      // let actionButtonIcon = ""; // Using Font Awesome icon names for example

      switch (order.status) {
        case "Processing":
          actionButtonText = "Processing";
          actionButtonIcon = "hourglass"; // Example icon
         const now = new Date();
    const createdAt = new Date(order.createdAt);
    const diffInMinutes = Math.round((now - createdAt) / (1000 * 60));
          statusDetails = `${diffInMinutes} Min`; // Placeholder: Replace X with actual time calculation
          break;
        case "Served":
          actionButtonText = "Order Done";
          actionButtonIcon = "check-circle"; // Example icon
          break;
        case "Not Picked up":
          actionButtonText = "Order Done";
          actionButtonIcon = "check-circle"; // Example icon
          break;
        default:
          actionButtonText = "Update Status";
          actionButtonIcon = "sync";
          break;
      }

      return {
       orderId: order.orderId ? `#${order.orderId}` : "#N/A", // Format as #108
        orderType: order.orderType,
        table: order.orderType === "Dine In" ? order.table : "N/A", // Only show table for Dine In
        orderTime: new Date(order.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }), // Format time
        itemCount: itemCount,
        items: order.items.map(item => ({ quantity: item.quantity, name: item.name })), // Only name and quantity
        status: order.status,
        statusDetails: statusDetails,
        actionButtonText: actionButtonText,
        actionButtonIcon: actionButtonIcon
      };
    });

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching and formatting orders", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ✅ Create a new order (assuming this is already working correctly)
const createOrder = async (req, res) => {
  try {
    const { table, time, items, orderType, status, totalAmount } = req.body;
    const orderId = Date.now() + Math.floor(Math.random() * 1000); // Backend generates orderId

    const newOrder = new Order({
      orderId,
      table,
      time,
      items,
      orderType,
      status,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

module.exports = {
  listOrders,
  createOrder,
};