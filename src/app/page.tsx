import { api } from "./admin/add-product/page";
import ProductCard from "../components/ProductCard";
import  {ProductType}  from "../components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../components/Pagination";
// import CategoryProducts from "./category/[id]/page";
export interface HomeProps {
  searchParams: { page: string; limit: string };
}


type Category = {

  name: string;
  _id: string;
  
};

async function getAllProductsNumber(): Promise<number> {
  const data = await fetch(`${api}/product/all/`, {}).then((res) => res.json());

  return data.message.length;
}

export async function CategoriesTabs({ id="" }: { id: string }) {
  async function getCategories(): Promise<Category[] | any> {
    try {
      const data = await fetch(`${api}/category`, {
        next: { revalidate: 0 },
      });
      const respData = await data.json();
      if (!respData.sucess) return { error: respData.message };
      return respData.results;
    } catch (error: any) {
      return { error: error.message };
    }
  }
  const categories = await getCategories();
  return (
    <>
    <div
      role="tablist"
      className="m-8 tabs-boxed tabs flex flex-wrap justify-evenly gap-4 p-4 w-full mx-auto"
    >
      
      {categories?.map((cat: Category) => (
        <Link
          key={cat?._id}
          href={`/category/${cat?._id}`}
          role="tab"
          className={`tab hover:tab-active   min-w-[124px] border-b border-primary  ${
            cat._id == id ? "tab-active" : ""
          } text-lg capitalize `}
        >
          {cat?.name}
        </Link>
      ))}
    </div>
    </>
    
  );
}

export default async function Home({
  searchParams: { page = "1", limit = "6" },
}: HomeProps) {
  const currentPage = parseInt(page);
  const pageSize = parseInt(limit);
  const heroCount = 1;
  const data = await fetch(
    `${api}/product/all/?page=${page}&limit=${pageSize + (currentPage === 1 ?1 : 0)}`,
  ).then((res) => res.json());
  const totalItemCount = await getAllProductsNumber();
  const totalPages = Math.ceil((totalItemCount - heroCount) / pageSize);
  const productsData = data.message;

  const products = (
    currentPage === 1 ? productsData.slice(1) : productsData
  ).map((product: ProductType) => (
    <ProductCard
      key={product._id}
      _id={product._id}
      price={product.price}
      defaultImg={product.defaultImg}
      name={product.name}
      description={product.description}
      availableItems={product.availableItems}
      createdAt={product.createdAt}
    />
  ));

  return (
    <>

      <CategoriesTabs id="" />
      
      {currentPage === 1 && (
        <div className="hero mb-6 mt-4 min-h-screen rounded-lg bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={productsData[0].defaultImg.url}
              className="rounded-lg shadow-2xl md:max-w-3xl"
              alt={productsData[0].name}
              width={800}
              height={400}
              priority
            />
            <div>
              <h1 className="text-5xl font-bold">{productsData[0].name}</h1>
              <p className="py-6">{productsData[0].description}</p>
              <Link
                className="btn btn-primary"
                href={"products/" + productsData[0]._id}
              >
                View Now
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {products}
        </div>

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </>
  );
}
