import { api } from "../../admin/add-product/page";
import { cache } from "react";
import ProductCard from "@/src/components/ProductCard";
import { ProductType } from "@/src/components/ProductCard";
import { CategoriesTabs } from "../../page";

type categoryProductsPage = {
  params: { id: string };
};

const productData = cache(async (id: string) => {
  try {
    const product = await fetch(`${api}/category/${id}/product`);
    const respData = await product.json();
    if (!respData.success) return { error: respData.message };
    return respData.message;
  } catch (error: any) {
    return { error: error.message };
  }
});


export default async function CategoryProducts({
  params: { id },
}: categoryProductsPage): Promise<JSX.Element> {
  const productsData = await productData(id);

  const products = productsData?.map((product: ProductType) => (
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
    <div className="flex flex-col items-center gap-3">
      <CategoriesTabs id={id} />
      <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
        {products}
       
      </div>
      {!productsData.length && 
        <div className="alert-warning alert w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          No Products Found in this Category.</div>
      }
    </div>
  );
}
