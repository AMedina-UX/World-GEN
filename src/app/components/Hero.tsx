'use client';

import Image from 'next/image';

export default function Hero() {
  const scrollToBrands = () => {
    const el = document.getElementById('marcas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen h-screen w-full overflow-hidden px-4 select-none"
      data-node-id="21:1393"
    >

      {/* Huge background glow isotipo "X" (larger in the new design, fully scalable) */}
      <div
        className="absolute w-[min(598px,70vw)] aspect-[598/633] opacity-[0.12] pointer-events-none blur-[1px] animate-pulse"
        style={{ animationDuration: '4s' }}
        data-node-id="1:1074"
      >
        <Image
          alt="GEN Background Isotipo"
          className="object-contain"
          src="/assets/fdc4339d52c05bf9c95ac2ed13b398ff1090cc2a.png"
          fill
          sizes="(max-width: 768px) 70vw, 598px"
          priority
        />
      </div>

      {/* Main Slogan Container */}
      <div className="relative z-10 flex flex-col items-center gap-[4%] w-full max-w-3xl text-center px-4" data-node-id="3:254">

        {/* World GEN Typo SVG Logo (Updated version, scales dynamically) */}
        <div className="relative w-[min(598px,85vw)] aspect-[598/90]" data-node-id="3:257">
          <Image
            alt="WORLD GEN Logo"
            className="object-contain"
            src="/assets/6f47a5b2ff68649fda120d1db2802308a9822d67.svg"
            fill
            sizes="(max-width: 768px) 85vw, 598px"
            priority
          />
        </div>

        {/* Horizontal line divider (Scales dynamically) */}
        <div className="relative w-[min(310px,45vw)] aspect-[310/2] opacity-60 my-2" data-node-id="21:1516">
          <Image
            alt="Divider"
            src="/assets/2a638ff72dd2192bdba9d1c5987fa260a6246bba.svg"
            fill
            sizes="(max-width: 768px) 45vw, 310px"
            className="object-contain"
          />
        </div>

        {/* Subtitle / Slogan description (Fluid typography scaling) */}
        <p
          className="text-[clamp(14px,2vw,24px)] font-medium text-[#d2d5fc] leading-relaxed max-w-3xl mt-1 tracking-wide font-sans px-2"
          data-node-id="3:251"
        >
          EL PRIMER HOLDING DE EMPRESAS DE LA INDUSTRIA EN UN SOLO PLAN DE COMPENSACIÓN
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        onClick={scrollToBrands}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group"
        data-node-id="21:1515"
      >
        <span
          className="text-[clamp(10px,1.2vw,14px)] font-medium tracking-widest text-[#d2d5fc]/85 group-hover:text-white transition-colors duration-300 uppercase text-center"
          data-node-id="21:1514"
        >
          Explora <br />nuestras empresas
        </span>
        <div
          className="relative w-8 h-8 sm:w-10 sm:h-10 animate-bounce-slow"
          data-node-id="21:1513"
        >
          <Image
            alt="Scroll Down"
            src="/assets/f542452e8ff4c6bdaa9e5358fa856e1ffb4a91ac.svg"
            fill
            sizes="(max-width: 640px) 32px, 40px"
            className="object-contain brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
          />
        </div>
      </div>

      {/* Ambient bottom light overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[200px] bg-gradient-radial from-[#5f4cbf]/10 to-transparent blur-[80px] pointer-events-none" />
    </section>
  );
}
