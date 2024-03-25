import { api } from "../admin/add-product/page";
import ProductCard, { product } from "@/src/components/ProductCard";
interface searchPageProps {
  searchParams: { keyword: string };
}

export default async function SearchPage({
  searchParams: { keyword },
}: searchPageProps) {
  const data = await fetch(`${api}/product/all/?keyword=${keyword}`).then(
    (res) => res.json(),
  );

  if (data.message === "Product not found")
    return <div className="text-center">No Products Found!</div>;
  const productsData = data.message;
  // console.log(productsData, "from seardh")
  const products = productsData.map((product: product) => (
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
      <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
        {products}
      </div>
    </div>
  );
}
