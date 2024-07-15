import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setcartItems] = useState({});
  const [token, setToken] = useState("");
  const url = "https://food-del-backend-ggjj.onrender.com";

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (!response.data.success) {
        console.log(response.data.error);
      } else {
        setFoodList(response.data.data);
      }
      // await getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const getCartItems = async (token) => {
    const response = await axios.get(`${url}/api/cart/get`, {
      headers: { token },
    });
    // console.log(typeof response.data.data);
    setcartItems(response.data.data);
  };

  useEffect(() => {
    async function setup() {
      await fetchFoodItems();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await getCartItems(localStorage.getItem("token"));
      }
    }
    setup();
  }, [token]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const response = await axios.post(
        `${url}/api/cart/add`,
        { id: itemId },
        { headers: { token } }
      );

      if (!response.data.success) {
        return false;
      } else {
        return response.data.message;
      }
    }
  };

  const removeFromCart = async (itemId) => {
    if (cartItems[itemId] > 0) {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
    if (token) {
      const response = await axios.post(
        `${url}/api/cart/remove`,
        { id: itemId },
        { headers: { token } }
      );

      if (!response.data.success) {
        return false;
      } else {
        return response.data.message;
      }
    }
  };

  const getTotalAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        total += itemInfo.price * cartItems[item];
      }
    }

    return total;
  };

  const contextValue = {
    food_list,
    cartItems,
    setcartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    token,
    setToken,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
