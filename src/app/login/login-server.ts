'use server'

import { cookies } from "next/headers";
import { api } from "../admin/add-product/page";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  // 'use server'
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const body = JSON.stringify({email, password})

    
    if (!email || !password)
      return {error:"Please enter a valid email and password"};
    try {
      const response = await fetch(`${api}/reg/login`, {
        method: "POST",
        cache: "no-store",
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'application/json',
        },
        body
      });
      const respData = await response.json();
      console.log(respData);
      if (respData.token) {
        cookies().set("token", respData.token);
        revalidatePath("/");
        
      }
      if(!respData.sucess){
        return {error: respData.message}
      }
    } catch (error:any) {
      return {error: error.message}
    }
    finally{

      cookies().get("token")?.value ? redirect("/") :''
    }
    
  }
  