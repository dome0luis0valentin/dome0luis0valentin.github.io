// /src/components/home/Hero.tsx

import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black dark:text-gray-100">
            Encontrá la mejor playa para vos y tu familia
          </h1>
          <p className="mb-6 text-black dark:text-gray-100">
            ¿Alguna vez te preguntaste qué tan segura, higiénica, bonita o tranquila es la playa a la que querés ir?
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="https://media.ambito.com/p/cae9d4e2e89e8b4510c1485d1c201051/adjuntos/239/imagenes/040/349/0040349239/1200x675/smart/punta-indio_playajpg.jpg"
            alt="Playa destacada"
            width={900} // puedes ajustar
            height={600} // puedes ajustar
            unoptimized
            className="rounded-lg shadow-md object-cover"
            tabIndex={0}
          />
        </div>
      </div>
    </section>
  )
}
