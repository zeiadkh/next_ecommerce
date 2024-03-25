import React from "react";
import { getCart } from "../app/cart/cartServer";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import CartButton from "../app/cart/CartButton";
import UserMenuButton from "./UserMenuButton";
import { UserType } from "../app/layout";

async function search(formData: FormData) {
  "use server";
  const key = formData.get("keyword")?.toString();
  if (key) redirect(`/search/?keyword=${key}`);
}

export default async function Navbar({ user }: { user: UserType }) {
  let cart = await getCart();
  return (
    <header>
      <nav>
        <div className="navbar flex justify-start bg-base-300">
          <div className="flex-1">
            <Link
              href="/"
              className="btn btn-ghost flex items-center gap-2 text-xl"
            >
              <Image
                className=""
                src={logo}
                alt="logo"
                width={40}
                height={40}
              ></Image>
              Next Shop
            </Link>
            {
              user?.result?.role === "admin" && (
                // <div className="flex-1 self-start">
                <Link
                  href="/admin/add-product"
                  className="btn hidden  gap-2 bg-error hover:bg-emerald-500 sm:flex items-center"
                >
                  <span>Admin Dashboard</span>
                </Link>
              )
              // </div>
            }
          </div>

          <div className="form-control hidden flex-row sm:flex">
            <form action={search}>
              <input
                type="text"
                placeholder="Search"
                name="keyword"
                className="input input-bordered mr-2 h-8 w-24 md:w-auto"
              />
              <button
                type="submit"
                title="serch"
                className="btn btn-circle btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          <CartButton cart={cart} />
          <UserMenuButton user={user} />
          <div className="dropdown dropdown-end dropdown-hover flex-none">
            <ul
              className="menu dropdown-content menu-sm z-30 mt-3 w-52 rounded-box bg-base-100 p-2 shadow min-h-max"
              tabIndex={0}
            >
              <li>
                <div className="form-control flex flex-row sm:hidden">
                  <form action={search}>
                    <input
                      type="text"
                      placeholder="Search"
                      name="keyword"
                      className="input input-bordered mr-2 h-8 w-24 md:w-auto"
                    />
                    <button
                      type="submit"
                      title="serch"
                      className="btn btn-circle btn-ghost"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </li>
                {
                  user?.result?.role === "admin" && (
                    <li>
                    <Link
                      href="/admin/add-product"
                  className="btn h-fit min-h-fit bg-error hover:bg-emerald-500 sm:hidden "
                      
                    >
                      Admin Dashboard
                    </Link>
              </li>
                  )
                }
            </ul>
            <button
              type="button"
              title="menuButton"
              className="btn btn-square btn-ghost inline-block sm:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {!user?.success && (
        <div
          className="alert alert-error mx-auto my-6 flex w-[85%] justify-center sm:w-[50%]"
          role="alert"
        >
          You are not registered,
          <Link href={"/login"} className="hover:underline ">
            Try to Login.
          </Link>
        </div>
      )}
    </header>
  );
}
