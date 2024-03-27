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
  
  return (
    <div className="flex min-h-screen items-center p-4 justify-center">
      <div className="md:max-w-[40%] flex flex-col overflow-hidden rounded-md bg-white  md:flex-1 md:flex-row lg:max-w-screen-md">
        <div className="bg-base-100 sm:px-14 sm:py-8 p-6 md:flex-1 text-center">
          <h3 className="mb-4 text-2xl font-semibold text-yellow-50">
            Sign Up
          </h3>
         <RegisterForm />
        </div>
      </div>
    </div>
  );
}
