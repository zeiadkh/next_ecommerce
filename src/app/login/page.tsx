import Form from "@/src/app/login/LoginForm";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Login Form",
  description: "login process",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center p-4 lg:justify-center">
      <div className="max flex flex-col overflow-hidden rounded-md bg-white shadow-lg md:flex-1 md:flex-row lg:max-w-screen-md">
        {/* <div className="alert">{login}</div> */}
        <div className="bg-base-300 p-5 md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <Form />
        </div>
      </div>
    </div>
  );
}
