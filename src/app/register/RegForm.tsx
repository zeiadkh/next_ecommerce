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
    <form action={registerClientAction} className="flex flex-col space-y-5 text-black mx-auto">
      <div className="flex flex-col space-y-1">
        
        <input
          name="userName"
          type="userName"
          id="userName"
          placeholder="User Name"
          autoFocus
          className="rounded-lg border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
        />
      </div>
      <div className="flex flex-col space-y-1">
        
        <input
          name="email"
          type="email"
          id="email"
          placeholder="Enter Your Email"
          autoFocus
          className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          
          
        </div>
        <input
          name="password"
          type="password"
          id="password"
          placeholder="Enter Your new Password"
          className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
        />
      </div>
      <div className="flex flex-col space-y-1">
        
        <input
          name="confirmPass"
          type="password"
          id="confirmPass"
          autoFocus
          placeholder="Confirm your password"
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
