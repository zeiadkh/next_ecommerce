"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { api } from "../add-product/page";

export default async function createCategory(formData: FormData) {
  const token: string | any = `BKBKEBKEY__${cookies().get("token")?.value}`
  const name = formData.get("name")?.toString();

  if (
    !name 
  )
    return {error: "must add a category name"};

  formData.delete("$ACTION_ID_712e5b32951aacc94b4d67d1a12435fc4b86c9c1");
 
  try{
    const response = await fetch(`${api}/category`, {
      method: "POST",
      headers: {
        token,
      },
      body: formData,
    })
    const respData = await response.json();
    // console.log( respData, "from category")
    if (!respData.sucess) {
      return {error: respData.message};
    }
    return {successMsg: "Category Created successfully"}
  
} catch (error: any) {
  // console.error("Create Category:", error.message);
  return {error: error.message}
}
finally{
    revalidatePath("./add-product")
}
  
}