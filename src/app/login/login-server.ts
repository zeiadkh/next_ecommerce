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
        // console.log(respData)
        return {error: respData.message}
      }
      // console.log("Request Headers:", response.headers);
      // const requestBodySize = JSON.stringify({ email, password }).length;
      // console.log("Request Body Size:", requestBodySize);
      
      // if (!respData.succes) {
      //   
      // }
    } catch (error) {
      // cookies().set("token", "somescatch");

      // console.log("Request Headers:", response.headers);
      // const requestBodySize = JSON.stringify({ email, password }).length;
      // console.log("Request Body Size:", requestBodySize);
      console.error("login error", error);
      return {error: error.message}
    }
    finally{

      cookies().get("token")?.value ? redirect("/") :''
    }
    
  }
  