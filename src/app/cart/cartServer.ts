"use server";
import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";
// import { token } from "../add-product/page";
import { api } from "../admin/add-product/page";

// console.log(token)

// const token: string | any = `BKBKEBKEY__${cookies().get("token")?.value}`;
export default async function addToCart(productId: string) {
  try {
    const cartExistance = await getCart()
    const resp = cartExistance && await fetch(`${api}/cart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `${process.env.BEARER}${cookies().get("token")?.value}` 
      },
      body: JSON.stringify({ pId: productId }),
    })
    const respData = await resp.json();
    console.log(respData, "from add cart")
    if(!respData.result) return {error: "Verfiy Your email To add Products to your Cart"}
    // return resp;

  } catch (error) {
    console.log(error)
    return {error: error.message}

  }
    // .then((res) => res.json())
    // .catch((err) => {console.log(err);});
    
  revalidatePath("/");
  // revalidatePath("");
}

export async function getCart() {
  const resp = await fetch(`${api}/cart`, {
    next: { revalidate: 0 },
    headers: { token: `${process.env.BEARER}${cookies().get("token")?.value}` },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  // console.log(resp);
  if (resp.sucess === false) return {error:resp.message};

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
      token: `${process.env.BEARER}${cookies().get("token")?.value}`,
    },
    body: JSON.stringify({ pId: productId }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  revalidatePath("cart");
    revalidatePath("./CartButton");

  // revalidatePath("cartButton");
  return resp;
}

export async function clearCart(productId: string) {
  const resp = await fetch(`${api}/cart/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: `${process.env.BEARER}${cookies().get("token")?.value}`,
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
      token: `${process.env.BEARER}${cookies().get("token")?.value}`,
    },
    body: JSON.stringify({ pId: productId, quantity: quantity }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  revalidatePath("/cart");
  return resp;
}
