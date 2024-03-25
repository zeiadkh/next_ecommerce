import { ProductType } from "@/src/components/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
    _id,
    name,
    defaultImg,
    description,
    price,
    availableItems,
  }: ProductType) {
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
    );
  }