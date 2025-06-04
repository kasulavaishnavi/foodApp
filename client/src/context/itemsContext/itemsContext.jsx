import { createContext, useEffect, useState } from "react";
// import { food_list } from "../../../../admin/src/assests/assets";
import axios from "axios"



export const ItemContext = createContext(null);

const ItemConetextProvider = (props) => {
  const url = "http://localhost:4000";
  const [cart, setCart] = useState({});
  const [filteredFoodList, setFilteredFoodList] = useState(null);
const [food_list, setFoodList] = useState([]);



 // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  

  const itemsToCart = (itemId) => {
    if (!cart[itemId]) {
      setCart((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const newCart = { ...prev }; // Create a copy of the previous cart
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1; // Decrement if count is > 1
      } else {
        delete newCart[itemId]; // Remove the item entirely if count is 1 (making it 0)
      }
      return newCart; // Return the updated cart
    });
  };

  // useEffect(()=>{
  // console.log(cart)
  // },[cart]);

  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cart) {
      if (cart[item] > 0) {
        let iteminfo = food_list.find((prod) => prod._id === item);
         if (!iteminfo) continue; 
        totalAmount += iteminfo.price * cart[item];
      }
    }
    return totalAmount;
  };

  const handleSearch = (term) => {
    console.log("Search Term Received in Context:", term);
  console.log("Original food_list:", food_list);
    if (!food_list) {
      setFilteredFoodList(null); // Clear filtered list if no food_list
      return;
    }

    const lowercasedTerm = term.toLowerCase();
    const filteredItems = food_list.filter((foodItem) =>
      foodItem.name.toLowerCase().includes(lowercasedTerm)
    );
    console.log("Filtered Items:", filteredItems);
  setFilteredFoodList(filteredItems);
  console.log("filteredFoodList after set:", filteredFoodList);
  };

    const clearSearch = () => {
    setFilteredFoodList(null);
  };

  const fetchList = async()=>{
   try {
    const res = await axios.get(`${url}/api/food/list`);
    console.log("Fetched data:", res.data); 
    setFoodList(res.data.data);
  } catch (error) {
    console.error("Error fetching food list:", error); 
  }
};

useEffect(() => {
  console.log("Calling fetchList...");
  fetchList(); 
}, []);

  const contextValue = {
    food_list,
    cart,
    setCart,
    itemsToCart,
    removeFromCart,
    totalCartAmount,
    filteredFoodList, // Expose the filtered list
    setFilteredFoodList, // Expose the function to update the filtered list (though handleSearch is better)
    handleSearch,
    clearSearch, 
  };
  return (
    <ItemContext.Provider value={contextValue}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemConetextProvider;
