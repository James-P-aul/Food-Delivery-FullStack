import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./verify.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";

function Verify() {
  const { url } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  //   console.log(success);
  //   console.log(orderId);

  const verifyPayment = async () => {
    const response = await axios.post(`${url}/api/order/verify`, {
      success,
      orderId,
    });

    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
