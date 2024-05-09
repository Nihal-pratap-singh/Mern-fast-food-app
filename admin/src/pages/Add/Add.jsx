import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({ url }) => {

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });
  const [error, setError] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      console.log("Response:", response); // Add this line to log the response

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });
        setImage(null);
        setError("");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        setError("Failed to add food item.")
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while adding the food item.");
      toast.error("An error occurred while adding the food item.");
    }
  };


  return (
    <div className='add-container'>
      <div className='add-card'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className='add-img-upload flex-col'>
            <p>Upload image</p>
            <label htmlFor='image'>
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
          </div>

          <div className='add-product-name flex-col'>
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' />
          </div>
          <div className='add-product-description flex-col'>
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write content here...'></textarea>
          </div>
          <div className='add-category-price'>
            <div className='add-category flex-col'>
              <p>Product Category</p>
              <select onChange={onChangeHandler} name='category'>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option> {/* Corrected spelling */}
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option> {/* Corrected spelling */}
              </select>

            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type='submit' className='add-button'>ADD</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
