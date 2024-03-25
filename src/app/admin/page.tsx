import Link from "next/link";
import { UserType } from "../layout";
import { api } from "./add-product/page";
import { cookies } from "next/headers";
async function getUser(): Promise<UserType> {
  'use server'
  const user = await fetch(`${api}/user`, {
    headers: { token: `${process.env.BEARER}${cookies().get("token")?.value}` },
  })
    .then((res) => res.json())
    .catch((error) => console.log("usermenu", error));
    // console.log(user)
  // if(user.result.role === "admin") redirect("/admin")
  return await user
}

export default async function AdminPage() {
  const user: UserType = await getUser()
  // if (!cookies().get("token")?.value) return new Error("please login");
  // console.log(cookies().get("token"), "from admin")
    return (
    <header>
       {user?.result?.role === "admin" ? ( 
        <nav className="navbar mb-6">
          <div className="navbar bg-base-300 flex-wrap gap-4">
          
            <div className="flex-1 ">
              <Link
                href="/admin/add-product"
                className="btn btn-ghost flex items-center gap-2 sm:text-xl text-sm shadow-[#27363a]  shadow-inner mr-1 w-full"
              >
                Add Product
              </Link>
            </div>
            <div className="flex-1">
              <Link
                href="/admin/add-category"
                className="btn btn-ghost flex items-center gap-2 sm:text-xl text-sm  shadow-[#27363a]  shadow-inner mr-1 w-full"
              >
                Add Category
              </Link>
            </div>
            <div className="flex-1">
              <Link
                href="/admin/add-brand"
                className="btn btn-ghost flex items-center gap-2 sm:text-xl text-sm  shadow-[#27363a] shadow-inner mr-1 w-full"
              >
                Add Brand
              </Link>
            </div>
           
          </div>
        </nav>
        ):
        <div className="alert text-error text-2xl w-fit ">You Not Authorized!</div>
        
        }  
    </header>
  );
}
