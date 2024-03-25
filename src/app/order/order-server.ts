"use server";

import { cookies } from "next/headers";
import { api } from "../admin/add-product/page";
import { redirect } from "next/navigation";


export default async function order(formData: FormData) {
    const phone = formData.get("phone")?.toString();
    const coupon = formData.get("coupon")?.toString();
    const address = formData.get("address")?.toString();
    const payment = formData.get("payment")?.toString();
    if (!phone || !address) {
      return {error: "Please enter a valid phone and address"};
    }
    // console.log(formData)
    // formData.delete("$ACTION_ID_df7a6a55c8179280b0f9be7b7a28b19765318f8c");
   try {
    const response = await fetch(`${api}/order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `BKBKEBKEY__${cookies().get("token")?.value}`,
      },
      body: JSON.stringify({
        phone,
        ...(coupon?.length && { coupon }),
        address,
        ...(payment && { payment }),
      }),
    })
    
    const respData = await response.json();
    if(!respData.success) return {error: respData.message || 'some thing went wrong'}
    if (respData.sucess === false) redirect("../order/failed-payment");
    if (respData.success && payment === "visa")  return {url: respData?.result}
   } catch (error) {
    return {error: error.message} 
   }
    redirect("../order/successfull-payment");
  }