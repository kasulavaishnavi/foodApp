import React, { useEffect, useState } from "react";
import { menu_list, food_list } from "../../assests/assets";
import "./OrderItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils,faCircleCheck,faHourglassEnd } from "@fortawesome/free-solid-svg-icons";

const OrderItem = ({ order, tableInfo, displayOrderId }) => {
  const getOrderItems = () => order.items || [];

  const calculateOrderPreparationTime = () => {
    let calculatedTime = 0;
    const items = getOrderItems();

    items.forEach((orderItem) => {
      const foodItem = food_list.find(
        (item) => item.name.toLowerCase() === orderItem.name.toLowerCase()
      );
      console.log("Checking:", orderItem.name, "-> found:", foodItem?.category);
      if (foodItem) {
        const menuItem = menu_list.find(
          (item) => item.menu_name === foodItem.category
        );
        console.log(orderItem.name, foodItem?.category);

        if (menuItem) {
          calculatedTime += menuItem.time * orderItem.quantity;
        }
      }
    });

    console.log(calculatedTime);
    return calculatedTime;
  };

  const totalPreparationTime = calculateOrderPreparationTime();
  const [remainingTime, setRemainingTime] = useState(totalPreparationTime);
  const [statusText, setStatusText] = useState("Processing");
  const [pickupStatus, setPickupStatus] = useState("");

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

  useEffect(() => {
    if (!order?.orderTime) return;

    const createdAt = parseOrderTime(order.orderTime);
    console.log("Parsed Order Time:", createdAt);

    if (!createdAt) {
      return;
    }

    const calculatePreparationTime = () => {
      let calculatedTime = 0;
      const items = getOrderItems();

      items.forEach((orderItem) => {
        const foodItem = food_list.find(
          (item) => item.name.toLowerCase() === orderItem.name.toLowerCase()
        );
        if (foodItem) {
          const menuItem = menu_list.find(
            (item) => item.menu_name === foodItem.category
          );
          if (menuItem) {
            calculatedTime += menuItem.time * orderItem.quantity;
          }
        }
      });

      return calculatedTime;
    };

    const updateTime = () => {
      const now = new Date();
      const elapsed = Math.floor((now - createdAt) / 60000);
      const remaining = Math.max(totalPreparationTime - elapsed, 0);
      console.log("Elapsed:", elapsed, "Remaining:", remaining);

      setRemainingTime(remaining);

      if (remaining > 0) {
        setStatusText("Processing");
      } else {
        if (order.orderType === "Dine In") {
          setStatusText("Served");
        } else if (order.orderType === "Takeaway") {
          setStatusText(pickupStatus || "Select Pickup Status");
        }
      }
    };

    updateTime(); // initial run
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, [order.orderTime, order.orderType, pickupStatus, order]);

  const handleDropdownChange = (e) => {
    setPickupStatus(e.target.value);
    setStatusText(e.target.value);
  };

  const getTotalItems = () => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="orderItemContainer">
      <div
        className={`orderItemCard  diffColor ${order.orderType === "Dine In" ? "dine-in" : "take-away"}
      ${
        remainingTime > 0
          ? "processing"
          : order.orderType === "Dine In"
            ? "served"
            : "done"
      }`}
      >
        <div className="orderHeader">
          <div className="orderSubHead">
            <p>
              <FontAwesomeIcon icon={faUtensils} className="Ordericon" />{" "}
              {displayOrderId}{" "}
            </p>
            <p>Table-{tableInfo || "N/A"}</p>
            <p>{order.orderTime}</p>
            <h4 className="totalitem">{getTotalItems()} Item</h4>
          </div>
          <div
            className={`ordertypeStatus ${remainingTime > 0 ? "processing" : order.orderType === "Dine In" ? "served" : "done"}`}
          >
            {order.orderType === "Dine In" ? (
              <div className="diffColor dine-in">
                <h6 className="diffColor">Dine In</h6>
                <p>
                  {remainingTime > 0
                    ? `Ongoing ${remainingTime} Min`
                    : "Served"}
                </p>
              </div>
            ) : (
              <div className="diffColor take-away">
                <h6>Take Away</h6>
                {remainingTime > 0 ? (
                  `Ongoing ${remainingTime} Min`
                ) : (
                  <select
                    className="orderSelect"
                    value={pickupStatus}
                    onChange={handleDropdownChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="Not Picked Up">Not Picked Up</option>
                  </select>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="orderItems">
          {order.items.map((item, i) => (
            <div className="p" key={i}>
              {item.quantity} x {item.name}
              {item.totalAmount}
            </div>
          ))}
        </div>

        <div className={`orderFooter ${remainingTime > 0 ? "processing" : order.orderType === "Dine In" ? "served" : "done"}`}>
          {remainingTime > 0 ? (
            <div className="statusBottom processing">Processing <FontAwesomeIcon icon={faHourglassEnd} /></div>
          ) : (
            <div className="statusBottom done"> Order Done <FontAwesomeIcon icon={faCircleCheck} /></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
