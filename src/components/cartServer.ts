// "use server";
// import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";
// // import { token } from "../app/cart/cartServer";
// import { api } from "../app/admin/add-product/page";

// // console.log('from cart server', cookies().get("token"))
// // const token: string | any = `BKBKEBKEY__${cookies().get("token")?.value}`

// export async function getCart() {
//  try {
//   const resp = await fetch(`${api}/cart`, {
    
//     headers: { token: `${process.env.BEARER}${cookies().get("token")?.value}` },
//   })
//   const respData = await resp.json();
//   if(!respData.success) return {error: respData.message}
//   revalidatePath("./CartButton");
//   return {
//     ...respData,
//     length: respData?.result?.products?.length || 0,
//     subTotal:
//       respData?.result?.products?.reduce(
//         (
//           acc: number,
//           product: { quantity: number; productId: { price: number } },
//         ) => acc + product.productId.price * product.quantity,
//         0,
//       ) || 0,
//   };
//   // console.log(respDataData)
//  } catch (error) {
  
//   //  console.log(error);
//  }
//     // .then((res) => res.json())
//     // .catch((err) => console.log("31 ", err));
//   // if (!resp?.sucess) return new Error(resp?.message);
//   // cookies().set("itemsNumber", `${resp.result.products.length}`)

  
// }
