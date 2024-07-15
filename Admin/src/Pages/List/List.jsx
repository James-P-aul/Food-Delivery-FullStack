import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

function List({ url }) {
  let [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
      toast.success("Data Fetched");
    } else {
      toast.error("Error occured while fetching");
      console.log(response.data.error);
    }
  };

  const removeItem = async (id) => {
    console.log(id);
    const response = await axios.delete(`${url}/api/food/${id}`);
    await fetchList();
    if (response.data.success) {
      toast.success("Food Deleted");
    } else {
      toast.error("Error occured");
      console.log(response.data.error);
    }
  };

  useEffect(() => {
    console.log(url);
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food Items</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b className="category">Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        <hr />
        {list.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="list-table-format">
                <img src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p className="category">{item.category}</p>
                <p>${item.price}</p>
                <p
                  onClick={() => {
                    removeItem(item._id);
                  }}
                >
                  X
                </p>
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default List;
