import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* LOGO */}
        <Link className="flex gap-2 items-center" href="/">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-md font-medium md:block">
            Breadit
          </p>
        </Link>
        {/* SearchBar */}
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          // USer Account
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
