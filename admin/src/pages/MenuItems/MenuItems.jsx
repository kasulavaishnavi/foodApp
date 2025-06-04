import React, { useEffect, useState } from "react";
import "./MenuItems.css";
import axios from "axios";

const MenuItems = () => {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "Select",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  //   useEffect(()=>{
  // console.log(data);
  //   },[data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append("name", data.name);
    dataForm.append("price", Number(data.price));
    dataForm.append("category", data.category);
    dataForm.append("image", image);

    try {
      const res = await axios.post(`${url}/api/food/add`, dataForm);

      if (res.data.success) {
        setData({
          name: "",
          price: "",
          category: "Select",
        });
        setImage(false);
        alert("Item added successfully!");
      } else {
        console.log("Upload failed:");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Something went wrong.");
    }
  };



  //List
  const [list, setList] = useState([]);

  const fetchList = async() =>{
    const res = await axios.get(`${url}/api/food/list`);
    if(res.data.success){
setList(res.data.data);
    }else{
      console.log('error');

    }
  }
const deleteItem = async(foodId)=>{
console.log(foodId)
const res = await axios.post(`${url}/api/food/delete`, {id: foodId});
await fetchList();
if(res.data.success){
  alert("Item deleted successfully!");
} 
else{
  alert("error");
}
}
  useEffect(()=>{
fetchList()
  },[])



  return (
    <div className="container">
    <div className="add">
      <form className="flexCol" onSubmit={handleSubmit}>
        <div className="addImage flexCol">
          <p>Upload Image</p>
          <label htmlFor="image">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="preview" />
            ) : (
              <i className="fa-solid fa-cloud-arrow-up upload-icon"></i>
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="ItemName flexCol">
          <p>Item Name</p>
          <input
            onChange={HandleChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="enter Item name"
          />
        </div>
        <div className="itemPrice flexCol">
          <p>Item Price</p>
          <input
            onChange={HandleChange}
            value={data.price}
            type="number"
            name="price"
            placeholder="Enter Price"
          />
        </div>
        <div className="addCategory flexCol">
          <p>Item Category</p>
          <select onChange={HandleChange} value={data.category} name="category">
            <option value="Select">Select</option>
            <option value="French Fries">French Fries</option>
            <option value="Salad">Salad</option>
            <option value="Coffee">Coffee</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Rolls">Rolls</option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Pasta">Pasta</option>
            <option value="Deserts">Deserts</option>
          </select>
        </div>
        <button type="submit" className="addBtn">
          ADD
        </button>
      </form>
    </div>
<div className="list">
  <p>Food List</p>
  <div className="listTable">
    <div className="tableFormat title">
      <b>Image</b>
      <b>Name</b>
      <b>Price</b>
      <b>Category</b>
      <b>Action</b>
    </div>
{list.map((item, index)=>{
  return(
    <div key={index} className="tableFormat">
      <img src={`${url}/images/` + item.image} alt=""/>
      <p>{item.name}</p>
      <p>{item.price}</p>
      <p>{item.category}</p>
      <p onClick={()=>deleteItem(item._id)} className="cross">X </p>
    </div>
  )
})}
  </div>
</div>
    </div>
  );
};

export default MenuItems;
