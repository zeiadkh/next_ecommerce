"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { api } from "../admin/add-product/page";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";


export default async function register(formData: FormData) {
  cookies().delete("token");
  const userName = formData.get("userName")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPass = formData.get("confirmPass")?.toString();
  if (!email || !password || !confirmPass || !userName)
    return {error: "Please enter the requird data"};

  formData.delete("$ACTION_ID_df7a6a55c8179280b0f9be7b7a28b19765318f8c");
  try {
    const response = await fetch(`${api}/reg/register`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, userName, confirmPass }),
    });
    const respData = await response.json();
    if(!respData.succes) return {error: respData.message}
    
    revalidatePath("/");
    revalidatePath('/register')
    
  } catch (error: any) {
    return { error: error.message };
  }
  
  
 
}


