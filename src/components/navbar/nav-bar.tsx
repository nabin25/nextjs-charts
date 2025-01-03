"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const ThemeToggler = dynamic(() => import("./theme-toggler"), { ssr: false });

const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex p-5 items-center justify-center">
        <div className="py-2 sticky flex gap-3 items-center justify-between px-5 bg-gray-500/25 backdrop:blur w-full rounded-xl">
          <Image
            width={100}
            height={100}
            src="/logo.svg"
            alt="logo"
            className="w-12 aspect-square cursor-pointer"
            onClick={() => router.push("/")}
          />
          <ThemeToggler />
        </div>
      </div>
    </>
  );
};

export default Navbar;
