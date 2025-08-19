"use client";

import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";

interface TopbarProps {
  onToggleSidebar: () => void;
  onToggleSearch: () => void;
}

export default function Topbar({
  onToggleSidebar,
  onToggleSearch,
}: TopbarProps) {
  const { darkMode } = useTheme();
  return (
    <header
      className={`flex flex-wrap items-center justify-between px-2 py-2 shadow gap-2 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          id="menuToggle"
          className={`text-2xl ${darkMode ? "text-white" : "text-black"}`}
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        {/* Mostrar saludo solo en pantallas un poco más grandes */}
        <h1 className="text-lg font-semibold hidden xs:block">
          Bienvenido John
        </h1>
      </div>

      {/* Bloque de acciones */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Buscar solo en >= sm */}
        <div className="hidden sm:block">
          <input
            type="text"
            placeholder="Buscar"
            className={`w-28 sm:w-40 md:w-64 px-3 py-1.5 rounded-full text-sm focus:outline-none ${
              darkMode
                ? "bg-gray-700 text-white placeholder-gray-300"
                : "bg-gray-100 text-black"
            }`}
          />
        </div>
        {/* Icono de buscar en móvil */}
        <button
          id="mobileSearchToggle"
          className="sm:hidden text-xl"
          onClick={onToggleSearch}
          aria-label="Toggle search"
        >
          🔍
        </button>
        <span className="relative flex-shrink-0">
          🔔
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            4
          </span>
        </span>
        {/* Avatar y nombre */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Image
            src="https://randomuser.me/api/portraits/men/32.jpg"
            width={28}
            height={28}
            alt="User"
            className="rounded-full"
          />
          <span className="text-xs sm:text-sm">John Doe</span>
        </div>
      </div>
    </header>
  );
}
