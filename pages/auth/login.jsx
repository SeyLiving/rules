import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/");
    }

    // console.log(data);
  };

  return (
    <div className="min-h-[calc(100vh_-_64px)] flex justify-center items-center">
      <form
        className=" bg-gray-100 p-5 mb-10 mt-40 rounded-3xl"
        onSubmit={handleSubmit}
      >
        {error && <p>{error}</p>}
        <div>
          <h1 className="flex justify-center rounded-lg w-72 p-3 text-blue-900 text-xl font-bold">
            Welcome Back
          </h1>
        </div>
        <div className="font-medium space-x-8 h-10 mt-20 rounded-lg">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="font-medium space-x-1 h-40 rounded-lg">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            type="submit"
            className=" bg-pink-500 rounded-lg w-80 font-semibold p-3 flex justify-center text-lg text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
