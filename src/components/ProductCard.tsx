import Image from "next/image";
import Link from "next/link";
import React from "react";
import { api } from "../app/admin/add-product/page";
import { UserType } from "../app/layout";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

export type ProductType = {
  
  _id: string;
  name: string;
  defaultImg: { id: string; url: string };
  description: string;
  price: number;
  availableItems: number;
  createdAt?: Date ;
};

async function getUser(): Promise<UserType> {
  "use server";
  const user = await fetch(`${api}/user`, {
    headers: { token: `${env.BEARER}${cookies().get("token")?.value}` },
  })
    .then((res) => res.json())
    .catch((error) => console.log("usermenu", error));
  return await user;
}

export default async function ProductCard({
  _id,
  name,
  defaultImg,
  description,
  price,
  availableItems,
  createdAt,
}: ProductType) {
  const user = await getUser();
  // console.log(user, 'productCard')

  const isNew =
    Date.now() - new Date(createdAt || new Date(Date.now())).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <div className="hover: card h-full w-full cursor-pointer bg-gray-700 transition-shadow hover:shadow-lg hover:shadow-stone-500">
      <Link href={`/products/${_id}`}>
        <figure>
          <Image
            src={defaultImg?.url}
            alt={name}
            width={400}
            height={400}
            priority
            className="h-48 object-cover"
          />
        </figure>
        <div className="card-body  ">
          <h2 className="card-title">{name}</h2>
          {isNew && (
            <span className="badge bg-success font-bold text-white">NEW</span>
          )}
          <p className="description">{description}</p>
          <div className="card-actions justify-start">
            <div className="badge border-none bg-info text-black">{price}$</div>
            <div className="badge border-none bg-success text-black">
              Available: {availableItems}
            </div>
          </div>
          <div className="card-actions justify-end">
            <button type="button" className="btn btn-primary">
              View
            </button>
          </div>
        </div>
      </Link>
      {user?.result?.role === "admin" && (
        <Link
          className="btn mb-2 ml-4 w-fit bg-error"
          href={`/admin/product/${_id}`}
        >
          <svg
            className="aspect-square w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
              fill="white"
            ></path>
          </svg>
        </Link>
      )}
    </div>
  );
}
