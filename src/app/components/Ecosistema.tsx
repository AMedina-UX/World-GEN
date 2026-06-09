import Image from 'next/image';

interface EcosistemaCard {
  id: string;
  name: string;
  image: string;
  link: string;
  imageWidth: string;
  imageHeight: string;
  imageOffsetLeft: string;
  imageOffsetTop: string;
}

const cards: EcosistemaCard[] = [
  {
    id: '23:733',
    name: 'PREMIOS',
    image: '/assets/befb3e7b0c03e01e97ecb1bc106448987710dece.png',
    link: 'https://mined.world/reconocimientos/#premios',
    imageWidth: 'w-[130%] sm:w-[130%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: '-left-[15%]',
    imageOffsetTop: 'top-0',
  },
  {
    id: '23:734',
    name: 'CERTIFICACIONES Y ALIANZAS',
    image: '/assets/31eecd1ac847f83137e119da89febe00a5e9724b.png',
    link: 'https://mined.world/reconocimientos/#alizanzas',
    imageWidth: 'w-[135%]',
    imageHeight: 'h-[103%]',
    imageOffsetLeft: '-left-[18%]',
    imageOffsetTop: 'top-0',
  },
  {
    id: '23:736',
    name: 'PRENSA',
    image: '/assets/28aa84008829500de8124363b087227b1bc77387.png',
    link: 'https://mined.world/reconocimientos/#prensa',
    imageWidth: 'w-[136%]',
    imageHeight: 'h-[106%]',
    imageOffsetLeft: '-left-[18%]',
    imageOffsetTop: '-top-[3%]',
  },
];

export default function Ecosistema() {
  return (
    <section
      id="ecosistema"
      className="w-full max-w-6xl mx-auto px-4 pt-4 pb-20 scroll-mt-28 flex flex-col items-center gap-12"
      data-node-id="23:738"
    >

      {/* Title */}
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#d2d5fc] to-[#a0a5fa] font-sans text-center"
        data-node-id="22:1529"
      >
        Explora nuestro ecosistema
      </h2>

      {/* 3 Cards Container Grid */}
      <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center w-full max-w-4xl">
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
          </a>
        ))}
      </div>
    </section>
  );
}
