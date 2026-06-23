import Image from "next/image"

const beachImages = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHfiR2ya7m-Se19ZqHxhP5EORNzw3tR6IKqw&s",
    alt: "Varias personas nadando en el río en un día soleado",
  },
  {
    src: "https://www.clarin.com/img/2018/11/07/GTFKkcrYC_1256x620__1.jpg",
    alt: "Paisaje de la playa vacía",
  },
  {
    src: "https://www.clarin.com/img/2016/08/16/r1lQG3MRXl_720x0.jpg",
    alt: "Camino al lado del río, con árboles a un costado, que dan sombra",
  },
  {
    src: "https://www.baenegocios.com/tools/image.php?id=175120&p=/files/image/175/175120/69434cb953c66.jpg&w=532&h=355&s=13a25568a4aaf093fa64566e54564f4e",
    alt: "Árbol a la orilla de una playa",
  },
  {
    src: "https://offloadmedia.feverup.com/bairessecreta.com/wp-content/uploads/2025/12/26123347/playa-berisso-buenos-aires-1.jpg",
    alt: "Río a la izquierda, separado por una baranda de seguridad, un camino y tiendas",
  },
  {
    src: "https://media.0221.com.ar/adjuntos/357/migration/0221/012023/1673102485126.jpg",
    alt: "Imagén de la arena de la playa",
  },
]

export default function TopBeaches() {
  return (
    <section
      className="py-10"
      role="region"
      aria-label="Galería de imágenes de playas del Río de la Plata"
    >
      <h2 className="text-center text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Conocé cuáles son las mejores playas del Río de la Plata
      </h2>

      <div
        className="flex flex-col sm:flex-row sm:justify-center gap-3 overflow-x-auto px-4"
        role="list"
        tabIndex={0}
      >
        {beachImages.map((image, idx) => (
          <div
            key={idx}
            className="relative min-w-[300px] h-[200px] rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            tabIndex={0}
          >
           <Image
              src={image.src}
              alt={image.alt}
              fill unoptimized
              className="object-cover rounded"
              sizes="(max-width: 768px) 100vw, 300px"
              tabIndex={0}
            />
          </div>
        ))}
      </div>

      <p className="text-center text-sm mt-4 text-gray-700 dark:text-gray-300">
        Tu opinión también cuenta
      </p>
    </section>
  )
}
