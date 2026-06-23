"use client";
import { useRouter } from "next/navigation";

export default function HelpButton({ className }) {
  const router = useRouter();

  const defaultClasses = "px-4 py-2 flex justify-center items-center border border-transparent rounded transition cursor-pointer";

  return (
    <button
      onClick={() => router.push("/help")}
      className={`${defaultClasses} ${className ?? ""}`}
      aria-label="Ir a la sección de ayuda e instrucciones de uso"
    >
      Ayuda
    </button>
  );
}
