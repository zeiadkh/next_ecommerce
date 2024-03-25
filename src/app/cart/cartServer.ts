"use server";
import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";
import { api } from "../admin/add-product/page";
import { env } from "@/lib/env";

export default async function addToCart(productId: string) {
  try {
    const cartExistance = await getCart();
    const resp =
      cartExistance &&
      (await fetch(`${api}/cart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: `${env.BEARER}${cookies().get("token")?.value}`,
        },
        body: JSON.stringify({ pId: productId }),
      }));
    const respData = await resp.json();
    if (!respData.result)
      return { error: "Verfiy Your email To add Products to your Cart" };
  } catch (error:any) {
    return { error: error.message };
  }

  revalidatePath("/");
}

export async function getCart() {
  const resp = await fetch(`${api}/cart`, {
    next: { revalidate: 0 },
    headers: { token: `${env.BEARER}${cookies().get("token")?.value}` },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  if (resp.sucess === false) return { error: resp.message };

  revalidatePath("/cart");
  revalidatePath("./CartButton");
  revalidatePath("/");
  return {
    ...resp,
    length: resp.result.products?.length || 0,
    subTotal:
      resp.result.products?.reduce(
        (
          acc: number,
          product: { quantity: number; productId: { price: number } },
        ) => acc + product.productId.price * product.quantity,
        0,
      ) || 0,
  };
}

export async function deleteCart(productId: string) {
  const resp = await fetch(`${api}/cart/${productId}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: `${env.BEARER}${cookies().get("token")?.value}`,
    },
    body: JSON.stringify({ pId: productId }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  revalidatePath("cart");
  revalidatePath("./CartButton");

  return resp;
}

export async function clearCart(productId: string) {
  const resp = await fetch(`${api}/cart/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: `${env.BEARER}${cookies().get("token")?.value}`,
    },
  });
  revalidatePath("/cart");
  revalidatePath("/Navbar");
  return resp;
}

export async function updateCart(productId: string, quantity: number) {
  const resp = await fetch(`${api}/cart/`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: `${env.BEARER}${cookies().get("token")?.value}`,
    },
    body: JSON.stringify({ pId: productId, quantity: quantity }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  revalidatePath("/cart");
  return resp;
}
