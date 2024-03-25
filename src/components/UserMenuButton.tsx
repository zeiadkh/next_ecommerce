import Image from "next/image";
import avatar from "@/src/assets/profile-pic-placeholder.png";
import Link from "next/link";
import { UserType } from "../app/layout";
import LogOutButton from "./LogOutButton";

export default function UserMenuButton({ user }: { user: UserType }) {
  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        <Image
          src={user?.result?.porfilePic?.url || avatar}
          alt={user?.result?.userName || "avatar"}
          width={48}
          height={48}
          className="aspect-square w-12 rounded-full object-contain"
        />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-30 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        {user?.result?.userName && <li>
          <p className="text-primary">{user?.result?.userName}</p>
        </li>}
        {user?.result?.email && <li>
          <p className="text-primary">{user?.result?.email}</p>
        </li>}
        
        <li>
          {user?.result ? (
            <LogOutButton />
          ) : (
            <div className="flex justify-evenly">
              <Link className="btn hover:text-success" href={"/login"}>
                LogIn
              </Link>
              |
              <Link className="btn hover:text-success" href={"/register"}>
                Register
              </Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
