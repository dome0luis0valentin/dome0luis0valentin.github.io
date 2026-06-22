// src/components/menu/mapa/DropdownFilter.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { useBeaches } from "@/app/context/BeachesContext";

export default function DropdownFilter() {
  const { darkMode } = useTheme();
  const { selectedFilters, setSelectedFilters } = useBeaches();

  const options = [
    "Arena",
    "Agua",
    "Limpieza",
    "Tranquilidad",
    "Atracciones",
  ];

  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    selectedFilters.length ? selectedFilters : options.map((_, i) => i)
  );
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedFilters(selectedOptions);
  }, [selectedOptions, setSelectedFilters]);

  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (!containerRef.current) return;
      const target = e.target as Node;
      if (!containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("touchstart", handleOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isOpen]);

  // Sincronizo selectedOptions con contexto cada vez que cambia
  useEffect(() => {
    setSelectedFilters(selectedOptions)
  }, [selectedOptions, setSelectedFilters])

  const toggleOption = (index: number) => {
    setSelectedOptions((prev) => {
      if (prev.includes(index)) {
        if (prev.length === 1) return prev; // No dejar sin opciones
        return prev.filter((i) => i !== index);
      }
      return [...prev, index];
    });
  };

  return (
    <div ref={containerRef} className="relative z-50 flex flex-col">
      {/* Contenedor principal sin centrar para poder alinear a la derecha en móvil */}
      <div className={`
        w-auto
        sm:w-[220px] md:w-[280px] lg:w-[320px]
        max-w-full
        ${isOpen ? "h-auto" : "h-[40px]"}
      `}>
        {/* Botón principal */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`
              w-full px-3 py-2 rounded-lg flex items-center justify-between
              text-sm sm:text-base h-[40px]
              border shadow-sm
              ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-black border-gray-200"
              }
            `}
        >
          <span className="font-medium">Puntuar</span>
          <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
        </button>

        {/* Opciones - posicionamiento absoluto fuera del flujo */}
        {isOpen && (
          <div className={`
            absolute top-[45px] right-0 left-auto md:left-0 md:right-0
            mt-1 rounded-lg p-2 space-y-1
            text-xs sm:text-sm
            max-h-[50vh] overflow-y-auto
            w-auto md:w-full min-w-[160px]
            ${
              darkMode
                ? "bg-gray-800 text-white shadow-lg"
                : "bg-white text-black shadow-lg"
            }
          `}>
            {options.map((label, i) => {
              const isSelected = selectedOptions.includes(i);
              return (
                <button
                  key={i}
                  onClick={() => toggleOption(i)}
                  className={`w-full flex items-center px-2 py-2 rounded text-left ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                >
                  <span className={`w-4 h-4 inline-flex items-center justify-center mr-3 rounded-sm border ${isSelected ? "bg-indigo-600 border-indigo-600" : darkMode ? "border-gray-600" : "border-gray-300"}`}>
                    {isSelected && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className={`flex-1 ${isSelected ? (darkMode ? "text-white" : "text-black") : (darkMode ? "text-gray-200" : "text-gray-800")}`}>{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
