'use server'

import { redirect } from "next/navigation";
import { api } from "../admin/add-product/page";

export default async function resetPass(formData: FormData){
        const forgetCode = formData.get("forgetCode")?.toString();
        const password = formData.get("password")?.toString();
        const cPassword = formData.get("cPassword")?.toString();
        if (!password || !cPassword || !forgetCode) return {error: "Please enter a valid forgetCode and password"}
        
        try {
            const response = await fetch(`${api}/reg/resetpass`, {
                method: "PATCH",
                cache: "no-store",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ password, cPassword, forgetCode }),
              })
              const respData = await response.json();
              if(!respData.success) return {error: respData.message}
        } catch (error:any) {
            return {error: error.message}
        }
        //   console.log(response)
        redirect("/login");
}