import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const UserLogin = (props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        login: true,
      }),
    });

    response = await response.json();
    response.success
      ? (() => {
          const { result } = response;
          delete result.password;
          localStorage.setItem("user", JSON.stringify(result));
          props?.redirect?.order ? router.push("/") : router.push("/order");
        })()
      : alert(
          "Failed to Login. Please try again with valid email and password"
        );
  };

  return (
    <>
      <h3 className="text-2xl font-semibold">User Login</h3>
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
          <button className="w-[200px] h-[30px]">SignIn</button>
        </div>
      </form>
    </>
  );
};

export default UserLogin;
