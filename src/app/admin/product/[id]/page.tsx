import { UserType } from "@/src/app/layout";
import { api } from "../../add-product/page";
import AdminPage from "../../page";
import { cookies } from "next/headers";
import { Metadata } from "next";
import ProductForm from "../../add-product/ProductForm";
import  { ProductType } from "@/src/components/ProductCard";
import Link from "next/link";
import Image from "next/image";


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
    // if(user.result.role === "admin") redirect("/admin")
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
      // headers: { token: `${process.env.BEARER}${cookies().get("token")?.value}` },
    })
      .then((res) => res.json())
      .catch((error) => console.log("categories", error));
    // if(user.result.role === "admin") redirect("/admin")
    return await categories;
  }
  async function getSubCategories(): Promise<CategoryType> {
    "use server";
    const subCategories = await fetch(`${api}/subcategory`, {
      // headers: { token: `${process.env.BEARER}${cookies().get("token")?.value}` },
    })
      .then((res) => res.json())
      .catch((error) => console.log("categories", error));
    // if(user.result.role === "admin") redirect("/admin")
    return await subCategories;
  }
  async function getBrands(): Promise<CategoryType> {
    "use server";
    const brands = await fetch(`${api}/brand`, {
      // headers: { token: `${process.env.BEARER}${cookies().get("token")?.value}` },
    })
      .then((res) => res.json())
      .catch((error) => console.log("categories", error));
    // if(user.result.role === "admin") redirect("/admin")
    return await brands;
  }


  export const productData = async (id: string) => {
    const product = await fetch(`${api}/product/${id}`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  
    // if (!product.success) return notFound();
    return product;
  };


function ProductCard({ _id,
    name,
    defaultImg,
    description,
    price,
    availableItems,
    }: ProductType){
    return (
        <div className="hover: card h-full w-fit cursor-pointer bg-gray-700 transition-shadow hover:shadow-lg hover:shadow-stone-500">
      <Link href={`/products/${_id}`}>
        <figure>
          <Image
            src={defaultImg?.url}
            alt={name}
            width={400}
            height={400}
            priority
            className="h-48 w-full object-contain"
          />
        </figure>
        <div className="card-body  ">
          <h2 className="card-title">{name}</h2>
          
          <p className="description">{description}</p>
          <div className="card-actions justify-start">
            <div className="badge border-none bg-info text-black">{price}$</div>
            <div className="badge border-none bg-success text-black">
              Available: {availableItems}
            </div>
          </div>

        </div>
      </Link>
      
      
    </div>
    )
}
//   type productsPage = {
//     params: { id: string };
//   };

//   { params: { id } }
export default async function UpdateProduct({params: {id}}: {params: {id: string}}){
    const user: UserType = await getUser();
  const categories: CategoryType = await getCategories();
  const subCategories: CategoryType = await getSubCategories();
  const brands: CategoryType = await getBrands();
  const product   = await productData(id)
  // console.log( id, "from page updateProduct")
    return (
        
        <>
        {user?.result?.role === "admin" ? (
          <>
            <AdminPage />
            <>
              <h1 className="mb-3  font-bold text-3xl">Update Product </h1>
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
              <ProductCard _id={product?.message._id} availableItems={product?.message?.availableItems} price={product.message.price} name={product?.message?.name} description={product?.message.description} defaultImg={product?.message.defaultImg} />
                </div>
            </>
          </> 
        ) : (
          <div className="error m-auto text-center text-3xl text-error">
            Not Authorized
          </div>
        )}
      </>
        
    )
}