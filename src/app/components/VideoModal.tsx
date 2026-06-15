import { useEffect, useRef, useState } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoSources?: {
    '360p'?: string;
    '720p'?: string;
    '1080p'?: string;
  };
}

const getAutoQuality = (): '360p' | '720p' | '1080p' => {
  if (typeof navigator !== 'undefined' && (navigator as any).connection) {
    const conn = (navigator as any).connection;
    const downlink = conn.downlink || 0; // in Mbps
    const effectiveType = conn.effectiveType;
    
    if (downlink >= 5 || effectiveType === '4g') {
      return '1080p';
    } else if (downlink >= 1.5 || effectiveType === '3g') {
      return '720p';
    } else {
      return '360p';
    }
  }
  return '720p'; // Default fallback
};

export default function VideoModal({ isOpen, onClose, videoUrl, videoSources }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedQuality, setSelectedQuality] = useState<'auto' | '360p' | '720p' | '1080p'>('auto');
  const [detectedQuality, setDetectedQuality] = useState<'360p' | '720p' | '1080p'>('720p');

  // Detect internet speed on open
  useEffect(() => {
    if (isOpen) {
      const autoQual = getAutoQuality();
      setDetectedQuality(autoQual);
      setSelectedQuality('auto');
    }
  }, [isOpen]);

  // Determine active source URL
  const activeQuality = selectedQuality === 'auto' ? detectedQuality : selectedQuality;
  const activeUrl = videoSources ? (videoSources[activeQuality] || videoUrl) : videoUrl;

  const prevUrlRef = useRef<string>(activeUrl);

  // Transition video source smoothly by keeping playhead position
  useEffect(() => {
    if (videoRef.current && prevUrlRef.current !== activeUrl) {
      const video = videoRef.current;
      const currentTime = video.currentTime;
      const wasPaused = video.paused;

      video.src = activeUrl;
      video.load();

      const handleLoadedMetadata = () => {
        video.currentTime = currentTime;
        if (!wasPaused) {
          video.play().catch(err => console.log("Error resuming playback:", err));
        }
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      prevUrlRef.current = activeUrl;
    }
  }, [activeUrl]);

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

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-[#141230]/90 border border-[#5c64f2]/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(92,100,242,0.3)] animate-scaleIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 border border-white/10 text-white/80 hover:text-white hover:bg-[#5c64f2] hover:border-[#5c64f2]/80 transition-all duration-200 cursor-pointer shadow-md"
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

        {/* Video Player */}
        <div className="aspect-video w-full flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src={activeUrl}
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
          />
        </div>

        {/* Quality Controls Footer */}
        {videoSources && (
          <div className="px-6 py-4 bg-[#0d0c22]/90 border-t border-[#5c64f2]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-[#8087f7]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              <span className="text-xs text-white/80 font-semibold uppercase tracking-wider">
                Calidad de reproducción:
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedQuality('auto')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedQuality === 'auto'
                    ? 'bg-gradient-to-r from-[#5c64f2] to-[#8087f7] text-white shadow-[0_0_15px_rgba(92,100,242,0.4)] border border-[#8087f7]/30'
                    : 'bg-black/40 text-white/60 border border-white/5 hover:border-white/20 hover:text-white/80'
                }`}
              >
                Automático ({detectedQuality})
              </button>
              
              {(['360p', '720p', '1080p'] as const).map((q) => {
                const isAvailable = !!videoSources[q];
                if (!isAvailable) return null;
                
                return (
                  <button
                    key={q}
                    onClick={() => setSelectedQuality(q)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      selectedQuality === q
                        ? 'bg-gradient-to-r from-[#5c64f2] to-[#8087f7] text-white shadow-[0_0_15px_rgba(92,100,242,0.4)] border border-[#8087f7]/30'
                        : 'bg-black/40 text-white/60 border border-white/5 hover:border-white/20 hover:text-white/80'
                    }`}
                  >
                    {q}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
