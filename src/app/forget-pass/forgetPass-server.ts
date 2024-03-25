"use server";

import { redirect } from "next/navigation";
import { api } from "../admin/add-product/page";

export default async function forgetPassword(formData: FormData) {
  const email = formData.get("email")?.toString();
  if (!email) return { error: "Please enter a valid email" };
  try {
    const response = await fetch(`${api}/reg/forgetpass`, {
      method: "PATCH",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const respData = await response.json();
    if (!respData.success) return { error: respData.message };
} catch (error: any) {
    // console.log(error, "from forget server");
    return { error: error.message };
}
redirect("/reset-pass");
}
