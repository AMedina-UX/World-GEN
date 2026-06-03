'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Award {
  year: string;
  name: string;
  image: string;
}

const awards: Award[] = [
  {
    year: '',
    name: 'ISO 37001',
    image: '/assets/ISO37001.png',
  },
  {
    year: '',
    name: 'ISO 9001',
    image: '/assets/ISO9001.png',
  },
  {
    year: '',
    name: 'LAQUI',
    image: '/assets/LAQI.png',
  },
  {
    year: '',
    name: 'ABE',
    image: '/assets/ABE.png',
  },
  {
    year: '',
    name: 'SNI',
    image: '/assets/SNI.png',
  },
  {
    year: '',
    name: 'CEDU',
    image: '/assets/CEDU.png',
  },
  {
    year: '',
    name: 'CCL',
    image: '/assets/CCL.png',
  },
  {
    year: 'Gold Winner: Video/Audio - 2023',
    name: 'MarCom Awards',
    image: '/assets/a68030b871487d0c67649ae032dab03caf46102b.png',
  },
  {
    year: 'Platinium Winner - Campaña de marketing en redes sociales - 2024',
    name: 'MarCom Awards',
    image: '/assets/a68030b871487d0c67649ae032dab03caf46102b.png',
  },
  {
    year: 'Servicio Comunitario y Responsabilidad Social Corporativa - 2024',
    name: 'Communitas Awards',
    image: '/assets/384afdd52e6f542e56a00c19d69067afdc6609ff.png',
  },
  {
    year: 'Gold Winner - Emprendimiento en Educación - 2024',
    name: 'Titan Business Awards',
    image: '/assets/fda3dd8e0c284a52d0e51296006f539d4a46437c.png',
  },
  {
    year: 'Silver Winner - Emprendimiento en Marketing Multinivel - 2024',
    name: 'Titan Business Awards',
    image: '/assets/db3798b2b8c159c0ab26a728f7cd2e79aee2a680.png',
  },
  {
    year: 'Gold Winner: Contenido de campaña social - 2024',
    name: 'Hermes Creative Awards',
    image: '/assets/9d0d4c2326885b288ce9beaf779d4ca9702304b4.png',
  },

  {
    year: 'Educación Virtual - 2023',
    name: 'Empresa Peruana del Año',
    image: '/assets/eea66bd9cec3f343f59f5cdd5046010ceb8e5fe5.png',
  },

  {
    year: 'Silver Winner:  Diseño Web - 2024',
    name: 'New York Digital Awards',
    image: '/assets/00a8a37c08dafc76cb1e42046b74b80bd9ea6f28.png',
  },
  {
    year: 'Silver Winner: Folleto - 2024',
    name: 'New York Digital Awards',
    image: '/assets/00a8a37c08dafc76cb1e42046b74b80bd9ea6f28.png',
  },
  {
    year: 'Silver Winner: Educación - 2024',
    name: 'New York Digital Awards',
    image: '/assets/00a8a37c08dafc76cb1e42046b74b80bd9ea6f28.png',
  },
  {
    year: 'Servicio Comunitario y Responsabilidad Social Corporativa - 2025',
    name: 'Communitas Awards',
    image: '/assets/384afdd52e6f542e56a00c19d69067afdc6609ff.png',
  },
  {
    year: 'Logro en la Excelencia del Servicio al Cliente - 2025',
    name: 'Globee Awards',
    image: '/assets/gloobee.png',
  },
  {
    year: '',
    name: 'Noble Business Awards',
    image: '/assets/1ae28c11dac8d169cdafe59af87ef30f3971b78d.png',
  },
  {
    year: 'Silver Winner: Liderazgo en Educación - 2025',
    name: 'Noble Business Awards',
    image: '/assets/1ae28c11dac8d169cdafe59af87ef30f3971b78d.png',
  },
  {
    year: 'Silver Winner: Marketing Multinivel - 2025',
    name: 'Noble Business Awards',
    image: '/assets/1ae28c11dac8d169cdafe59af87ef30f3971b78d.png',
  },

  {
    year: 'Gold Winner: Video Marketing Multinivel - 2025',
    name: 'NYX Awards',
    image: '/assets/nyx.png',
  },
  {
    year: 'Gold Winner: Trasmisión en vivo MINED Connect - 2025',
    name: 'Titan Business Awards',
    image: '/assets/fda3dd8e0c284a52d0e51296006f539d4a46437c.png',
  },
  {
    year: 'Gold Winner: Logro en Crecimiento - 2025',
    name: 'Titan Business Awards',
    image: '/assets/fda3dd8e0c284a52d0e51296006f539d4a46437c.png',
  },
  {
    year: 'Platinium Winner: Evento Virtual Bootcamp - 2025',
    name: 'Viddy Awards',
    image: '/assets/Viddy.png',
  },
  {
    year: 'Calidad Educativa - 2025',
    name: 'Premio Quality Perú del Año 2025',
    image: '/assets/LAQI2.png',
  },

  {
    year: 'Educación Virtual - 2025',
    name: 'Empresa Peruana del Año',
    image: '/assets/eea66bd9cec3f343f59f5cdd5046010ceb8e5fe5.png',
  },

  {
    year: 'Calidad e Innovación Educativa - 2025',
    name: 'Business Management Awards',
    image: '/assets/business.png',
  },

  {
    year: 'Excelencia empresarial - 2025',
    name: 'THE BIZZ',
    image: '/assets/BIZZ.png',
  },

  {
    year: 'Excelencia, constancia y visión de crecimiento - 2025',
    name: 'Reconocimiento SNI ',
    image: '/assets/calidad.png',
  },

  {
    year: 'Platinium Winner: Evento Ultra - World GEN - 2025',
    name: 'LIT Awards',
    image: '/assets/LIT.png',
  },

  {
    year: 'Gold Winner - Presidente del año - 2026',
    name: 'Titan Business Awards',
    image: '/assets/fda3dd8e0c284a52d0e51296006f539d4a46437c.png',
  },
  {
    year: 'Silver Winner - Empresa del año  - 2026',
    name: 'Titan Business Awards',
    image: '/assets/db3798b2b8c159c0ab26a728f7cd2e79aee2a680.png',
  },


];

