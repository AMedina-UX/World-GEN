'use client';

import Image from 'next/image';

export default function Navbar() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4" data-node-id="3:2603">
      <div className="min-h-[50px] backdrop-blur-md bg-[#1a163b]/60 border border-[#5c64f2]/60 flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 items-center px-6 py-3 sm:py-2 rounded-2xl sm:rounded-full shadow-[0px_0px_25px_0px_rgba(71,3,166,0.4)] transition-all duration-300 hover:border-[#5c64f2]">

        {/* Logo */}
        <div 
          className="relative h-10 w-10 sm:h-12 sm:w-12 cursor-pointer hover:scale-105 transition-transform duration-200" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          data-node-id="3:2634"
        >
          <Image
            alt="GEN Logo"
            className="object-contain"
            src="/assets/2642e5593e09d29294d1d6b3a79b1a34eae311c6.png"
            fill
            sizes="48px"
            priority
          />
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-6 md:gap-x-8 items-center text-xs sm:text-sm font-normal text-white/80" data-node-id="3:2635">
          <button
            onClick={() => handleScroll('marcas')}
            className="hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
            data-node-id="3:2638"
          >
            Empresas
          </button>

          <button
            onClick={() => handleScroll('ecosistema')}
            className="hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
            data-node-id="3:2675"
          >
            Ecosistema
          </button>

          <button
            onClick={() => handleScroll('comunidad')}
            className="hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Comunidad
          </button>

          <button
            onClick={() => handleScroll('espacios-gen')}
            className="hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Espacios GEN
          </button>

          <button
            onClick={() => handleScroll('corporativo')}
            className="hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Corporativo
          </button>
        </div>
      </div>
    </nav>
  );
}
