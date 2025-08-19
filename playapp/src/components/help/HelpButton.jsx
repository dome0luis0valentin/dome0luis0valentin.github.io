"use client";
import { useRouter } from "next/navigation";

export default function HelpButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/help")}
      className="text-white hover:text-white focus:outline-none 
                 px-4 py-2 flex justify-center items-center border border-transparent 
                 hover:border-white focus:border-white rounded transition"
      aria-label="Ir a la sección de ayuda e instrucciones de uso"
    >
      Ayuda
    </button>
  );
}
