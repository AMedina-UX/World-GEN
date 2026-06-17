'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4" data-node-id="3:2603">
        <div
          className="w-full sm:w-auto max-w-5xl backdrop-blur-md bg-[#1a163b]/70 border border-[#5c64f2]/60 rounded-full shadow-[0px_0px_25px_0px_rgba(71,3,166,0.4)] transition-all duration-500 hover:border-[#5c64f2]/90 flex flex-row items-center justify-between sm:justify-start px-6 py-1 gap-4"
        >
          {/* Logo and Mobile Menu Trigger container */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            {/* Logo */}
            <div
              className="relative h-10 w-10 sm:h-12 sm:w-12 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsOpen(false);
              }}
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

            {/* Hamburger Menu Toggle (Mobile Only) */}
            <button
              onClick={() => setIsOpen(true)}
              className="block sm:hidden p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all focus:outline-none cursor-pointer"
              aria-label="Abrir menú"
              aria-expanded={isOpen}
            >
              {/* Hamburger Icon (three bars) */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Links (Only visible on Desktop) */}
          <div
            className="hidden sm:flex items-center gap-6 md:gap-8 text-xs sm:text-sm font-normal text-white/80 ml-6"
            data-node-id="3:2635"
          >
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

          {/* Spacer to center/balance layout on desktop */}
          <div className="hidden sm:block w-2" aria-hidden="true" />
        </div>
      </nav>

      {/* Mobile Menu Drawer Modal */}
      {/* Dark overlay backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 sm:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-over Drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-[#100d28]/95 border-l border-[#5c64f2]/40 backdrop-blur-xl z-[101] p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out sm:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col gap-10">
          {/* Header (Logo + Close btn) */}
          <div className="flex items-center justify-between">
            <div
              className="relative h-10 w-10 cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsOpen(false);
              }}
            >
              <Image
                alt="GEN Logo"
                className="object-contain"
                src="/assets/2642e5593e09d29294d1d6b3a79b1a34eae311c6.png"
                fill
                sizes="40px"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all focus:outline-none cursor-pointer"
              aria-label="Cerrar menú"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links with large text */}
          <div className="flex flex-col gap-6">
            <button
              onClick={() => {
                handleScroll('marcas');
                setIsOpen(false);
              }}
              className="text-left text-2xl font-semibold text-[#d2d5fc]/90 hover:text-white transition-colors py-3 border-b border-[#5c64f2]/20 active:translate-x-1 duration-200 cursor-pointer"
            >
              Empresas
            </button>
            <button
              onClick={() => {
                handleScroll('ecosistema');
                setIsOpen(false);
              }}
              className="text-left text-2xl font-semibold text-[#d2d5fc]/90 hover:text-white transition-colors py-3 border-b border-[#5c64f2]/20 active:translate-x-1 duration-200 cursor-pointer"
            >
              Ecosistema
            </button>
            <button
              onClick={() => {
                handleScroll('comunidad');
                setIsOpen(false);
              }}
              className="text-left text-2xl font-semibold text-[#d2d5fc]/90 hover:text-white transition-colors py-3 border-b border-[#5c64f2]/20 active:translate-x-1 duration-200 cursor-pointer"
            >
              Comunidad
            </button>
            <button
              onClick={() => {
                handleScroll('espacios-gen');
                setIsOpen(false);
              }}
              className="text-left text-2xl font-semibold text-[#d2d5fc]/90 hover:text-white transition-colors py-3 border-b border-[#5c64f2]/20 active:translate-x-1 duration-200 cursor-pointer"
            >
              Espacios GEN
            </button>
            <button
              onClick={() => {
                handleScroll('corporativo');
                setIsOpen(false);
              }}
              className="text-left text-2xl font-semibold text-[#d2d5fc]/90 hover:text-white transition-colors py-3 border-b border-[#5c64f2]/20 active:translate-x-1 duration-200 cursor-pointer"
            >
              Corporativo
            </button>
          </div>
        </div>

        {/* Footer branding */}
        <div className="text-[10px] text-[#d2d5fc]/30 uppercase tracking-widest text-center mt-auto">
          © {new Date().getFullYear()} GEN World
        </div>
      </div>
    </>
  );
}
