import Image from 'next/image';

export default function Partners() {
  return (
    <section id="alianzas" className="w-full max-w-6xl mx-auto px-4 py-10 scroll-mt-28" data-node-id="3:2515">
      <div className="flex flex-col gap-8 items-center">

        {/* Title */}
        <div className="text-center flex flex-col gap-2" data-node-id="3:2516">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#d2d5fc] to-[#a0a5fa] font-sans"
            data-node-id="3:2518"
          >
            Alianzas
          </h2>
          <p
            className="text-base text-[#a0a5fa] font-normal"
            data-node-id="3:2519"
          >
            Ellos confían en nosotros.
          </p>
        </div>

        {/* Logo Container Panel */}
        <div
          className="relative w-full rounded-3xl border border-[#5c64f2]/40 bg-gradient-to-b from-[#5f4cbf]/10 to-transparent py-10 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-14 overflow-hidden shadow-[0px_4px_30px_rgba(71,3,166,0.15)]"
          data-node-id="3:2524"
        >
          {/* Background Glows positioned behind the 3 logos */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Glow 1 (Left) */}
            <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[240px] h-[200px] bg-[radial-gradient(circle,rgba(95,76,191,0.25)_0%,transparent_70%)] blur-[40px]" />
            {/* Glow 2 (Center) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[200px] bg-[radial-gradient(circle,rgba(95,76,191,0.25)_0%,transparent_70%)] blur-[40px]" />
            {/* Glow 3 (Right) */}
            <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[240px] h-[200px] bg-[radial-gradient(circle,rgba(95,76,191,0.25)_0%,transparent_70%)] blur-[40px]" />
          </div>

          {/* Partner Elements */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 w-full" data-node-id="3:2528">

            {/* Partner 1: CCL Asociado (Assembled from SVGs) */}
            <div className="flex items-center justify-center w-[280px] h-[80px] relative hover:scale-105 transition-transform duration-300" data-node-id="3:2529">
              <div className="relative w-full h-[80px]">
                {/* Background Vector / Logo Text */}
                <Image
                  alt="CCL Asociado logo"
                  className="object-contain"
                  src="/assets/comercio.svg"
                  fill
                  sizes="280px"
                />
              </div>
            </div>

            {/* Separator 1 */}
            <div className="hidden md:flex h-16 w-[1px] relative opacity-40">
              <Image
                alt="Separator"
                src="/assets/eb32935c0fb77ab25a32b3ccf8b8a0c2e2defcca.svg"
                fill
                className="object-contain"
              />
            </div>
            <div className="md:hidden w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Partner 2: CEDU */}
            <div className="flex items-center justify-center w-[150px] h-[130px] relative hover:scale-105 transition-transform duration-300" data-node-id="3:2539">
              <Image
                alt="Socios de CEDU"
                className="object-contain"
                src="/assets/d48aaec68afab170206732a54b192297536ee5a2.png"
                width={130}
                height={130}
              />
            </div>

            {/* Separator 2 */}
            <div className="hidden md:flex h-16 w-[1px] relative opacity-40">
              <Image
                alt="Separator"
                src="/assets/eb32935c0fb77ab25a32b3ccf8b8a0c2e2defcca.svg"
                fill
                className="object-contain"
              />
            </div>
            <div className="md:hidden w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Partner 3: SNI */}
            <div className="flex items-center justify-center w-[150px] h-[130px] relative hover:scale-105 transition-transform duration-300" data-node-id="3:2541">
              <Image
                alt="Socio SNI"
                className="object-contain"
                src="/assets/4e31d3aa5ed1e5dfa9ceb1cf96ba2c356f61f135.png"
                width={130}
                height={130}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
