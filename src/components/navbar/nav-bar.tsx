"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import cn from "@/utils/class-names";
const ThemeToggler = dynamic(() => import("./theme-toggler"), { ssr: false });

const Navbar = () => {
  const pathname = usePathname();
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
          <div className="flex gap-3">
            {routes.map((item, index) => (
              <div
                className={cn(
                  "flex rounded-full gap-2 px-3 py-2 dark:hover:bg-purple-300/40 hover:bg-purple-600/40 hover:backdrop:blur-md transition-colors duration-500 cursor-pointer",
                  pathname === item.href
                    ? "bg-purple-600/60 dark:bg-purple-300/60"
                    : ""
                )}
                onClick={() => router.push(item.href)}
                key={index}
              >
                {item.icon}
                <p className="text-xs">{item.name} </p>
              </div>
            ))}
          </div>
          <ThemeToggler />
        </div>
      </div>
    </>
  );
};

export default Navbar;
