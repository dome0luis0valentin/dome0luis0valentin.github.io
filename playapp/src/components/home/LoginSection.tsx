// /src/components/home/LoginSection.tsx

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@/app/context/ThemeContext";

export default function LoginSection() {
  const router = useRouter();
  const { darkMode } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // lógica de autenticación opcional aquí
    router.push("/menu"); // 👉 redirección a la página "search"
  };

  return (
    
    // Fondo para toda la sección
    <div className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} py-12 flex justify-center`}>
      {/* Formulario con fondo y sombra */}
      <div className={`rounded-lg shadow-md max-w-md w-full mx-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <section id="login-section">
          <div id="log-section" className="px-4 py-6">
            <h2 className="text-center text-xl font-semibold mb-6">INGRESAR</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="p-2 block">
                Nombre de Usuario
                <input
                  id="input_name"
                  type="text"
                  placeholder="John Doe"
                  aria-label="Nombre de usuario"
                  className={`w-full p-2 rounded mt-1 border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-300" : "border-gray-300 bg-white text-black placeholder-gray-600"}`}
                  required
                />
              </label>
              <label className="p-2 block">
                Email
                <input
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  aria-label="Email del usuario"
                  className={`w-full p-2 rounded mt-1 border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-300" : "border-gray-300 bg-white text-black placeholder-gray-600"}`}
                  required
                />
              </label>
              <label className="p-2 block">
                Contraseña
                <input
                  type="password"
                  placeholder="123456"
                  className={`w-full p-2 rounded mt-1 border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-300" : "border-gray-300 bg-white text-black placeholder-gray-600"}`}
                  required
                />
              </label>
              <div className="py-2">
                <button
                  type="submit"
                  className={`btn btn-primary w-full ${darkMode ? "" : ""}`}
                >
                  Ingresar
                </button>
              </div>
            </form>

            <p className="text-center mt-4 text-sm pb-2">
              ¿Aún no tenés una cuenta?
            </p>
            <div className="py-2">
              <button
                className={`btn btn-primary w-full`}
                onClick={() => router.push("/registrar")}
              >
                Registrarme
              </button>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button className="border border-gray-300 flex-1 py-2 rounded flex items-center justify-center gap-2">
                <Image
                  src="https://img.icons8.com/color/20/google-logo.png"
                  alt="Google logo"
                  width={20}
                  height={20}
                  className="ml-3"
                />
                Ingresar con Google
              </button>
              <button className="border border-gray-300 flex-1 py-2 rounded flex items-center justify-center gap-2">
                <Image
                  src="https://img.icons8.com/ios-filled/20/1877F2/facebook-new.png"
                  alt="Facebook logo"
                  width={20}
                  height={20}
                  className="ml-3"
                />
                Ingresar con Facebook
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
