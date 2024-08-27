import React from "react";
import { useForm } from "react-hook-form";

const AddFoodItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <form>
        <input
          type="text"
          className="w-[200px] h-[30px]"
          placeholder="Enter food name"
          {...register("food_name", { required: "food name is required" })}
        />
        {errors.food_name && <p>{errors.food_name.message}</p>}
      </form>
    </>
  );
};

export default AddFoodItem;
