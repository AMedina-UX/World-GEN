'use client';

import { useState } from 'react';
import Image from 'next/image';
import DistributionModal from './DistributionModal';

interface EspaciosCard {
  id: string;
  name: string;
  image: string;
  link?: string;
  disabled?: boolean;
  isModal?: boolean;
  imageWidth: string;
  imageHeight: string;
  imageOffsetLeft: string;
  imageOffsetTop: string;
}

const cards: EspaciosCard[] = [
  {
    id: '45:714',
    name: 'Oficinas Centrales',
    image: '/assets/OFICINAS.png',
    link: 'https://equipogen.com/quienes-somos/#oficinas',
    imageWidth: 'w-[100%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: 'left-0',
    imageOffsetTop: 'top-0',
  },
  {
    id: '45:716',
    name: 'Reserva aquí',
    image: '/assets/RESERVAS.png',
    disabled: true,
    imageWidth: 'w-[100%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: 'left-0',
    imageOffsetTop: 'top-0',
  },
  {
    id: '45:718',
    name: 'Centros de distribución',
    image: '/assets/CENTRO_DE_DISTRIBUCION.png',
    isModal: true,
    imageWidth: 'w-[100%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: 'left-0',
    imageOffsetTop: 'top-0',
  },
];

export default function EspaciosGEN() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="espacios-gen"
      className="w-full max-w-7xl mx-auto px-4 sm:px-10 pt-4 pb-6 scroll-mt-28 flex flex-col items-center gap-2"
    >
      {/* Title */}
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#d2d5fc] to-[#a0a5fa] font-sans text-center"
      >
        Espacios GEN
      </h2>

      {/* 3 Cards Container Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full mt-8">
        {cards.map((card) => {
          const cardInnerContent = (
            <>
              {/* Card inner border overlay */}
              <div className="absolute inset-0 border border-white/5 group-hover:border-white/10 rounded-2xl pointer-events-none z-20 transition-all duration-500" />

              {/* Radial glow overlay on hover */}
              {!card.disabled && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(92,100,242,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              )}

              {/* Figma-matched positioning box */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className={`absolute ${card.imageWidth} ${card.imageHeight} ${card.imageOffsetLeft} ${card.imageOffsetTop} transition-transform duration-700 ease-out ${!card.disabled ? 'group-hover:scale-100' : 'grayscale-[40%]'}`}>
                  <Image
                    alt={card.name}
                    src={card.image}
                    className="object-cover pointer-events-none"
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              </div>


              {/* Locked overlay for disabled card */}
              {card.disabled && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[1.5px] z-30">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/15 text-white/60 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase bg-black/35 border border-white/10 px-2.5 py-1 rounded-full">
                    Próximamente
                  </span>
                </div>
              )}
            </>
          );

          if (card.disabled) {
            return (
              <div
                key={card.id}
                className="relative block w-full aspect-[1/1] rounded-2xl overflow-hidden border border-[#5c64f2]/10 bg-black/20 opacity-60 shadow-[0_4px_20px_rgba(0,0,0,0.2)] cursor-not-allowed"
                data-node-id={card.id}
              >
                {cardInnerContent}
              </div>
            );
          }

          if (card.isModal) {
            return (
              <button
                key={card.id}
                onClick={() => setIsModalOpen(true)}
                type="button"
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
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full aspect-[1/1] rounded-2xl overflow-hidden border border-[#5c64f2]/30 bg-black/40 shadow-[0_4px_20px_rgba(71,3,166,0.15)] transition-all duration-500 ease-out hover:border-[#5c64f2]/80 hover:shadow-[0_0_35px_5px_rgba(92,100,242,0.35)]"
              data-node-id={card.id}
            >
              {cardInnerContent}
            </a>
          );
        })}
      </div>

      <DistributionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
