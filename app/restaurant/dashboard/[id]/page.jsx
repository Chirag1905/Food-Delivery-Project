"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditFoodItem = (props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleLoadFoodItem();
  }, []);

  const handleLoadFoodItem = async () => {
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/edit/${props?.params?.id}`
    );
    response = await response?.json();?
    response?.success
      ? (setValue("food_name", response?.result?.name),
        setValue("price", response?.result?.price),
        setValue("path", response?.result?.img_path),
        setValue("description", response?.result?.description))
      : null;
  };

  const handleEditFoodItem = async (data) => {
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/edit/${props?.params?.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: data?.food_name,
          price: data?.price,
          img_path: data?.path,
          description: data?.description,
        }),
      }
     );
    response = await response?.json();
    response?.success
    ? router.push("../dashboard")
    : alert("Data is not updated");
  };
  return (
    <>
      <form
        className="items-center flex flex-col"
        onSubmit={handleSubmit(handleEditFoodItem)}
      >
        <h1 className="text-2xl font-semibold">Update Food Item</h1>
        <div className="m-[10px]">
          <input
            type="text"
            className="w-[200px] h-[30px]"
            placeholder="Enter food name"
            {...register("food_name", { required: "Food Name is required" })}
          />
          {errors?.food_name && <p>{errors?.food_name?.message}</p>}
        </div>
        <div className="m-[10px]">
          <input
            type="text"
            className="w-[200px] h-[30px]"
            placeholder="Enter Price"
            {...register("price", { required: "Password is required" })}
          />
          {errors?.price && <p>{errors?.price?.message}</p>}
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
          {errors?.path && <p>{errors?.path?.message}</p>}
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
          {errors?.description && <p>{errors?.description?.message}</p>}
        </div>
        <div className="m-[10px]">
          <button type="submit" className="w-[200px] h-[30px]">
            Update Food Item
          </button>
        </div>
        <div className="m-[10px]">
          <button
            type="submit"
            className="w-[200px] h-[30px]"
            onClick={() => router.push("../dashboard")}
          >
            Back to Food Item list
          </button>
        </div>
      </form>
    </>
  );
};

export default EditFoodItem;
