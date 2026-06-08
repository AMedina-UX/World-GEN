import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Ecosistema from './components/Ecosistema';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#040316] text-white flex flex-col items-center justify-start overflow-hidden">

      {/* Premium ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(92,100,242,0.08)_0%,transparent_70%)] blur-[80px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(95,76,191,0.08)_0%,transparent_70%)] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[60%] h-[40%] bg-[radial-gradient(circle,rgba(42,48,179,0.05)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="w-full flex-1 flex flex-col items-center relative z-10">
        
        {/* Fullscreen Hero Header */}
        <Hero />

        {/* Project Grid */}
        <ProjectGrid />

        {/* Section divider line */}
        <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#5c64f2]/30 to-transparent my-10" />

        {/* Ecosistema Section (3 Cards) */}
        <Ecosistema />

      </main>

      {/* Premium Footer */}
      <Footer />
    </div>
  );
}
