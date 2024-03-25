import { getCart } from "./cartServer";
import CartItem, { CartItemType } from "./CartItem";
import Link from "next/link";
import { Metadata } from "next";
// import { api, token } from "../add-product/page";

export const metadata:Metadata = {
  title: "Your-Cart",
  description: "Your cart items shown here"
  
};

export default async function CartPage() {
  let cart = await getCart();
  let cartProducts = cart?.result?.products;
  return (
    <div>
      <h1 className="text-3xl font-bold">Yout Cart</h1>
      {cartProducts?.map((product: CartItemType) => (
        <CartItem key={product.productId.name} {...product} /> 
      ))}
      {cartProducts?.length >= 1 && (
        <p className="text-2xl font-bold text-secondary">
          Subtotal: 
          <span className="text-lg text-slate-300">{cart.subTotal}</span> $
        </p>
      )}
      {!cartProducts?.length && (
        <p className="text-warning mt-6">Your Cart is empty till now.</p>
      )}
      
      {cartProducts?.length >0 && <Link href={"/order"} className="btn-success btn my-4 flex-1">CheckOut</Link>}
        <div className="w-full text-center">
      <Link href={"/"} className="w-[40%] btn-info btn my-4 flex-1 ">Go Shoping</Link>

        </div>
    </div>
  );
}
