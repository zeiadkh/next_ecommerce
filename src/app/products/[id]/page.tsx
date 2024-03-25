import { notFound } from "next/navigation";
import { api } from "../../admin/add-product/page";
import Image from "next/image";
import { cache } from "react";
import { Metadata } from "next";
import AddToCart from "@/src/app/cart/AddToCart";
import { getCart } from "../../cart/cartServer";
// import { getUser } from "../../layout";
// import UpdateButton from "@/src/components/UpdateButton";

type productsPage = {
  params: { id: string };
};

export const productData = cache(async (id: string) => {
  const product = await fetch(`${api}/product/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  if (!product.success) return notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: productsPage): Promise<Metadata> {
  const product = await productData(id);
  return {
    title: product.message.name,
    description: product.message.description,
    openGraph: { images: [product.message.defaultImg.url] },
  };
}

export default async function ProductPage({ params: { id } }: productsPage) {
  const product = await productData(id);

  const cart = await getCart();
  return (
    <section className="flex flex-col flex-wrap justify-center gap-4 bg-base-300 p-5 lg:flex-row">
      <Image
        src={product.message.defaultImg.url}
        alt={product.message.name}
        width={500}
        height={500}
        className="block max-w-full rounded-md  object-cover"
      />
      <div className=" flex flex-col gap-4">
        <h1 className=" text-5xl ">{product.message.name}</h1>
        <p className="">{product.message.description}</p>
        <span className="badge badge-success">{product.message.price}$</span>
        <div className="card-actions justify-end">
          {product.message.availableItems > 0 && cart?.success ? (
            <AddToCart productId={product.message._id} />
          ) : !cart?.success ? (
            <div className="alert alert-error w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              You need to activat your account to add this product to your cart.
            </div>
          ) : (
            <div className="alert alert-error w-fit">Sold Out</div>
          )}
        </div>
      </div>
    </section>
  );
}
