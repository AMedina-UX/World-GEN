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
    image: '/assets/ed1de8b212589b1b246e80c0fa6d758657bb1e68.png',
    link: 'https://equipogen.com/quienes-somos/#oficinas',
    imageWidth: 'w-[130%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: '-left-[15%]',
    imageOffsetTop: 'top-0',
  },
  {
    id: '45:716',
    name: 'Reserva aquí',
    image: '/assets/ef995749ed317516a4743f08762757f1b9a5c0bc.png',
    disabled: true,
    imageWidth: 'w-[130%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: '-left-[15%]',
    imageOffsetTop: 'top-0',
  },
  {
    id: '45:718',
    name: 'Centros de distribución',
    image: '/assets/06dcc457b89b569f32107551c3b5aff5bd68dc82.png',
    isModal: true,
    imageWidth: 'w-[130%]',
    imageHeight: 'h-[100%]',
    imageOffsetLeft: '-left-[15%]',
    imageOffsetTop: 'top-0',
  },
];

export default function EspaciosGEN() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="espacios-gen"
      className="w-full max-w-6xl mx-auto px-4 pt-4 pb-6 scroll-mt-28 flex flex-col items-center gap-2"
    >
      {/* Title */}
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#d2d5fc] to-[#a0a5fa] font-sans text-center"
      >
        Espacios GEN
      </h2>

      {/* 3 Cards Container Grid */}
      <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center w-full max-w-4xl mt-8">
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
                <div className={`absolute ${card.imageWidth} ${card.imageHeight} ${card.imageOffsetLeft} ${card.imageOffsetTop} transition-transform duration-700 ease-out ${!card.disabled ? 'group-hover:scale-105' : 'grayscale-[40%]'}`}>
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
                className="relative block w-[283px] h-[283px] rounded-2xl overflow-hidden border border-[#5c64f2]/10 bg-black/20 opacity-60 shadow-[0_4px_20px_rgba(0,0,0,0.2)] cursor-not-allowed"
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
              href={card.link}
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

      <DistributionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
