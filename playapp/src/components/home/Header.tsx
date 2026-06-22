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
            src="https://img.icons8.com/ios-filled/50/ffffff/beach.png"
            alt="Logo"
            width={24} // ancho en píxeles
            height={24} // alto en píxeles
            className="h-6" // o podés usar aquí para styling adicional
          />
          <span className="font-bold text-white text-xl">Playapp</span>
        </div>
        <button onClick={() => setOpen(!open)} className={`${darkMode ? "text-white" : "text-gray-800"} md:hidden`}>
          ☰
        </button>
        <nav className="option-header space-x-6 hidden md:flex">
          <HelpButton />
          <a
            href="#"
            className={`${darkMode ? "text-white hover:text-white" : "text-gray-800 hover:text-gray-900"} focus:outline-none px-4 py-2 flex justify-center items-center rounded transition`}
          >
            Conocé más
          </a>
          <button
            className={`btn btn-primary ${darkMode ? "bg-white text-black hover:bg-gray-100" : ""}`}
            onClick={goToRegister}
          >
            Registrarme
          </button>
          <button
            className={`btn ${darkMode ? "bg-white text-black hover:bg-gray-100" : "btn-ghost"}`}
            onClick={scrollToLogin}
          >
            Logearme
          </button>
        </nav>
      </div>

      {open && (
        <nav className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} md:hidden px-4 pt-2 pb-4 space-y-2`}>
          <a
            href="#"
            className={`${darkMode ? "text-white" : "text-gray-800"} block px-4 py-2 text-center rounded transition`}
          >
            Ayuda
          </a>
          <a
            href="#"
            className={`${darkMode ? "text-white" : "text-gray-800"} block px-4 py-2 text-center rounded transition`}
          >
            Conocé más
          </a>
          <button
            className={`btn btn-primary ${darkMode ? "w-full bg-white text-black hover:bg-gray-100" : "w-full"}`}
            onClick={scrollToLogin}
          >
            Registrarme
          </button>
          <button
            className={`btn ${darkMode ? "w-full bg-white text-black hover:bg-gray-100" : "btn-ghost w-full"}`}
            onClick={scrollToLogin}
          >
            Logearme
          </button>
        </nav>
      )}
    </header>
  );
}
