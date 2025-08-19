import Image from "next/image";

const steps = [
  {
    text: "Utiliza los botones en la parte superior izquierda para acercar a o alejar el mapa.",
    img: "/images/help/mas_menos.png",
    alt: "Captura de los botones de zoom"
  },
  {
    text: "Utiliza el mouse para arrastrar el mapa y ver diferentes áreas.",
    img: "/images/help/mover.png",
    alt: "Captura de pantalla mostrando cómo mover el mapa"
  },
  {
    text: "Haz clic en los íconos de las playas para ver una vista previa y más información.",
    img: "/images/help/click.png",
    alt: "Captura del vista previa de una playa"
  },
  {
    text: "Haz clic en el botón de 'Estadísticas' en la vista previa para ver detalles y opiniones.",
    img: "/images/help/show_stat.png",
    alt: "Captura de pantalla del botón de estadísticas"
  },
  {
    text: "Haz clic en el botón de 'Opinar' en la parte inferior de la estadística para dejar tu opinión. Luego arrastra para calificar.",
    img: "/images/help/opinar.png",
    alt: "Captura de pantalla opinión de una playa, y calificación"
  }
];

export default function HelpPage() {
  return (
    <main
      className="p-6 bg-gray-50"
      role="main"
      aria-label="Instrucciones para utilizar la página"
    >
      <h1 className="text-2xl font-bold mb-4" tabIndex={0}>Cómo usar esta página</h1>

      <ol className="space-y-8" role="list">
        {steps.map((step, index) => (
          <li key={index} role="listitem" className="bg-white p-4 rounded shadow-sm">
            <p className="mb-3" tabIndex={0}>{index + 1}. {step.text}</p>
            <Image
              src={step.img}
              alt={step.alt}
              width={800}
              height={400}
              tabIndex={0}
              className="rounded"
            />
          </li>
        ))}
      </ol>
    </main>
  );
}
