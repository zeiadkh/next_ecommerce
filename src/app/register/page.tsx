import SubmitBtn from "@/src/components/SubmitBtn";
import { api } from "../admin/add-product/page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import RegisterForm from "./RegForm";
import { Metadata } from "next";
import register from "./register-server";
export const metadata: Metadata = {
  title: "Sign Up Form",
  description: "Enter your data to create a new account",
};

export default function Registerpage() {
  
  // console.log(cookies().get("token"));
  return (
    <div className="flex min-h-screen items-center p-4 lg:justify-center">
      <div className="max flex flex-col overflow-hidden rounded-md bg-white shadow-lg md:flex-1 md:flex-row lg:max-w-screen-md">
        <div className="bg-base-300 p-5 md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Sign Up
          </h3>
         <RegisterForm />
        </div>
      </div>
    </div>
  );
}
