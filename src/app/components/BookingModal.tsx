'use client';

import { useState, useEffect, useMemo } from 'react';

interface BookingPlace {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  schedule: string;
  phone: string;
}

const bookingPlaces: BookingPlace[] = [
  {
    id: 'book-1',
    name: 'World GEN - Surco',
    country: 'Perú',
    city: 'Lima',
    address: 'Av. Circunvalación del Golf los Incas 134, Santiago de Surco, Lima, Perú',
    schedule: '',
    phone: '+51 1 500 4040',
  },
  {
    id: 'book-2',
    name: 'World GEN - Derby',
    country: 'Perú',
    city: 'Lima',
    address: 'Av. El Derby 250, Santiago de Surco, Lima, Perú',
    schedule: '',
    phone: '+51 1 700 8820',
  },
  {
    id: 'book-3',
    name: 'World GEN - Argentina',
    country: 'Argentina',
    city: 'Córdoba',
    address: 'Av. Colón 5050, Córdoba, Argentina',
    schedule: '',
    phone: '+52 55 6677 8899',
  }
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [selectedPlace, setSelectedPlace] = useState<BookingPlace | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Todos');

  // Close modal on ESC press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // List of unique countries for filter tabs
  const countries = useMemo(() => {
    const list = new Set(bookingPlaces.map((p) => p.country));
    return ['Todos', ...Array.from(list)];
  }, []);

  // Filtered places based on search query and country selection
  const filteredPlaces = useMemo(() => {
    return bookingPlaces.filter((place) => {
      const matchesCountry = selectedCountry === 'Todos' || place.country === selectedCountry;
      const matchesSearch =
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.country.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCountry && matchesSearch;
    });
  }, [searchQuery, selectedCountry]);

  // Reset selection if the currently selected place is not in the filtered list
  useEffect(() => {
    if (filteredPlaces.length > 0) {
      const isSelectedStillVisible = filteredPlaces.some((p) => p.id === selectedPlace?.id);
      if (!isSelectedStillVisible) {
        const timer = setTimeout(() => {
          setSelectedPlace(filteredPlaces[0]);
        }, 0);
        return () => clearTimeout(timer);
      }
    } else {
      const timer = setTimeout(() => {
        setSelectedPlace(null);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [filteredPlaces, selectedPlace?.id]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const mapIframeUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    selectedPlace?.address || ''
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl h-[90vh] md:h-[80vh] flex flex-col bg-[#141230]/95 border border-[#5c64f2]/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(92,100,242,0.3)] animate-scaleIn">

        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#5c64f2]/20 bg-[#19163c]/50">
          <div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#d2d5fc] to-[#a0a5fa] font-sans">
              Reserva de Espacios GEN
            </h3>
            <p className="text-xs text-white/60 font-sans mt-0.5">
              Pronto podras hacer reservas de nuestros productos en las siguientes oficinas.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/40 border border-white/10 text-white/80 hover:text-white hover:bg-[#5c64f2] hover:border-[#5c64f2]/80 transition-all duration-200 cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-[#5c64f2]/60"
            aria-label="Cerrar modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Main Content Container */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">

          {/* Left Panel: Search and List */}
          <div className="w-full md:w-[40%] flex flex-col border-r border-[#5c64f2]/20 bg-[#0d0b21]/45 p-4 min-h-0">
            {/* Search Input */}
            <div className="relative mb-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar espacio, dirección..."
                className="w-full pl-9 pr-4 py-2 text-sm text-white bg-black/40 border border-[#5c64f2]/30 rounded-xl focus:outline-none focus:border-[#5c64f2] focus:ring-1 focus:ring-[#5c64f2]/40 transition-all font-sans placeholder-white/30"
              />
            </div>

            {/* Country Filters Scrollable Bar */}
            <div className="flex gap-1.5 overflow-x-auto pb-3 mb-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-all duration-200 border cursor-pointer ${selectedCountry === country
                    ? 'bg-[#5c64f2] border-[#5c64f2] text-white shadow-[0_0_10px_rgba(92,100,242,0.4)]'
                    : 'bg-black/20 border-[#5c64f2]/20 text-white/70 hover:border-[#5c64f2]/50 hover:text-white'
                    }`}
                >
                  {country}
                </button>
              ))}
            </div>

            {/* List of Places */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => {
                  const isSelected = selectedPlace?.id === place.id;
                  return (
                    <div
                      key={place.id}
                      onClick={() => setSelectedPlace(place)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 ${isSelected
                        ? 'border-[#5c64f2] bg-[#5c64f2]/10 shadow-[inset_0_0_15px_rgba(92,100,242,0.08)]'
                        : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15'
                        }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[10px] font-bold text-[#a0a5fa] uppercase tracking-wider bg-[#5c64f2]/20 px-2 py-0.5 rounded">
                          {place.city}, {place.country}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mt-1.5 font-sans leading-tight">
                        {place.name}
                      </h4>
                      <p className="text-xs text-white/60 mt-1 font-sans line-clamp-2">
                        {place.address}
                      </p>

                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-white/20 mb-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <p className="text-sm font-semibold text-white/50 font-sans">
                    No se encontraron espacios
                  </p>
                  <p className="text-xs text-white/30 font-sans mt-1">
                    Prueba con otros términos de búsqueda.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Map Frame */}
          <div className="flex-1 h-[250px] md:h-full bg-black relative">
            {selectedPlace ? (
              <iframe
                title={`Mapa de ${selectedPlace.name}`}
                src={mapIframeUrl}
                className="w-full h-full border-0 opacity-100"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/40">
                Selecciona un espacio de coworking para ver el mapa.
              </div>
            )}

            {/* Dark glass ambient border gradient inside map */}
            <div className="absolute inset-0 pointer-events-none border border-inset border-[#5c64f2]/10 rounded-r-2xl" />
          </div>

        </div>
      </div>
    </div>
  );
}
