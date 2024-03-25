"use server";
import { cookies } from "next/headers";
import { api } from "../add-product/page";
import { revalidatePath } from "next/cache";

export default async function createBrand(formData: FormData) {
  const token: string | any = `BKBKEBKEY__${cookies().get("token")?.value}`;
  const name = formData.get("name")?.toString();

  if (!name) return { error: "must Enter a valid Brand name" };

  formData.delete("$ACTION_ID_7bcbd097157d571165eed6e63652732f3ba62d74");
  try {
    const response = await fetch(`${api}/brand`, {
      method: "POST",
      headers: {
        token,
      },
      body: formData,
    });
    const respData = await response.json();
    if (!respData.sucess) return { error: respData.message };
    return { successMsg: "Brand Created Successfully ✌️" };
  } catch (error: any) {
    return { error: error?.message };
  } finally {
    revalidatePath("/add-brand");
  }
}
