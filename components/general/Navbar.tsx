"use client";
import Link from "next/link";
import Image from "next/image";
// import { Button } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "../ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const { getUser } = useKindeBrowserClient();
  // fetching user on client side
  // this is done bcz, if we fetch the uses session from server side, this will become a server component. And since this Navbar is present in every page, it will make every page a server/dynamically rendered component. We don't want that. for example, the dashboard/create page should be a static page, not a server component.
  // So, we fetch the user on client side. By doing that, we can make our dashboard/create (or any other) page a static page according to our needs which will make the page load faster and be more efficient.
  // now when you build the app, you will see that /dashboard/create is a static page, not a dynamically rendered one.
  const user = getUser();

  return (
    <nav className="pt-5 pb-8 flex items-center justify-between w-full">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            {/* <span className="text-blue-500">Imdad&apos;s</span>Blog */}
            <span className="text-blue-500">Middleware</span>
          </h1>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <Link
            className="text-sm font-medium hover:text-blue-500 transition-colors"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-500 transition-colors"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="h-6 w-6 relative overflow-hidden rounded-full -mr-2">
              <Image
                className="rounded-full"
                src={user.picture}
                alt="User Avatar"
                fill
              />
            </div>
            <p>{user.given_name}</p>
            <LogoutLink className={buttonVariants({ variant: "secondary" })}>
              Logout
            </LogoutLink>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <LoginLink className={buttonVariants()}>Login</LoginLink>
            <RegisterLink className={buttonVariants({ variant: "secondary" })}>
              Sign up
            </RegisterLink>
          </div>
        )}
        <div className="flex items-center justify-center w-full">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
