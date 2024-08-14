import React from "react";
import { useForm } from "react-hook-form";

const RestaurantLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <h3>SignIn</h3>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
          <button className="w-[200px] h-[30px]">Login</button>
        </div>
      </form>
    </>
  );
};

export default RestaurantLogin;
