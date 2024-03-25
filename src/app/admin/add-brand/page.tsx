import { Metadata } from "next";
import React from "react";
import SubmitBtn from "@/src/components/SubmitBtn";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserType } from "../../layout";
import AdminPage from "../page";
import { api } from "../add-product/page";
import BrandForm from "./BrandForm";




export const metadata: Metadata = {
  title: "Add Brand",
  description: "Add product to your application",
};



async function getUser(): Promise<UserType> {
  "use server";
  const user = await fetch(`${api}/user`, {
    headers: { token: `${process.env.BEARER}${cookies().get("token")?.value}` },
  })
    .then((res) => res.json())
    .catch((error) => console.log("usermenu", error));
  return await user;
}

export default async function AddBrand() {
  const user: UserType = await getUser();

  return (
    <>
      {user.result && user.result.role === "admin" ? (
        <>
          <AdminPage />
        <h1 className="mb-3 text-3xl font-bold">Add  New Brand </h1>
        <BrandForm />
      </>
      ) : (
        <div className="alert text-error text-2xl w-fit">You Not Authorized!</div>
      )}
    </>
  );
}
