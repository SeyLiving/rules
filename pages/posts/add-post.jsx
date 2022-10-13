import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

const AddPost = () => {
  const [data, setData] = useState({
    title: "",
    body: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
        {
          data,
        }
      );
      router.push("/post");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h3 className="p-5 text-blue-900 text-xl font-bold">
        Add Product Here
      </h3>
      <form
        className="bg-green-300 w-96 p-5  space-y-5 rounded-3xl"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="title" className="font-bold">
            Title :
          </label>
          <input
            className="font-medium"
            type="text"
            name="title"
            id="title"
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="title" className="font-bold">
            Body :
          </label>
          <textarea
            name="body"
            id="body"
            cols="40"
            rows="10"
            value={data.body}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="rounded-3xl bg-pink-600 w-60 font-bold flex justify-center p-3"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
