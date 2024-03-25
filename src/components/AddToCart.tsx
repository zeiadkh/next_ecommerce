// "use client";
// import React, {  useEffect, useState, useTransition } from "react";
// import addToCart from "../app/cart/cartServer";
// import cartIcon from "../assets/icons8-shopping-cart-50.png"
// import Image from "next/image";
// import Link from "next/link";

// type AddToCartPorpsType = {
//   productId: string;
// };


// export default function AddToCart({ productId }: AddToCartPorpsType) {
//   const [isPending, startTransition] = useTransition();
//   const [success, setSucess] = useState(false);
//   console.log("aga")
//   // useEffect(() => {
//   //   const span = document.querySelector("span")
//   //   span?span.remove(): ''
//   // }, [isPending])
//   return (
//     <>
//       <button
//         type="button"
//         className="btn btn-primary"
//         onClick={() => {
//           setSucess(false);
//           startTransition(async () => {
//             await addToCart(productId);
//             setSucess(true);
//           });
//         }}
//         disabled={isPending}
//       >
//         Add To Cart
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//           />
//         </svg>
//         {isPending && <span className="loading loading-spinner"></span>}
//       </button>
//       {!isPending && success && (
//         <div className="flex-col gap-10">
//         <span className="block text-success my-auto">Added To your cart.</span>
//         <Link href={"/order"} className=" btn-success btn m-8">CheckOut</Link>
//       </div>
//       )}
//     </>
//   );
// }
