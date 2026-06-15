import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      className="relative w-full border-t border-[#5c64f2]/40 bg-white/5 overflow-hidden pt-12 pb-6 px-4 md:px-12 select-none z-10"
      data-node-id="27:871"
    >
      {/* Top Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-6 mb-12" data-node-id="27:872">

        {/* Branding & Logo Left Block */}
        <div className="flex flex-col gap-8 items-start w-full md:w-[220px]" data-node-id="27:990">
          <div className="relative w-[220px] h-[32px]" data-node-id="27:991">
            <Image
              alt="WORLD GEN Logo"
              src="/assets/c4bbba1b6a02655338cb238d10f36d1af4342c0b.svg"
              fill
              sizes="220px"
              className="object-contain"
            />
          </div>

        </div>

        {/* Navigation Menus & Links Right Block */}
        <div className="flex flex-wrap md:flex-nowrap gap-10 sm:gap-14 md:gap-20 items-start w-full md:w-auto" data-node-id="27:998">

          {/* Herramientas Column */}
          <div className="flex flex-col gap-6 items-start min-w-[150px]" data-node-id="27:959">
            <h3 className="font-sans font-semibold text-lg text-white" data-node-id="27:960">
              Herramientas
            </h3>
            <div className="flex flex-col gap-3 font-sans font-medium text-sm text-white/60" data-node-id="27:961">
              <a href="https://equipogen.com/plan-de-accion/mined" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer">Plan de acción MINED</a>
              <a href="https://equipogen.com/plan-de-accion/fwp" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer">Plan de acción FWP</a>
              <a href="https://equipogen.com/top-mindset" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer">Top Mindset</a>
              <a href="https://equipogen.com/marketing-lab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer">Marketing lab</a>
              <a href="https://equipogen.com/eventos" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer">Eventos</a>
              <a href="https://equipogen.com/agenda" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer">Agenda</a>
            </div>
          </div>

          {/* Enlaces de Ayuda Column */}
          <div className="flex flex-col gap-6 items-start min-w-[160px]" data-node-id="27:969">
            <h3 className="font-sans font-semibold text-lg text-white" data-node-id="27:970">
              Enlaces de ayuda
            </h3>
            <div className="flex flex-col gap-3 font-sans font-medium text-sm text-white/60" data-node-id="27:971">
              <a
                href="https://help.equipogen.com/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200 cursor-pointer"
                data-node-id="27:972"
              >
                Preguntas frecuentes
              </a>
              <a href="https://equipogen.com/code-of-ethics" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer">Código de ética</a>
              <a href="https://equipogen.com/privacy-policies" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer">Política de privacidad</a>
              <a href="https://equipogen.com/cookie-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer">Política de cookies</a>
              <a href="https://equipogen.com/brand-manual" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer">Manual de marca</a>
            </div>
          </div>

          {/* Empresas Column (Logos) */}
          <div className="flex flex-col gap-6 items-start min-w-[140px]" data-node-id="27:977">
            <h3 className="font-sans font-semibold text-lg text-white" data-node-id="27:979">
              Empresas
            </h3>
            <div className="flex flex-col gap-3 items-start w-full" data-node-id="27:980">
              {/* MINED Link Card */}
              <a
                href="https://mined.world/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/20 border border-white/20 flex flex-col items-center justify-center p-[16px] rounded-xl w-[140px] hover:scale-105 hover:bg-black/30 hover:border-white/40 transition-all duration-300 shadow-md"
                data-node-id="27:981"
              >
                <div className="relative w-[80px] h-[16px]" data-node-id="27:982">
                  <Image
                    alt="MINED Logo"
                    src="/assets/395ecce46f87796c93e731a21920ed6c9c439df2.svg"
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              </a>

              {/* FWP Link Card */}
              <a
                href="https://futureworldproducts.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/20 border border-white/20 flex flex-col items-center justify-center p-[16px] rounded-xl w-[140px] hover:scale-105 hover:bg-black/30 hover:border-white/40 transition-all duration-300 shadow-md"
                data-node-id="27:983"
              >
                <div className="relative w-[50px] h-[16px]" data-node-id="27:984">
                  <Image
                    alt="FWP Logo"
                    src="/assets/2cd0c637c33f63418a5bed4e1020e742c0e7648c.svg"
                    fill
                    sizes="50px"
                    className="object-contain"
                  />
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Copyright and Social Block */}
      <div className="max-w-6xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6" data-node-id="27:999">

        {/* Copyright info */}
        <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left" data-node-id="27:1000">

          <p className="font-sans font-normal text-xs text-white/50" data-node-id="27:1003">
            Copyright © World GEN 2026 - Todos los derechos reservados.
          </p>
        </div>

        {/* Social Icons Right Block */}
        <div className="flex items-center gap-6" data-node-id="27:1009">

          {/* Instagram */}
          <a
            href="https://www.instagram.com/world_gen_oficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-6 h-6 hover:scale-110 active:scale-95 transition-all duration-200 hover:brightness-125"
            data-node-id="27:1010"
          >
            {/* The instagram icon is composed in figma, but we can overlay them inside absolute layout or simple icons */}
            <div className="absolute inset-0">
              <Image alt="Instagram border" src="/assets/instagram.svg" fill sizes="24px" className="object-contain brightness-0 invert" />
            </div>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/+09qKDiueDM9hZDMx"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-6 h-6 hover:scale-110 active:scale-95 transition-all duration-200 hover:brightness-125"
            data-node-id="27:1011"
          >
            <Image alt="Telegram" src="/assets/830d4f280e41b241aa5de003fbc03461e34bf24a.svg" fill sizes="24px" className="object-contain" />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/people/Equipo-Gen/100069141680036/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-6 h-6 hover:scale-110 active:scale-95 transition-all duration-200 hover:brightness-125"
            data-node-id="27:1013"
          >
            <Image alt="Facebook" src="/assets/e1687911e93a45bcbba63b572121a98fbf37b72a.svg" fill sizes="24px" className="object-contain" />
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/channel/UCpcnSb1eH4xo2_otZ-Y6Wwg"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-6 h-6 hover:scale-110 active:scale-95 transition-all duration-200 hover:brightness-125"
            data-node-id="27:1014"
          >
            <Image alt="YouTube" src="/assets/db188578000d1724140314615cefc1c59117f418.svg" fill sizes="24px" className="object-contain" />
          </a>

          {/* TikTok */}
          <a
            href="https://t.me/+09qKDiueDM9hZDMx"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-6 h-6 hover:scale-110 active:scale-95 transition-all duration-200 hover:brightness-125"
            data-node-id="27:1015"
          >
            <Image alt="TikTok" src="/assets/30f5d5b979420976bb8924b57f5d2e46c4b92a20.svg" fill sizes="24px" className="object-contain" />
          </a>

          {/* Mixlr */}
          <a
            href="https://mentalidad-gen.mixlr.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-6 h-6 hover:scale-110 active:scale-95 transition-all duration-200 hover:brightness-125"
            data-node-id="27:1017"
          >
            <Image alt="Mixlr" src="/assets/79f64d1d6a459cd86cb00718d5d777cf716b036f.svg" fill sizes="24px" className="object-contain" />
          </a>

        </div>

      </div>
    </footer>
  );
}
