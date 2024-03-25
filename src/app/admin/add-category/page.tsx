import { Metadata } from "next";
import SubmitBtn from "@/src/components/SubmitBtn";
import { cookies } from "next/headers";
import { api } from "../add-product/page";
import AdminPage from "../page";
import { UserType } from "../../layout";
import CategoryForm from "./CategoryForm";
  
  
  export const metadata: Metadata = {
    title: "create Category",
    description: "Add product to your application",
  };
  


async function getUser(): Promise<UserType> {
  'use server'
  const user = await fetch(`${api}/user`, {
    headers: { token: `${process.env.BEARER}${cookies().get("token")?.value}` },
  })
    .then((res) => res.json())
    .catch((error) => console.log("usermenu", error));
  // if(user.result.role === "admin") redirect("/admin")
  return await user
}

export default async function AddCategory() {
  const user: UserType = await getUser();
  
  return (
    
  <>
  {user?.result?.role === "admin" ? 
  <> <AdminPage />
    <>
      <h1 className="mb-3 text-3xl font-bold">Add  New Category </h1>
      <CategoryForm />
    </>
    </>
        : <div className="error text-error text-3xl m-auto text-center">Not Authroized</div>
  }</>
          )
          
        }
        