import Image from 'next/image';

interface CorporativoCard {
  id: string;
  name: string;
  image: string;
  link: string;
  imageWidth: string;
  imageHeight: string;
  imageOffsetLeft: string;
  imageOffsetTop: string;
}

const cards: CorporativoCard[] = [
  {
    id: '45:724',
    name: 'Nuestra Visión',
    image: '/assets/00a8a37c08dafc76cb1e42046b74b80bd9ea6f28.png',
    link: 'https://mined.world/',
    imageWidth: 'w-[130%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: '-left-[15%]',
    imageOffsetTop: 'top-0',
  },
  {
    id: '45:726',
    name: 'Gobierno Corporativo',
    image: '/assets/384afdd52e6f542e56a00c19d69067afdc6609ff.png',
    link: 'https://mined.world/',
    imageWidth: 'w-[130%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: '-left-[15%]',
    imageOffsetTop: 'top-0',
  },
  {
    id: '45:728',
    name: 'Sostenibilidad',
    image: '/assets/4e31d3aa5ed1e5dfa9ceb1cf96ba2c356f61f135.png',
    link: 'https://mined.world/',
    imageWidth: 'w-[130%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: '-left-[15%]',
    imageOffsetTop: 'top-0',
  },
];

export default function Corporativo() {
  return (
    <section
      id="corporativo"
      className="w-full max-w-6xl mx-auto px-4 pt-4 pb-10 scroll-mt-28 flex flex-col items-center gap-2"
    >
      {/* Title */}
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#d2d5fc] to-[#a0a5fa] font-sans text-center"
      >
        Corporativo
      </h2>

      {/* 3 Cards Container Grid */}
      <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center w-full max-w-4xl mt-8">
        {cards.map((card) => (
          <a
            key={card.id}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-[283px] h-[283px] rounded-2xl overflow-hidden border border-[#5c64f2]/30 bg-black/40 shadow-[0_4px_20px_rgba(71,3,166,0.15)] transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.03] hover:border-[#5c64f2]/80 hover:shadow-[0_0_35px_5px_rgba(92,100,242,0.35)]"
            data-node-id={card.id}
          >
            {/* Card inner border overlay */}
            <div className="absolute inset-0 border border-white/5 group-hover:border-white/10 rounded-2xl pointer-events-none z-20 transition-all duration-500" />

            {/* Radial glow overlay on hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(92,100,242,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

            {/* Figma-matched positioning box */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <div className={`absolute ${card.imageWidth} ${card.imageHeight} ${card.imageOffsetLeft} ${card.imageOffsetTop} transition-transform duration-700 ease-out group-hover:scale-105`}>
                <Image
                  alt={card.name}
                  src={card.image}
                  className="object-cover pointer-events-none"
                  fill
                  sizes="380px"
                />
              </div>
            </div>

            {/* Bottom text label */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-8 pb-4 px-5 z-20">
              <p className="font-sans font-semibold text-xs tracking-wider text-white/90 uppercase drop-shadow-md">
                {card.name}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
