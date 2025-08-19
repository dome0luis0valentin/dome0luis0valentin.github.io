'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/app/context/ThemeContext'
import { useBeaches } from '@/app/context/BeachesContext'

export default function DropdownFilter() {
  const { darkMode } = useTheme()
  const { selectedFilters, setSelectedFilters } = useBeaches()

  const options = [
    '🏖️ CONTAMINACIÓN EN LA ARENA',
    '🌊 CONTAMINACIÓN DEL AGUA',
    '🧹 LIMPIEZA',
    '🧘‍♀️ TRANQUILIDAD',
    '🎡 ATRACCIONES',
  ]

  // Inicializo con todos seleccionados si no hay selección previa
  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    selectedFilters.length ? selectedFilters : options.map((_, i) => i)
  )
  const [isOpen, setIsOpen] = useState(false)

  // Sincronizo selectedOptions con contexto cada vez que cambia
  useEffect(() => {
    setSelectedFilters(selectedOptions)
  }, [selectedOptions, setSelectedFilters])

  const toggleOption = (index: number) => {
    setSelectedOptions((prev) => {
      if (prev.includes(index)) {
        if (prev.length === 1) return prev // No dejar sin opciones
        return prev.filter((i) => i !== index)
      }
      return [...prev, index]
    })
  }

  return (
    <div
      className="
        absolute z-50
           /* más abajo para no chocar con + y - */
        right-2
        w-[160px] xs:w-[180px] sm:w-[220px] md:w-[280px] lg:w-[320px]
        max-w-[90vw]
      "
    >
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-3 py-2 rounded-lg flex items-center justify-between transition
          text-md xs:text-sm sm:text-base
          ${darkMode
            ? 'bg-black bg-opacity-80 text-white hover:bg-opacity-90'
            : 'bg-gray-200 text-black hover:bg-gray-300'}`}
      >
        ⚙️ PUNTUAR POR
        <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Opciones */}
      {isOpen && (
        <div
          className={`mt-2 rounded-lg p-2 space-y-1 transition
            text-sm xs:text-sm sm:text-base
            w-full
            ${darkMode
              ? 'bg-black bg-opacity-80 text-white'
              : 'bg-white text-black shadow-md'}`}
        >
          {options.map((label, i) => {
            const isSelected = selectedOptions.includes(i)
            return (
              <button
                key={i}
                onClick={() => toggleOption(i)}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded transition
                  whitespace-normal break-words text-left
                  ${isSelected
                    ? darkMode
                      ? 'bg-gray-900'
                      : 'bg-gray-300'
                    : 'bg-transparent'}
                  ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
              >
                <span>{label}</span>
                {isSelected && <span>✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
