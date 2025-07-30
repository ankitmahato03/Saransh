import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-4 mx-auto max-w-screen-xl bg-amber-300 mt-1.5 border rounded-sm ">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
        >
          <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-gray-500 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            {" "}
            Saransh
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-sm lg:text-base">
        <Link
          href="/#pricing"
          className="text-gray-600 hover:text-black transition-colors duration-200"
        >
          Pricing
        </Link>
        <SignedIn>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-black transition-colors duration-200"
          >
            Your Summaries
          </Link>
        </SignedIn>
      </div>

      {/* Sign in  */}
      {/* if you have any confusion please go to video timestam:- 2.16.43 */}

      <div className="flex gap-3 items-center">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <Link
              href="/upload"
              className="text-gray-600 hover:text-black transition-colors duration-200"
            >
              <Button variant={"outline"}>Upload PDF</Button>
            </Link>
            <div>pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

      <SignedOut>
        <div>
          <Link
            href="/sign-in"
            className="text-gray-600 hover:text-black transition-colors duration-200"
          >
            Sign in
          </Link>
        </div>
        </SignedOut>
      </div>
    </nav>
  );
}
