// src/components/menu/mapa/DropdownFilter.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { useBeaches } from "@/app/context/BeachesContext";

export default function DropdownFilter() {
  const { darkMode } = useTheme();
  const { selectedFilters, setSelectedFilters } = useBeaches();

  const options = [
    "🏖️ ARENA",
    "🌊 AGUA",
    "🧹 LIMPIEZA",
    "🧘‍♀️ TRANQUILIDAD",
    "🎡 ATRACCIONES",
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
          ⚙️ PUNTUAR
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
                  className={`
                    w-full flex items-center gap-2 px-2 py-1 rounded // Ajusté el padding
                    whitespace-normal break-words text-left
                    ${
                      isSelected
                        ? darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-black"
                        : darkMode 
                        ? "bg-transparent text-white"
                        : "bg-transparent text-black"
                    }
                    ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}
                  `}
                >
                  <span className="flex-1">{label}</span>
                  {isSelected && <span className="ml-auto">✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
