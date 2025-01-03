"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { RxMoon } from "react-icons/rx";
import { LuSun } from "react-icons/lu";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const toggleMode = () => setTheme(theme == "light" ? "dark" : "light");

  return (
    <>
      <button
        onClick={toggleMode}
        className="rounded-md p-2 bg-none hover:bg-purple-400/40 transition-colors duration-400"
      >
        {theme === "dark" ? <RxMoon /> : <LuSun />}
      </button>
    </>
  );
};

export default ThemeToggler;
