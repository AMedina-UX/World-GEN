import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  image: string;
  link: string;
  active: boolean;
  aspect: string;
}

const firstRowProjects: Project[] = [
  {
    id: '3:246',
    name: 'MINED',
    image: '/assets/da9895df3b4fa261f4417d6d6488883d472ca81b.png',
    link: 'https://mined.world/presentacion-mined/',
    active: true,
    aspect: 'aspect-[279.48/335]'
  },
  {
    id: '3:245',
    name: 'FWP',
    image: '/assets/fwp.png',
    link: 'https://linktr.ee/futureworldproducts?utm_source=linktree_profile_share&ltsid=d1854c57-5c4c-4f40-84af-6d18833b1cf7',
    active: true,
    aspect: 'aspect-[275.65/335]'
  },
  {
    id: '3:244',
    name: 'AYNI',
    image: '/assets/ayni.png',
    link: 'https://linktr.ee/ayniworldoficial?utm_source=linktree_profile_share&ltsid=612bcf94-15c4-44c0-abb3-383ebc3fcbe5',
    active: true,
    aspect: 'aspect-[277.57/335]'
  }
];

const secondRowProjects: Project[] = [
  {
    id: '3:2589',
    name: 'World Sense',
    image: '/assets/sense.png',
    link: 'https://www.instagram.com/worldsenseofficial/',
    active: true,
    aspect: 'aspect-[275.65/335]'
  },
  {
    id: '3:249',
    name: 'World Pet',
    image: '/assets/1b8bbb55059a8ff4a8f8322ee835aa4781879473.png',
    link: '#',
    active: false,
    aspect: 'aspect-[281.09/335]'
  },
  {
    id: '3:247',
    name: 'World Beauty',
    image: '/assets/a9d2073dc90784e582603350a46054203c8a0aa0.png',
    link: '#',
    active: false,
    aspect: 'aspect-[281.09/335]'
  }
];

export default function ProjectGrid() {
  return (
    <section id="marcas" className="w-full max-w-7xl mx-auto px-4 sm:px-10 pt-4 pb-10 scroll-mt-28" data-node-id="3:2597">
      <div className="flex flex-col gap-6 items-center">

        {/* Row 1: Active Brands */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full" data-node-id="3:2596">
          {firstRowProjects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative block w-full ${project.aspect} overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg transition-all duration-500 ease-out hover:border-[#5c64f2]/80 hover:shadow-[0_0_35px_5px_rgba(92,100,242,0.4)]`}
              data-node-id={project.id}
            >
              {/* Outer soft glow border inside card */}
              <div className="absolute inset-0 border border-white/5 group-hover:border-white/10 rounded-2xl pointer-events-none z-20 transition-all duration-500" />

              {/* Radial gradient shine on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(92,100,242,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

              {/* Image with slight zoom animation */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt={project.name}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-100 brightness-[0.9] group-hover:brightness-100"
                  src={project.image}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Row 2: Inactive / Coming Soon Brands */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-8xl mt-2 justify-center" data-node-id="3:2595">
          {secondRowProjects.map((project) => (
            project.active ? (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block w-full ${project.aspect} overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg transition-all duration-500 ease-out hover:border-[#5c64f2]/80 hover:shadow-[0_0_35px_5px_rgba(92,100,242,0.4)]`}
                data-node-id={project.id}
              >
                {/* Outer soft glow border inside card */}
                <div className="absolute inset-0 border border-white/5 group-hover:border-white/10 rounded-2xl pointer-events-none z-20 transition-all duration-500" />

                {/* Radial gradient shine on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(92,100,242,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                {/* Image with slight zoom animation */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    alt={project.name}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-100 brightness-[0.9] group-hover:brightness-100"
                    src={project.image}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              </a>
            ) : (
              <div
                key={project.id}
                className={`relative w-full ${project.aspect} overflow-hidden rounded-2xl border border-white/5 bg-black/20 opacity-80 cursor-not-allowed select-none transition-all duration-300 hover:opacity-90`}
                data-node-id={project.id}
              >
                {/* Disabled style overlay */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />

                {/* Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    alt={project.name}
                    className="object-cover grayscale-[20%] brightness-[0.75]"
                    src={project.image}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
