import React, { useContext,useState,useEffect } from "react";
import "./Cart.css";
import { ItemContext } from "../../context/itemsContext/itemsContext";
import ItemCounter from "../../components/Counter/ItemCounter";
import UserInfo from "../../components/userInfo/userInfo"
import Instruction from "../../components/InstructionModal/Instruction";
import {  menu_list } from "../../assests/assets";
import Searchbar from "../../components/searchbar/Searchbar";
import axios from "axios"

const Cart = () => {
  const url = "http://localhost:4000";


    const sendOrderToBackend = async () => {
    try {
      // Prepare order details
      const createOrder = {
        items: Object.entries(cart).map(([itemId, quantity]) => {
          // Find full item info by id to include name, price, etc
          const item = food_list.find(food => food._id === itemId);
          return {
            id: itemId,
            name: item?.name || "Unknown",
            quantity,
            price: item?.price || 0,
          };
        }),
        instructions,
        orderType: selectedChoice,
        totalAmount: selectedChoice === "takeAway"
          ? totalCartAmount() + DeliveryCharge + Tax
          : totalCartAmount() + Tax,
        preparationTime: totalPreparationTime,
        timestamp: new Date().toISOString()
      };

      // Post data to backend
      const response = await axios.post(`${url}/api/food/orders/create`, createOrder);

      console.log("Order response:", response.data);
      alert("Order placed successfully!");

    } catch (error) {
      console.error("Error sending order:", error);
      alert("Failed to place order. Please try again.");
    }
  };




  const { cart, food_list, removeFromCart, totalCartAmount } = useContext(ItemContext);

  const [selectedChoice, setSelectedChoice] = useState(() => {
  return localStorage.getItem("selectedChoice") || null;
});
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [instructions, setInstructions] = useState("");
  const DeliveryCharge = 50;
  const Tax = 5;

const calculateTotalPreparationTime = () => {
  let calculatedTime = 0;
  food_list.forEach((foodItem) => {
    const quantity = cart[foodItem._id] || 0;
    if (quantity > 0) {
      const menuItem = menu_list.find(
        (item) => item.menu_name === foodItem.category
      );
      if (menuItem) {
        calculatedTime += menuItem.time * quantity;
      } else {
        console.warn(
          `Cart.jsx - No preparation time found for category: ${foodItem.category}`
        );
      }
    }
  });
  return calculatedTime;
};

 const totalPreparationTime = calculateTotalPreparationTime();

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
  };

  const handleInstructionsClick = () => {
    setShowInstructionsModal(true);
  };

  const handleCloseInstructionsModal = () => {
    setShowInstructionsModal(false);
  };

  const handleSaveInstructions = (text) => {
    setInstructions(text);
    setShowInstructionsModal(false);
    console.log("Cooking Instructions:", text);
  };

useEffect(() => {
  if (selectedChoice) {
    localStorage.setItem("selectedChoice", selectedChoice);
  }
}, [selectedChoice]);

  return (
    <>
        <Searchbar/>
    
 
    <div className="cart">
      <div className="itemsScroll">
        <div className="cart-items">
          {food_list.map((item) => {
            const quantity = cart[item._id];
            if (quantity > 0) {
              return (
                <div key={item._id} className="itemCard">
                  <img src={url+"/images/"+item.image} alt="img" className="itemImg" />
                  <div className="itemInfo">
                    <div className="itemTop">
                      <h3 className="name">{item.name}</h3>
                      <button
                        className="removeItem"
                        onClick={() => removeFromCart(item._id)}
                      >
                       X
                      </button>
                    </div>
                    <div className="itemBottom">
                      <p className="price">₹{item.price}</p>
                      <ItemCounter id={item._id} />
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <input
        type="text"
        placeholder="Add cooking instructions (optional)"
        className="instructionInputGlobal"
        readOnly
        onClick={handleInstructionsClick}
        value={instructions}
      />

      {showInstructionsModal && (
        <Instruction
          onClose={handleCloseInstructionsModal}
          onSave={handleSaveInstructions}
          initialInstructions={instructions}
        />
      )}

      <div className="choice">
        <div
          className={`dineIn ${selectedChoice === 'Dine In' ? 'active' : ''}`}
          onClick={() => handleChoiceClick('Dine In')}
        >
          Dine In
        </div>
        <div
          className={`takeAway ${selectedChoice === 'Take Away' ? 'active' : ''}`}
          onClick={() => handleChoiceClick('Take Away')}
        >
          Take Away
        </div>
      </div>

      <div className="checkout">
        <div className="itemCharges">
          <p>Item Total</p>
          <p>₹{totalCartAmount()}.00</p>
        </div>
        <div className="itemCharges">
          <p>Delivery Charge</p>
          <p>₹{DeliveryCharge}.00</p>
        </div>
        <div className="itemCharges">
          <p>Taxes</p>
          <p>₹{Tax}.00</p>
        </div>
        <div className="grandTotal">
          <h3>Grand Total</h3>
          <h3>
            ₹{selectedChoice === "takeAway"
              ? totalCartAmount() + DeliveryCharge + Tax
              : totalCartAmount() + Tax}
            .00
          </h3>
        </div>
      </div>

      <UserInfo
       selectedChoice={selectedChoice} totalPreparationTime={totalPreparationTime}
       sendOrderToBackend={sendOrderToBackend}
        cart={cart}                               // Pass cart if needed
  food_list={food_list}  
      />
    </div>
       </>
  );
};

export default Cart;