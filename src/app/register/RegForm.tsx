"use client";

import SubmitBtn from "@/src/components/SubmitBtn";
import register from "./register-server";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const [success, setSuccess] = useState(false);
  async function registerClientAction(formData: FormData) {
    const result = await register(formData);
    if (!result?.error) {
      setSuccess(true);
    }
    result?.error && toast.error(result?.error);
  }

  return (
    <form action={registerClientAction} className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="userName"
          className="text-sm font-semibold text-gray-500"
        >
          userName
        </label>
        <input
          name="userName"
          type="userName"
          id="userName"
          autoFocus
          className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-semibold text-gray-500">
          Email address
        </label>
        <input
          name="email"
          type="email"
          id="email"
          autoFocus
          className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-500"
          >
            Password
          </label>
        </div>
        <input
          name="password"
          type="password"
          id="password"
          className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="confirmPass"
          className="text-sm font-semibold text-gray-500"
        >
          confrim Password
        </label>
        <input
          name="confirmPass"
          type="password"
          id="confirmPass"
          autoFocus
          className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
        />
      </div>
      <div>
        <SubmitBtn className="block w-full">Sign Up</SubmitBtn>
      </div>
      {success && (
        <Link className="btn btn-success w-fit  self-end" href={"/login"}>
          Login
        </Link>
      )}
    </form>
  );
}
