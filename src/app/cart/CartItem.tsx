"use client";
import Image from "next/image";
import Link from "next/link";
import { deleteCart, updateCart } from "./cartServer";
import { useTransition } from "react";

export type CartItemType = {
  productId: {
    _id: string;
    name: string;
    price: number;
    availableItems: number;
    defaultImg: {
      url: string;
    };
  };
  quantity: number;
};

const quantityOptions = (limit: number): JSX.Element[] => {
  const options: JSX.Element[] = [];
  for (let i = 1; i <= limit; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  }
  return options;
};
// console.log(quantityOptions())

export default function CartItem({ productId, quantity }: CartItemType) {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <div className="mt-16 flex flex-row items-center justify-between gap-4 bg-base-300 px-12 py-4">
        <Link
          href={`/products/${productId._id}`}
          className="flex flex-col gap-4"
        >
          <h2 className="bold text-2xl font-bold ">{productId.name}</h2>
          <Image
            src={productId.defaultImg.url}
            alt={productId.name}
            width={200}
            height={200}
          />

          <span className="badge badge-accent">price: {productId.price} $</span>
          <span className="max-w badge badge-info">
            available: {productId.availableItems}
          </span>
        </Link>
        <div className="quantity">
          <label htmlFor="quantity" className="mr-2">
            Quantity:
          </label>
          <select
            title="itemquantity"
            id="quantity"
            defaultValue={quantity}
            className="select select-bordered max-w-fit"
            onChange={(e) => {
              startTransition(() =>
                updateCart(productId._id, +e.currentTarget.value),
              );
            }}
          >
            {quantityOptions(productId.availableItems)}
          </select>
          {isPending && (
            <span className="loading loading-spinner loading-sm  mx-auto my-4 block"></span>
          )}
        </div>
        <button
          type="button"
          className="btn glass btn-sm self-start justify-self-end"
          onClick={() => {
            startTransition(() => deleteCart(productId._id));
          }}
        >
          X
        </button>
      </div>

      <div className="divider"></div>
    </>
  );
}
