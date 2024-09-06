"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

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
          toast.success("Registration Successfull");
          const { result } = response;
          delete result?.password;
          localStorage?.setItem("user", JSON.stringify(result));
          props?.redirect?.order ? router.push("/order") : router.push("/");
        })()
      : toast.error("Registration Failed");
  };
  return (
    <>
      <h1 className="mt-5 mb-5 text-4xl font-extrabold text-gray-900">
        <span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          User
        </span>{" "}
        Registration
      </h1>
      <form
        className="m-auto flex flex-col w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="company"
              className="block mb-2 text-sm font-medium text-gray-900 text-left"
            >
              User Name
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Your Restaurant Name"
              {...register("name", {
                required: "Restaurant Name is required",
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 text-left"
            >
              Phone Number
            </label>
            <input
              type="tel"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="123-45-678"
              pattern="[0-9]{10}"
              {...register("contact", {
                required: "Contact Number is required",
              })}
            />
            {errors.contact && <p>{errors.contact.message}</p>}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 text-left"
            >
              Email
            </label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="company@email.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 text-left"
            >
              City Name
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Your City Name"
              {...register("city", { required: "City Name is required" })}
            />
            {errors.city && <p>{errors.city.message}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
          >
            Password
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
          >
            Confirm password
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            {...register("c_password", {
              required: "Confirm Password is required",
            })}
          />
          {errors.c_password && <p>{errors.c_password.message}</p>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
          >
            Address
          </label>
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Your Restaurant Address"
            {...register("address", {
              required: "Address is required",
            })}
          />
          {errors.address && <p>{errors.address.message}</p>}
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 text-left"
          >
            I agree with the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              terms and conditions
            </a>
            .
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default UserSignUp;
