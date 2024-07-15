import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { getTotalAmount, food_list, cartItems, token, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    const orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 2,
    };

    let response = await axios.post(`${url}/api/order/place`, orderData, {
      headers: { token },
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }

    // console.log(orderItems);
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <div className="place-order">
      <div className="place-order-left">
        <form onSubmit={placeOrder}>
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              name="firstname"
              onChange={onChangeHandler}
              value={data.firstname}
              type="text"
              placeholder="First name"
              required
            />
            <input
              name="lastname"
              onChange={onChangeHandler}
              value={data.lastname}
              type="text"
              placeholder="Last name"
              required
            />
          </div>
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
            required
          />
          <input
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
            required
          />
          <div className="multi-fields">
            <input
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
              required
            />
            <input
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
              required
            />
          </div>
          <div className="multi-fields">
            <input
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="number"
              placeholder="Zip Code"
              required
            />
            <input
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="country"
              required
            />
          </div>
          <input
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            maxLength={10}
            placeholder="Phone"
            required
          />
          <button type="submit">PROCEED TO PAYMENT</button>
        </form>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
