'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4" data-node-id="3:2603">
      <div
        className={`w-full sm:w-auto max-w-5xl backdrop-blur-md bg-[#1a163b]/70 border border-[#5c64f2]/60 rounded-3xl sm:rounded-full shadow-[0px_0px_25px_0px_rgba(71,3,166,0.4)] transition-all duration-500 hover:border-[#5c64f2]/90 flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3.5 sm:py-2.5 gap-4 overflow-hidden ${isOpen ? 'max-h-[380px] rounded-[2rem]' : 'max-h-[72px] sm:max-h-none'
          }`}
        style={{ transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.4s ease-in-out' }}
      >
        {/* Header Row: Logo and Hamburger Button */}
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
            onClick={() => setIsOpen(!isOpen)}
            className="block sm:hidden p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all focus:outline-none cursor-pointer"
            aria-label="Menú principal"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              // Close Icon (X)
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon (three bars)
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links (Collapsible on Mobile, always visible on Desktop) */}
        <div
          className={`flex flex-col sm:flex-row gap-2 sm:gap-6 md:gap-8 items-center text-xs sm:text-sm font-semibold sm:font-normal text-white/80 w-full sm:w-auto transition-all duration-300 ${isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 sm:opacity-100 sm:translate-y-0 pointer-events-none sm:pointer-events-auto hidden sm:flex'
            }`}
          data-node-id="3:2635"
        >
          <button
            onClick={() => {
              handleScroll('marcas');
              setIsOpen(false);
            }}
            className="w-full sm:w-auto text-left sm:text-center px-4 py-2.5 sm:px-0 sm:py-0 rounded-xl hover:bg-white/5 sm:hover:bg-transparent hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
            data-node-id="3:2638"
          >
            Empresas
          </button>

          <button
            onClick={() => {
              handleScroll('ecosistema');
              setIsOpen(false);
            }}
            className="w-full sm:w-auto text-left sm:text-center px-4 py-2.5 sm:px-0 sm:py-0 rounded-xl hover:bg-white/5 sm:hover:bg-transparent hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
            data-node-id="3:2675"
          >
            Ecosistema
          </button>

          <button
            onClick={() => {
              handleScroll('comunidad');
              setIsOpen(false);
            }}
            className="w-full sm:w-auto text-left sm:text-center px-4 py-2.5 sm:px-0 sm:py-0 rounded-xl hover:bg-white/5 sm:hover:bg-transparent hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Comunidad
          </button>

          <button
            onClick={() => {
              handleScroll('espacios-gen');
              setIsOpen(false);
            }}
            className="w-full sm:w-auto text-left sm:text-center px-4 py-2.5 sm:px-0 sm:py-0 rounded-xl hover:bg-white/5 sm:hover:bg-transparent hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Espacios GEN
          </button>

          <button
            onClick={() => {
              handleScroll('corporativo');
              setIsOpen(false);
            }}
            className="w-full sm:w-auto text-left sm:text-center px-4 py-2.5 sm:px-0 sm:py-0 rounded-xl hover:bg-white/5 sm:hover:bg-transparent hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Corporativo
          </button>
        </div>

        {/* Spacer to center the navigation links in desktop layout */}
        <div className="hidden sm:block w-10 sm:w-12" aria-hidden="true" />
      </div>
    </nav>
  );
}
