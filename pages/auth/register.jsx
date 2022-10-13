import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

const register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = data;

    if (
      firstName == "" &&
      lastName == "" &&
      email == "" &&
      password == "" &&
      confirmPassword == ""
    ) {
      setError("Please provide all the information");
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not macth");
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        data
      );
      router.push("/auth/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_64px)] flex justify-center items-center">
      <div className="p-4 w-full max-w-lg bg-white rounded-lg border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-400 dark:border-gray-700">
        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <h1 className="flex justify-center mb-5 text-xl font-medium text-gray-900 dark:text-yellow-600">
            Sign Up
          </h1>
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              First Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="firstName"
              value={data.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Last Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="lastName"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="password"
              name="password"
              id="password"
              placeholder="**********"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {" "}
              Confirm Password
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="**********"
              value={data.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 px-5 py-2.5 dark:focus:ring-pink mt-10 font-semibold p-3 text-center text-lg text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default register;