export default function AwardsCarousel() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const checkScrollLimits = () => {
    const slider = sliderRef.current;
    if (slider) {
      setCanScrollLeft(slider.scrollLeft > 5);
      setCanScrollRight(
        slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 10
      );
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollLimits);
      // Wait for image loads/rendering to run limit checks
      const timer = setTimeout(checkScrollLimits, 500);
      window.addEventListener('resize', checkScrollLimits);

      return () => {
        slider.removeEventListener('scroll', checkScrollLimits);
        window.removeEventListener('resize', checkScrollLimits);
        clearTimeout(timer);
      };
    }
  }, []);

  // Smooth scroll logic like Netflix/Prime Video
  const scroll = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (slider) {
      const gap = 24; // gap-6
      const scrollAmount = slider.clientWidth + gap;

      slider.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-play handler
  useEffect(() => {
    if (isHovered) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      const slider = sliderRef.current;
      if (slider) {
        // If we are at the end, scroll back to 0
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 20) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const gap = 24; // gap-6
          slider.scrollBy({ left: slider.clientWidth + gap, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isHovered]);

  return (
    <section
      id="premios"
      className="w-full max-w-[1168px] mx-auto px-4 py-10 scroll-mt-28 relative"
      data-node-id="3:2171"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-8" data-node-id="3:2168">
        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#d2d5fc] to-[#a0a5fa] font-sans"
          data-node-id="3:2169"
        >
          Certificaciones y Premios
        </h2>

        {/* Top-right Navigation Controls */}
        <div className="flex gap-3 relative z-20">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full bg-[#1a163b]/80 border border-[#5c64f2]/40 flex items-center justify-center text-white/80 transition-all duration-200 ${canScrollLeft
              ? 'hover:text-white hover:scale-105 active:scale-95 hover:bg-[#1a163b] hover:border-[#5c64f2]/80 cursor-pointer shadow-md'
              : 'opacity-30 cursor-not-allowed'
              }`}
            aria-label="Desplazar a la izquierda"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full bg-[#1a163b]/80 border border-[#5c64f2]/40 flex items-center justify-center text-white/80 transition-all duration-200 ${canScrollRight
              ? 'hover:text-white hover:scale-105 active:scale-95 hover:bg-[#1a163b] hover:border-[#5c64f2]/80 cursor-pointer shadow-md'
              : 'opacity-30 cursor-not-allowed'
              }`}
            aria-label="Desplazar a la derecha"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider viewport */}
      <div className="relative w-full overflow-hidden" data-node-id="3:2173">
        {/* Soft edge blur overlays to look extra premium */}


        {/* Scrolling rail - no scrollbar is shown */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-scroll no-scrollbar scroll-smooth w-full py-4 px-0.5"
        >
          {awards.map((award, index) => (
            <div
              key={`${award.name}-${index}`}
              className="flex-none w-[calc((100%-24px)/2)] sm:w-[calc((100%-48px)/3)] md:w-[calc((100%-72px)/4)] lg:w-[calc((100%-96px)/5)] h-[320px] rounded-2xl border border-[#2a30b3]/40 bg-[#070524]/60 overflow-hidden relative flex flex-col justify-end items-center px-4 py-4 shadow-[0px_8px_20px_-10px_rgba(42,48,179,0.3)] transition-all duration-300 hover:border-[#5c64f2]/80 hover:shadow-[0px_10px_25px_-5px_rgba(92,100,242,0.4)] hover:scale-[1.03]"
              data-node-id="3:1184"
            >
              {/* Radial glow background */}
              <div className="absolute top-0 inset-x-0 h-[180px] bg-[radial-gradient(circle_at_50%_35%,rgba(95,76,191,0.5),transparent_70%)] opacity-70 pointer-events-none z-0" />

              {/* Award Trophy Image */}
              <div className="relative w-[180px] h-[180px] mb-auto z-10 transition-transform duration-500 hover:scale-105">
                <Image
                  alt={award.name}
                  className="object-contain"
                  src={award.image}
                  fill
                  sizes="(max-width: 640px) 130px, (max-width: 1024px) 150px, 214px"
                  priority={index < 5}
                />
              </div>

              {/* Text content */}
              <div className="w-full flex flex-col items-center gap-1.5 z-10 mt-4 text-center">
                <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2  px-1 font-sans">
                  {award.name}
                </h3>
                <span className="text-xs font-semibold text-[#a0a5fa] h-8 flex justify-center items-center w-full">
                  {award.year}
                </span>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
