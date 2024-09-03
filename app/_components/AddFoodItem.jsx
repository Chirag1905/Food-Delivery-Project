"use client";
import React from "react";
import { useForm } from "react-hook-form";

const AddFoodItem = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddFoodItem = async (data) => {
    let resto_id;
    const resturantData = localStorage?.getItem("restaurantUser") && JSON.parse(localStorage?.getItem("restaurantUser"));
    if (resturantData) {
      resto_id = resturantData?._id;
    }
    let response = await fetch("http://localhost:3000/api/restaurant/foods", {
      method: "POST",
      body: JSON.stringify({
        name: data?.food_name,
        price: data?.price,
        img_path: data?.path,
        description: data?.description,
        resto_id,
      }),
    });

    response = await response?.json();
    response?.success
      ? (alert("Food Item Added Suceesfully"), props?.setAddItem(false))
      : null;
  };
  return (
    <>
      <form
        className="items-center flex flex-col"
        onSubmit={handleSubmit(handleAddFoodItem)}
      >
        <h1 className="text-2xl font-semibold">Add New Food Item</h1>
        <div className="m-[10px]">
          <input
            type="text"
            className="w-[200px] h-[30px]"
            placeholder="Enter food name"
            {...register("food_name", { required: "Food Name is required" })}
          />
          {errors.food_name && <p>{errors.food_name.message}</p>}
        </div>
        <div className="m-[10px]">
          <input
            type="text"
            className="w-[200px] h-[30px]"
            placeholder="Enter Price"
            {...register("price", { required: "Password is required" })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div className="m-[10px]">
          <input
            type="text"
            className="w-[200px] h-[30px]"
            placeholder="Enter image path"
            {...register("path", {
              required: "Image Path is required",
            })}
          />
          {errors.path && <p>{errors.path.message}</p>}
        </div>
        <div className="m-[10px]">
          <input
            type="text"
            className="w-[200px] h-[30px]"
            placeholder="Enter Description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className="m-[10px]">
          <button type="submit" className="w-[200px] h-[30px]">
            Add Food Item
          </button>
        </div>
      </form>
    </>
  );
};

export default AddFoodItem;
