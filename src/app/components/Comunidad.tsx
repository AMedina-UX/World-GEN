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
  videoSources?: {
    '360p'?: string;
    '720p'?: string;
    '1080p'?: string;
  };
  imageWidth: string;
  imageHeight: string;
  imageOffsetLeft: string;
  imageOffsetTop: string;
}

const cards: ComunidadCard[] = [
  {
    id: '45:684',
    name: 'Bonos viajes',
    image: '/assets/BONOS_VIAJES.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    imageWidth: 'w-[100%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: 'left-0',
    imageOffsetTop: 'top-0',
  },
  {
    id: '45:686',
    name: 'Bonos Autos',
    image: '/assets/BONOS_AUTOS.png',
    videoUrl: 'https://media.minedacademy.com/media/videos/videos-marketing/bonoauto-worldgen-ultra25/720p.mp4',
    videoSources: {
      '360p': 'https://media.minedacademy.com/media/videos/videos-marketing/bonoauto-worldgen-ultra25/360p.mp4',
      '720p': 'https://media.minedacademy.com/media/videos/videos-marketing/bonoauto-worldgen-ultra25/720p.mp4',
      '1080p': 'https://media.minedacademy.com/media/videos/videos-marketing/bonoauto-worldgen-ultra25/1080p.mp4',
    },
    imageWidth: 'w-[100%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: 'left-0',
    imageOffsetTop: 'top-0',
  },
  {
    id: '45:688',
    name: 'Salón de la conquista',
    image: '/assets/CONQUISTA.png',
    link: 'https://mined.world/reconocimientos/#premios',
    imageWidth: 'w-[100%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: 'left-0',
    imageOffsetTop: 'top-0',
  },
];

export default function Comunidad() {
  const [activeVideo, setActiveVideo] = useState<{ url: string; sources?: { '360p'?: string; '720p'?: string; '1080p'?: string } } | null>(null);

  return (
    <section
      id="comunidad"
      className="w-full max-w-7xl mx-auto px-4 sm:px-10 pt-4 pb-6 scroll-mt-28 flex flex-col items-center gap-2"
    >
      {/* Title */}
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#d2d5fc] to-[#a0a5fa] font-sans text-center"
      >
        Comunidad de Embajadores
      </h2>

      {/* 3 Cards Container Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full mt-8">
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
                <div className={`absolute ${card.imageWidth} ${card.imageHeight} ${card.imageOffsetLeft} ${card.imageOffsetTop} transition-transform duration-700 ease-out group-hover:scale-100`}>
                  <Image
                    alt={card.name}
                    src={card.image}
                    className="object-cover pointer-events-none"
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
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
                onClick={() => setActiveVideo({ url: card.videoUrl!, sources: card.videoSources })}
                className="group relative block w-full aspect-[1/1] rounded-2xl overflow-hidden border border-[#5c64f2]/30 bg-black/40 shadow-[0_4px_20px_rgba(71,3,166,0.15)] transition-all duration-500 ease-out hover:border-[#5c64f2]/80 hover:shadow-[0_0_35px_5px_rgba(92,100,242,0.35)] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#5c64f2]/60"
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
              className="group relative block w-full aspect-[1/1] rounded-2xl overflow-hidden border border-[#5c64f2]/30 bg-black/40 shadow-[0_4px_20px_rgba(71,3,166,0.15)] transition-all duration-500 ease-out  hover:border-[#5c64f2]/80 hover:shadow-[0_0_35px_5px_rgba(92,100,242,0.35)]"
              data-node-id={card.id}
            >
              {cardInnerContent}
            </a>
          );
        })}
      </div>

      <VideoModal
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.url || ''}
        videoSources={activeVideo?.sources}
      />
    </section>
  );
}
