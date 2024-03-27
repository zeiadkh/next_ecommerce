"use client";

import Link from "next/link";
import SubmitBtn from "../../components/SubmitBtn";
import { login } from "./login-server";
import toast from "react-hot-toast";

export default function Form() {
  async function clientAction(formData: FormData) {

    const result = await login(formData);
    // toast(JSON.stringify(result))
    if (result?.error) toast.error(result.error);
  }
  
  return (
    <form action={clientAction} className="flex flex-col space-y-5 text-black max-w-[90%] mx-auto text-left ">
      <div className="flex flex-col space-y-1">
        <input
          name="email"
          type="email"
          id="email"
          autoFocus
          placeholder="Enter Your Email"
          className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          // onChange={(e) => (email.current = e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
        </div>
        <input
          name="password"
          type="password"
          id="password"
          placeholder="Enter Your Password"
          className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
        />
        <Link
          href="/forget-pass"
          className="text-sm text-gray-400 hover:underline focus:text-gray-500"
        >
          Forgot Password?
        </Link>
      </div>
      <div>
        <SubmitBtn className="block w-full">Log In</SubmitBtn>
        <Link
          href={"/register"}
          className="mt-4 text-right block text-sm text-gray-400 hover:underline  focus:text-gray-500"

        >
          Don&apos;t have Account?
        </Link>
      </div>
    </form>
  );
}



// function LoginForm() {
  