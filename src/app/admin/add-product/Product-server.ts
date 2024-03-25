"use server";

import { cookies } from "next/headers";
import { api } from "./page";
import { revalidatePath } from "next/cache";

export default async function addProduct(formData: FormData) {
  const token: string | any = `BKBKEBKEY__${cookies().get("token")?.value}`;
  const name = formData.get("name")?.toString();
  const price = Number(formData.get("price")) || 0;
  const description = formData.get("description")?.toString();
  const category = formData.get("category")?.toString();
  const subCateory = formData.get("subCategory")?.toString();
  const brand = formData.get("brand")?.toString();
  const availableItems = Number(formData.get("availableItems")) || 0;

  if (
    !name ||
    !category ||
    !subCateory ||
    !availableItems ||
    !brand ||
    !availableItems ||
    !description ||
    !price
  )
    return { error: "Please enter all required feilds" };

  formData.delete("$ACTION_ID_7bcbd097157d571165eed6e63652732f3ba62d74");
  try {
    const response = await fetch(`${api}/product`, {
      method: "POST",
      headers: {
        token,
      },
      body: formData,
    });
    const respData = await response.json();
    if (!respData.sucess) return { error: respData.message };
    return { successMsg: "Product Addded successfully." };
  } catch (error: any) {
    // console.error("add Product  Error:", error.message);
    return { erro: error?.message };
  } finally {
    revalidatePath("./add-product");
  }
}


export  async function updateProduct(formData: FormData, productId: string) {

  const token: string | any = `BKBKEBKEY__${cookies().get("token")?.value}`;
  const name = formData.get("name")?.toString();
  const price = Number(formData.get("price")) ;
  const description = formData.get("description")?.toString();
  const category = formData.get("category")?.toString();
  const subCateory = formData.get("subCategory")?.toString();
  const brand = formData.get("brand")?.toString();
  const availableItems = Number(formData.get("availableItems"));
  const defaultImg = formData.get("defaultImg") ;
  const imgs = formData.get("imgs");

  !name && formData.delete("name")
  !price && formData.delete("price")
  !description && formData.delete("description")
  !category && formData.delete("category")
  !subCateory && formData.delete("subCategory")
  !brand && formData.delete("brand")
  !availableItems && formData.delete("availableItems")
  defaultImg?.size  ===0 && formData.delete("defaultImg")
  imgs?.size ===0 && formData.delete("imgs")


   


  formData.delete("$ACTION_ID_7bcbd097157d571165eed6e63652732f3ba62d74");
  try {
    const response = await fetch(`${api}/product/${productId}`, {
      method: "PATCH",
      headers: {
        token,
      },
      body: formData,
    });
    const respData = await response.json();
    if (!respData.sucess) return { error: respData.message };
    return { successMsg: "Product Updated successfully." };
  } catch (error: any) {
    return { erro: error?.message };
  } finally {
    revalidatePath(`/admin/product/${productId}`);
  }
}

export  async function deleteProduct(id: string) {
  const token: string | any = `BKBKEBKEY__${cookies().get("token")?.value}`;
  

  

  try {
    const response = await fetch(`${api}/product/${id}`, {
      method: "DELETE",
      headers: {
        token,
      },
      
    });
    const respData = await response.json();
    // console.log(respData);
    if (!respData.sucess) return { error: respData.message };
    return { successMsg: "Product Deleted successfully." };
  } catch (error: any) {
    // console.error("delete Product  Error:", error.message);
    return { erro: error?.message };
  } finally {
    revalidatePath("/");
  }
}