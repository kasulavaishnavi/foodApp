import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userInfo.css";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import {useNavigate} from "react-router-dom";


const UserInfo = ({ selectedChoice, totalPreparationTime }) => {

    const navigate = useNavigate();

  console.log(
    "UserInfo.jsx - Received totalPreparationTime prop:",
    totalPreparationTime
  );
  const [mostRecentUserInfo, setMostRecentUserInfo] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const [form, setForm] = useState({
    orderType: "dine-in",
    name: "",
    number: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    table: "",
  });
  const [swiped, setSwiped] = useState(false);


  // update orderType in form state when selectedChoice changes
  useEffect(() => {
    const newOrderType = selectedChoice === "dineIn" ? "dine-in" : "takeaway";
    console.log(
      "selectedChoice changed to:",
      selectedChoice,
      "setting form.orderType to:",
      newOrderType
    );
    setForm((prevForm) => ({
      ...prevForm,
      orderType: newOrderType,
      table: newOrderType === "dine-in" ? prevForm.table : "",
      street: newOrderType === "takeaway" ? prevForm.street : "",
      city: newOrderType === "takeaway" ? prevForm.city : "",
      state: newOrderType === "takeaway" ? prevForm.state : "",
      zipCode: newOrderType === "takeaway" ? prevForm.zipCode : "",
      country: newOrderType === "takeaway" ? prevForm.country : "",
    }));
    setMostRecentUserInfo(null);
    setShowForm(true);
  }, [selectedChoice]);

  // Handler for updating form fields
  const updateFormField = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handler for form submission (POST request)
  const createForm = async (e) => {
    e.preventDefault();
    console.log("Sending form data:", form);
    try {
      // Send the form data to the backend
      const res = await axios.post("https://food-ordering-backend-96un.onrender.com", form);
      // console.log("Received response data:", res.data);
      setMostRecentUserInfo(res.data);
      setShowForm(false);
      setForm({
        orderType: selectedChoice === "dine-in" ? "dine-in" : "takeaway",
        name: "",
        number: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        table: "",
      });
    } catch (error) {
      console.error("Error creating form:", error);
      // if (error.response && error.response.data) {
      //   console.error("Server Error Response Data:", error.response.data);
      // }
    }
  };

  const handleEdit = () => {
    if (mostRecentUserInfo) {
      setForm({
        orderType:
          mostRecentUserInfo.orderType ||
          (selectedChoice === "dineIn" ? "dine-in" : "takeaway"),
        name: mostRecentUserInfo.name || "",
        number: mostRecentUserInfo.number || "",
        street: mostRecentUserInfo.street || "",
        city: mostRecentUserInfo.city || "",
        state: mostRecentUserInfo.state || "",
        zipCode: mostRecentUserInfo.zipCode || "",
        country: mostRecentUserInfo.country || "",
        table: mostRecentUserInfo.table || "",
      });
      setShowForm(true);
    }
  };

  return (
    <div className="user-info-container">
      {showForm ? (
        <form onSubmit={createForm} className="user-form">
          <h3 className="label">Your Details</h3>
          <div className="name-phone">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={updateFormField}
              required
              className="form-input"
            />
            <input
              type="tel"
              placeholder="+91"
              name="number"
              value={form.number}
              onChange={updateFormField}
              required
              className="form-input"
            />
          </div>

          {/* Conditional input for Dine In (Table number) */}
          {selectedChoice === "dineIn" && (
            <input
              type="text"
              placeholder="Table"
              name="table"
              value={form.table}
              onChange={updateFormField}
              required
              className="form-input"
            />
          )}

          {/* Conditional inputs for Take Away (Address details) */}
          {selectedChoice === "takeAway" && (
            <div className="address-fields">
              <input
                type="text"
                placeholder="Street"
                name="street"
                value={form.street}
                onChange={updateFormField}
                required
                className="form-input"
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={form.city}
                onChange={updateFormField}
                required
                className="form-input"
              />
              <input
                type="text"
                placeholder="State"
                name="state"
                value={form.state}
                onChange={updateFormField}
                required
                className="form-input"
              />
              <input
                type="text"
                placeholder="Zip code"
                name="zipCode"
                value={form.zipCode}
                onChange={updateFormField}
                required
                className="form-input"
              />
              <input
                type="text"
                placeholder="Country"
                name="country"
                value={form.country}
                onChange={updateFormField}
                required
                className="form-input"
              />
            </div>
          )}

          {/* Delivery time display */}
          <div className="itemCharges">
            <p>
              {" "}
              <FaClock color="#4AB425" /> Delivery in{totalPreparationTime} mins
            </p>
          </div>

          {/* Save button */}
          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      ) : (
        <div id="savedData" className="saved-data-container">
          {mostRecentUserInfo && (
            <div className="saved-data-item">
              <div className="user-details">
                <h3>Your details</h3>
                {mostRecentUserInfo.name} , {mostRecentUserInfo.number} <br />
              </div>
              {/* Conditionally display address for 'takeaway' */}
              {mostRecentUserInfo.orderType === "takeaway" && (
                <p className="delivery-address">
                  <FaMapMarkerAlt color="#4AB425" /> Delivery at Home -
                  Flat no:{mostRecentUserInfo.street
                    ? ` ${mostRecentUserInfo.street},`
                    : ""}
                  {mostRecentUserInfo.city
                    ? ` ${mostRecentUserInfo.city},`
                    : ""}
                  {mostRecentUserInfo.state
                    ? ` ${mostRecentUserInfo.state},`
                    : ""}
                  {mostRecentUserInfo.zipCode
                    ? ` ${mostRecentUserInfo.zipCode},`
                    : ""}
                  {mostRecentUserInfo.country
                    ? ` ${mostRecentUserInfo.country}`
                    : ""}
                </p>
              )}
              {mostRecentUserInfo.orderType === "dine-in" && (
                <p>
                   Table no {mostRecentUserInfo.table}
                </p>
              )}

              {totalPreparationTime > 0 && (
                <p className="preparation-time">
                <FaClock color="#4AB425" />   Delivery in <strong>{totalPreparationTime} mins</strong>
                </p>
              )}
              <button className="edit-button" onClick={handleEdit}>
                Edit
              </button>
            </div>
          )}
        </div>
      )}
<div
  className={`swipe-button ${!mostRecentUserInfo || showForm ? "disabled" : ""} ${swiped ? "swiped" : ""}`}
  onClick={() => {
    if (mostRecentUserInfo && !showForm) {
      setSwiped(true);
      setTimeout(() => {
        navigate("/placeorder");
      }, 700);
    }
  }}
>
  <div className="circle">
     <span className="arrow-icon">→</span>
  </div>
  <span className="swipe-text">Swipe to Order</span>
</div>


    </div>
  );
};

export default UserInfo;
