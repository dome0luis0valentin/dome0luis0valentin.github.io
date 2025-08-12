// src/components/menu/mapa/DropdownFilter.tsx

"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    setSelectedFilters(selectedOptions);
  }, [selectedOptions, setSelectedFilters]);

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
    <div className="relative z-50 flex flex-col">
      {/* Contenedor principal con ancho fijo y sin expansión */}
      <div className={`
        w-full
        sm:w-[220px] md:w-[280px] lg:w-[320px]
        max-w-full
        mx-auto
        ${isOpen ? "h-auto" : "h-[40px]"}
      `}>
        {/* Botón principal */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`
            w-full px-3 py-2 rounded-lg flex items-center justify-between
            text-sm sm:text-base h-[40px]
            ${
              darkMode
                ? "bg-black bg-opacity-80 text-white hover:bg-opacity-90"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }
          `}
        >
          ⚙️ PUNTUAR
          <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
        </button>

        {/* Opciones - posicionamiento absoluto fuera del flujo */}
        {isOpen && (
          <div className={`
            absolute top-[45px] left-0 right-0
            mt-1 rounded-lg p-2 space-y-1
            text-xs sm:text-sm // Cambié aquí para reducir el tamaño de la fuente en dispositivos pequeños
            max-h-[50vh] overflow-y-auto
            w-full
            ${
              darkMode
                ? "bg-black bg-opacity-80 text-white"
                : "bg-white text-black shadow-md"
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
                          ? "bg-gray-900 text-white" // Asegura que el texto sea blanco en modo oscuro
                          : "bg-gray-300 text-black" // Asegura que el texto sea negro en modo claro
                        : darkMode 
                        ? "bg-gray-700 text-white"
                        : "bg-transparent text-black" // Texto negro por defecto
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
