import React, { createRef, useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

function Add({ url }) {
  //show image-- taken from gfg
  const [image, setImage] = useState(false);
  // const handleFileChange = (e) => {
  //   console.log(e.target.files);
  //   setImage(URL.createObjectURL(e.target.files[0]));
  // };

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    category: "Salad",
    price: "",
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData, image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("desc", formData.desc);
    data.append("category", formData.category);
    data.append("price", Number(formData.price));
    data.append("image", image);

    console.log(data);

    const response = await axios.post(`${url}/api/food/add`, data);

    console.log(response);

    if (response.data.success) {
      // console.log(selectRef);
      setFormData({
        name: "",
        desc: "",
        category: "Salad",
        price: "",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={formData.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-desc flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={formData.desc}
            name="desc"
            rows={6}
            placeholder="Enter content here"
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="rolls">rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={formData.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button className="add-btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default Add;
