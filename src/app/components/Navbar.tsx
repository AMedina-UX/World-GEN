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
      <div className="h-[50px] backdrop-blur-md bg-[#1a163b]/50 border border-[#5c64f2]/60 flex gap-8 sm:gap-14 items-center overflow-hidden px-6 py-2.5 rounded-full shadow-[0px_0px_25px_0px_rgba(71,3,166,0.4)] transition-all duration-300 hover:border-[#5c64f2]">

        {/* Logo */}
        <div className="relative h-14 w-14 cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-node-id="3:2634">
          <Image
            alt="GEN Logo"
            className="object-contain"
            src="/assets/2642e5593e09d29294d1d6b3a79b1a34eae311c6.png"
            fill
            sizes="56px"
            priority
          />
        </div>

        {/* Links */}
        <div className="flex gap-6 sm:gap-8 items-center text-sm font-normal text-white/80" data-node-id="3:2635">
          <button
            onClick={() => handleScroll('marcas')}
            className="hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            data-node-id="3:2638"
          >
            Empresas
          </button>

          <button
            onClick={() => handleScroll('premios')}
            className="hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            data-node-id="3:2675"
          >
            Premios
          </button>

          <button
            onClick={() => handleScroll('alianzas')}
            className="hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            data-node-id="3:2666"
          >
            Alianzas
          </button>
        </div>
      </div>
    </nav>
  );
}
