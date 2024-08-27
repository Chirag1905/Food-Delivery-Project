import React from "react";
import { useForm } from "react-hook-form";

const AddFoodItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddFoodItem = (data) => {
    console.log(data);
  };
  return (
    <>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(handleAddFoodItem)}
      >
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
