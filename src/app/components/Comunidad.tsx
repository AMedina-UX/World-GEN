'use client';

import { useState } from 'react';
import Image from 'next/image';
import VideoModal from './VideoModal';

interface ComunidadCard {
  id: string;
  name: string;
  image: string;
  link?: string;
  videoUrl?: string;
  imageWidth: string;
  imageHeight: string;
  imageOffsetLeft: string;
  imageOffsetTop: string;
}

const cards: ComunidadCard[] = [
  {
    id: '45:684',
    name: 'Lanzamiento World GEN',
    image: '/assets/1ae28c11dac8d169cdafe59af87ef30f3971b78d.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    imageWidth: 'w-[130%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: '-left-[15%]',
    imageOffsetTop: 'top-0',
  },
  {
    id: '45:686',
    name: 'Experiencia de Liderazgo',
    image: '/assets/6b1c53597a7f6437d49f0d66f86059064c1d6251.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    imageWidth: 'w-[130%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: '-left-[15%]',
    imageOffsetTop: 'top-0',
  },
  {
    id: '45:688',
    name: 'Conoce a nuestros Embajadores',
    image: '/assets/e867af03550cdce99d07c9976f4c8114a77815ea.png',
    link: 'https://mined.world/reconocimientos/#premios',
    imageWidth: 'w-[130%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: '-left-[15%]',
    imageOffsetTop: 'top-0',
  },
];

export default function Comunidad() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  return (
    <section
      id="comunidad"
      className="w-full max-w-6xl mx-auto px-4 pt-4 pb-6 scroll-mt-28 flex flex-col items-center gap-2"
    >
      {/* Title */}
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#d2d5fc] to-[#a0a5fa] font-sans text-center"
      >
        Comunidad de Embajadores
      </h2>

      {/* 3 Cards Container Grid */}
      <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center w-full max-w-4xl mt-8">
        {cards.map((card) => {
          const isVideo = !!card.videoUrl;

          const cardInnerContent = (
            <>
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

              {/* Premium Play Icon overlay for video items */}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/10 group-hover:bg-black/25 transition-all duration-300">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#5c64f2]/75 border border-white/20 text-white shadow-[0_0_20px_rgba(92,100,242,0.5)] group-hover:scale-110 group-hover:bg-[#5c64f2] transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 ml-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </>
          );

          if (isVideo) {
            return (
              <button
                key={card.id}
                onClick={() => setVideoUrl(card.videoUrl!)}
                className="group relative block w-[283px] h-[283px] rounded-2xl overflow-hidden border border-[#5c64f2]/30 bg-black/40 shadow-[0_4px_20px_rgba(71,3,166,0.15)] transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.03] hover:border-[#5c64f2]/80 hover:shadow-[0_0_35px_5px_rgba(92,100,242,0.35)] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#5c64f2]/60"
                data-node-id={card.id}
              >
                {cardInnerContent}
              </button>
            );
          }

          return (
            <a
              key={card.id}
              href={card.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-[283px] h-[283px] rounded-2xl overflow-hidden border border-[#5c64f2]/30 bg-black/40 shadow-[0_4px_20px_rgba(71,3,166,0.15)] transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.03] hover:border-[#5c64f2]/80 hover:shadow-[0_0_35px_5px_rgba(92,100,242,0.35)]"
              data-node-id={card.id}
            >
              {cardInnerContent}
            </a>
          );
        })}
      </div>

      <VideoModal
        isOpen={videoUrl !== null}
        onClose={() => setVideoUrl(null)}
        videoUrl={videoUrl || ''}
      />
    </section>
  );
}
