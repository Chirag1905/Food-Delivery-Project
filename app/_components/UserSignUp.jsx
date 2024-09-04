"use client";
import React from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

const UserSignUp = (props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data?.password !== data?.c_password) {
      setError("c_password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    } else {
      clearErrors("c_password");
    }

    let response = await axios.post("http://localhost:3000/api/user", {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      city: data?.city,
      address: data?.address,
      contact: data?.contact,
    });

    response = await response?.data;
    response.success
      ? (() => {
          alert("Registration Successfull");
          const { result } = response;
          delete result?.password;
          localStorage?.setItem("user", JSON.stringify(result));
          props?.redirect?.order ? router.push("/order") : router.push("/");
        })()
      : alert("Registration Failed");
  };
  return (
    <>
      <div>
        <h3 className="text-2xl font-semibold">User Registration</h3>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="m-[10px]">
            <input
              type="text"
              className="w-[200px] h-[30px]"
              placeholder="Enter Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="m-[10px]">
            <input
              type="text"
              className="w-[200px] h-[30px]"
              placeholder="Enter Email ID"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="m-[10px]">
            <input
              type="password"
              className="w-[200px] h-[30px]"
              placeholder="Enter Your Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className="m-[10px]">
            <input
              type="password"
              className="w-[200px] h-[30px]"
              placeholder="Enter Confirm Password"
              {...register("c_password", {
                required: "Confirm Password is required",
              })}
            />
            {errors.c_password && <p>{errors.c_password.message}</p>}
          </div>
          <div className="m-[10px]">
            <input
              type="text"
              className="w-[200px] h-[30px]"
              placeholder="Enter City Name"
              {...register("city", { required: "City Name is required" })}
            />
            {errors.city && <p>{errors.city.message}</p>}
          </div>
          <div className="m-[10px]">
            <textarea
              className="w-[200px] h-[30px]"
              placeholder="Enter Your Address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && <p>{errors.address.message}</p>}
          </div>
          <div className="m-[10px]">
            <input
              type="number"
              className="w-[200px] h-[30px]"
              placeholder="Enter Contact Number"
              {...register("contact", {
                required: "Contact Number is required",
              })}
            />
            {errors.contact && <p>{errors.contact.message}</p>}
          </div>
          <div className="m-[10px]">
            <button className="w-[200px] h-[30px]">SignIn</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserSignUp;
