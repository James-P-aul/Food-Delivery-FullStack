import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./Pages/Add/Add.jsx";
import List from "./Pages/List/List.jsx";
import Orders from "./Pages/Orders/Orders.jsx";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const url = "http://localhost:8000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
