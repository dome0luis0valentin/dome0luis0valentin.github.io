// /src/components/home/Header.tsx

"use client";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { useRouter } from "next/navigation";
import HelpButton from "../help/HelpButton";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { darkMode } = useTheme();

  const buttonBase = "px-4 py-2 rounded-md transition flex items-center justify-center border border-transparent hover:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer";

  const router = useRouter();

  const goToRegister = () => {
    router.push("/registrar");
  };

  function scrollToLogin() {
    const loginSection = document.getElementById("login-section");
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: "smooth" });
    } else
      router.push("/");
  }

  return (
    <header className={`${darkMode ? "bg-gray-900" : "bg-white"} shadow-md`}>
      <div className="option-header-container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="option-header items-center space-x-2 flex">
          <Image
            src={darkMode ? "https://img.icons8.com/ios-filled/50/ffffff/beach.png" : "https://img.icons8.com/ios-filled/50/000000/beach.png"}
            alt="Logo"
            width={24}
            height={24}
            className="h-6"
          />
          <span className={`font-bold ${darkMode ? "text-white" : "text-gray-900"} text-xl`}>Playapp</span>
        </div>
        <button onClick={() => setOpen(!open)} className={`${darkMode ? "text-white" : "text-gray-800"} md:hidden cursor-pointer`}>
          ☰
        </button>
        <nav className="option-header space-x-6 hidden md:flex">
          <HelpButton className={`${buttonBase} ${darkMode ? "text-white" : "text-gray-800"}`} />
          <a
            href="#"
            className={`${buttonBase} ${darkMode ? "text-white hover:text-white" : "text-gray-800 hover:text-gray-900"}`}
          >
            Conocé más
          </a>
          <button
            className={`btn ${buttonBase} ${darkMode ? "bg-white text-black hover:bg-gray-100" : "btn-ghost"}`}
            onClick={scrollToLogin}
          >
            Ingresar
          </button>
          <button
            className={`btn btn-primary ${buttonBase} ${darkMode ? "bg-white text-black hover:bg-gray-100" : ""}`}
            onClick={goToRegister}
          >
            Registrar
          </button>
        </nav>
      </div>

      {open && (
        <nav className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} md:hidden px-4 pt-2 pb-4 space-y-2`}>
          <HelpButton className={`${buttonBase} ${darkMode ? "text-white block w-full text-center" : "text-gray-800 block w-full text-center"}`} />
          <a
            href="#"
            className={`${buttonBase} ${darkMode ? "text-white block w-full text-center" : "text-gray-800 block w-full text-center"}`}
          >
            Conocé más
          </a>
          <button
            className={`btn btn-primary ${buttonBase} ${darkMode ? "w-full bg-white text-black hover:bg-gray-100" : "w-full"}`}
            onClick={scrollToLogin}
          >
            Registrarme
          </button>
          <button
            className={`btn ${buttonBase} ${darkMode ? "w-full bg-white text-black hover:bg-gray-100" : "btn-ghost w-full"}`}
            onClick={scrollToLogin}
          >
            Logearme
          </button>
        </nav>
      )}
    </header>
  );
}
