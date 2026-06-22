export default function Page() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Cómo usar esta página</h1>
      <p className="mb-3 text-gray-800 dark:text-gray-200">Utiliza los botones en la parte superior izquierda para acercar o alejar el mapa. Selecciona playas para ver detalles y puntúalas con el filtro "Puntuar".</p>
      <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100">Atajos y consejos</h2>
      <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200">
        <li>En móvil, abre el menú con el icono ☰ y usa el filtro "Puntuar" para ajustar criterios.</li>
        <li>Si el menú lateral está abierto, el mapa puede quedar bloqueado; cierra el menú para interactuar con el mapa.</li>
        <li>Pulsa fuera de los paneles desplegables para cerrarlos.</li>
      </ul>
    </main>
  );
}
