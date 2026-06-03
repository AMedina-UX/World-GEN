import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-44 pb-20 px-4 w-full overflow-hidden" data-node-id="1:834">

      {/* Huge background glow isotipo "X" */}
      <div
        className="absolute -top-10 sm:top-10 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] opacity-[0.15] pointer-events-none select-none blur-[2px] animate-pulse"
        style={{ animationDuration: '4s' }}
        data-node-id="1:1074"
      >
        <Image
          alt="GEN Background Isotipo"
          className="object-contain"
          src="/assets/fdc4339d52c05bf9c95ac2ed13b398ff1090cc2a.png"
          fill
          priority
        />
      </div>

      {/* Main Slogan Container */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl text-center" data-node-id="3:254">

        {/* World GEN Typo SVG Logo */}
        <div className="relative w-[320px] h-[48px] sm:w-[500px] sm:h-[80px]" data-node-id="3:257">
          <Image
            alt="WORLD GEN Logo"
            className="object-contain"
            src="/assets/a9a1dab005b82b1eac4b974d22b3182f13811a0b.svg"
            fill
            priority
          />
        </div>

        {/* Subtitle / Slogan description */}
        <p
          className="text-base sm:text-2xl font-light text-[#d2d5fc] leading-relaxed max-w-xl mt-2 tracking-wide font-sans"
          data-node-id="3:251"
        >
          El primer consorcio de la industria, el nuevo mundo para la nueva generación.
        </p>
      </div>

      {/* Subtle bottom light overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[150px] bg-gradient-radial from-[#5f4cbf]/10 to-transparent blur-[60px] pointer-events-none" />
    </section>
  );
}
