"use client"

import Image from "next/image"
import { useTheme } from "@/app/context/ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className={`${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-black"} py-6 border-t-0`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex space-x-4 items-center">
          <span className="text-sm font-medium">Follow us</span>
          <a href="#" aria-label="Link a página de Facebook de Playapp">
            <Image
              src="https://img.icons8.com/ios-filled/20/facebook.png"
              alt="Logo de Facebook"
              width={20}
              height={20}
            />
          </a>
          <a href="#" aria-label="Link a perfil de Instagram de Playapp">
            <Image
              src="https://img.icons8.com/ios-filled/20/instagram-new.png"
              alt="Logo de Instagram"
              width={20}
              height={20}
            />
          </a>
          <a href="#" aria-label="Link a perfil de red social X de Playapp">
            <Image
              src="https://img.icons8.com/ios-filled/20/x.png"
              alt="Link de red social X"
              width={20}
              height={20}
            />
          </a>
          <a href="#" aria-label="Link a canal de Youtube de Playapp">
            <Image
              src="https://img.icons8.com/ios-filled/20/youtube-play.png"
              alt="Link de Youtube"
              width={20}
              height={20}
            />
          </a>
        </div>

        <div className="mt-4 md:mt-0">
          <label className="text-sm font-medium">
            Inscribite a nuestra Newsletter:
            <div className="flex mt-1">
              <input
                type="email"
                placeholder="Tu mail"
                className={`px-2 py-1 rounded-l text-sm border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-300" : "border-gray-300 bg-white text-black placeholder-gray-600"}`}
              />
              <button className={`${darkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-800 hover:bg-gray-900"} text-white px-3 rounded-r text-sm`}>
                SUSCRIBIRME
              </button>
            </div>
          </label>
        </div>
      </div>
      <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-800"} text-xs mt-4`}>
        © 2025 Playapp. Todos los derechos reservados.
      </p>
    </footer>
  )
}
