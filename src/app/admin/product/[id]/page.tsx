import { UserType } from "@/src/app/layout";
import { api } from "../../add-product/page";
import AdminPage from "../../page";
import { cookies } from "next/headers";
import { Metadata } from "next";
import ProductForm from "../../add-product/ProductForm";
import ProductCard from "./ProductUpdateCard";

export const metadata: Metadata = {
  title: "Update Product",
  description: "Update a product",
};

async function getUser(): Promise<UserType> {
  "use server";
  const user = await fetch(`${api}/user`, {
    headers: { token: `${process.env.BEARER}${cookies().get("token")?.value}` },
  })
    .then((res) => res.json())
    .catch((error) => console.log("usermenu", error));
  return await user;
}

export type CategoryType = {
  sucess: boolean;
  results: [
    {
      _id: string;
      name: string;
    },
  ];
};

async function getCategories(): Promise<CategoryType> {
  "use server";
  const categories = await fetch(`${api}/category`, {
  })
    .then((res) => res.json())
    .catch((error) => console.log("categories", error));
  return await categories;
}
async function getSubCategories(): Promise<CategoryType> {
  "use server";
  const subCategories = await fetch(`${api}/subcategory`, {
  })
    .then((res) => res.json())
    .catch((error) => console.log("categories", error));
  return await subCategories;
}
async function getBrands(): Promise<CategoryType> {
  "use server";
  const brands = await fetch(`${api}/brand`, {
  })
    .then((res) => res.json())
    .catch((error) => console.log("categories", error));
  return await brands;
}

export const productData = async (id: string) => {
  const product = await fetch(`${api}/product/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return product;
};



export default async function UpdateProduct({
  params: { id },
}: {
  params: { id: string };
}) {
  const user: UserType = await getUser();
  const categories: CategoryType = await getCategories();
  const subCategories: CategoryType = await getSubCategories();
  const brands: CategoryType = await getBrands();
  const product = await productData(id);
  return (
    <>
      {user?.result?.role === "admin" ? (
        <>
          <AdminPage />
          <>
            <h1 className="mb-3  text-3xl font-bold">Update Product </h1>
            <div className="flex flex-wrap gap-2">
              <div className="flex-1 ">
                <ProductForm
                  categories={categories}
                  subCategories={subCategories}
                  brands={brands}
                  buttonType="Update"
                  productId={id}
                />
              </div>
              <ProductCard
                _id={product?.message._id}
                availableItems={product?.message?.availableItems}
                price={product.message.price}
                name={product?.message?.name}
                description={product?.message.description}
                defaultImg={product?.message.defaultImg}
              />
            </div>
          </>
        </>
      ) : (
        <div className="error m-auto text-center text-3xl text-error">
          Not Authorized
        </div>
      )}
    </>
  );
}
