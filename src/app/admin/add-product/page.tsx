import { Metadata } from "next";
import React from "react";
import { cookies } from "next/headers";
import AdminPage from "../page";
import { UserType } from "../../layout";
import ProductForm from "./ProductForm";
import { env } from "@/lib/env";
export const api = env.API_URL


export const metadata: Metadata = {
  title: "Add Product",
  description: "Add product to your application",
};

async function getUser(): Promise<UserType> {
  "use server";
  const user = await fetch(`${api}/user`, {
    headers: { token: `${env.BEARER}${cookies().get("token")?.value}` },
  })
    .then((res) => res.json())
    .catch((error) => console.log("usermenu", error));
  return await user;
}

export type CategoryType = {
  sucess: boolean;
  results: [
    {
      _id: string;
      name: string;
    },
  ];
};

async function getCategories(): Promise<CategoryType> {
  "use server";
  const categories = await fetch(`${api}/category`, {
  })
    .then((res) => res.json())
    .catch((error) => console.log("categories", error));
  return await categories;
}
async function getSubCategories(): Promise<CategoryType> {
  "use server";
  const subCategories = await fetch(`${api}/subcategory`, {
  })
    .then((res) => res.json())
    .catch((error) => console.log("categories", error));
  return await subCategories;
}
async function getBrands(): Promise<CategoryType> {
  "use server";
  const brands = await fetch(`${api}/brand`, {
  })
    .then((res) => res.json())
    .catch((error) => console.log("categories", error));
  return await brands;
}
export default async function AddProduct() {
  const user: UserType = await getUser();
  const categories: CategoryType = await getCategories();
  const subCategories: CategoryType = await getSubCategories();
  const brands: CategoryType = await getBrands();
  return (
    <>
      {user?.result?.role === "admin" ? (
        <>
          <AdminPage />
          <>
            <h1 className="mb-3  font-bold text-3xl">AddProduct </h1>
            <ProductForm
              categories={categories}
              subCategories={subCategories}
              brands={brands}
              buttonType="Add"
            />
          </>
        </>
      ) : (
        <div className="error m-auto text-center text-3xl text-error">
          Not Authorized
        </div>
      )}
    </>
  );
}
