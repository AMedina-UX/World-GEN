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

// Type definitions for Chrome/Firefox Network Connection API to avoid 'any' type casts
interface NetworkInformation extends EventTarget {
  readonly downlink?: number;
  readonly effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
}

interface NavigatorWithConnection extends Navigator {
  readonly connection?: NetworkInformation;
}

// Fallback speed detection based on navigator.connection
const getAutoQuality = (): '360p' | '720p' | '1080p' => {
  if (typeof navigator !== 'undefined') {
    const conn = (navigator as NavigatorWithConnection).connection;
    if (conn) {
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
  }
  return '720p'; // Default fallback
};

export default function VideoModal({ isOpen, onClose, videoUrl, videoSources }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastQualityChangeTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);

  // Video State
  const [selectedQuality, setSelectedQuality] = useState<'auto' | '360p' | '720p' | '1080p'>('auto');
  const [detectedQuality, setDetectedQuality] = useState<'360p' | '720p' | '1080p'>('720p');

  // Custom Controls State
  const [isPlaying, setIsPlaying] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // UI Panels State
  const [showControls, setShowControls] = useState(true);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [splashAction, setSplashAction] = useState<'play' | 'pause' | null>(null);

  // Compute controls visibility dynamically to avoid synchronous state updates in useEffect
  const isControlsVisible = showControls || !isPlaying || showQualityMenu;

  // 1. Initial speed estimation test on open
  useEffect(() => {
    if (!isOpen) return;

    // Reset player states asynchronously to avoid cascading render warnings
    const resetTimer = setTimeout(() => {
      setSelectedQuality('auto');
      setIsPlaying(true);
      setIsBuffering(false);
      setCurrentTime(0);
      setBufferedEnd(0);
      setShowControls(true);

      const autoQual = getAutoQuality();
      setDetectedQuality(autoQual);
      lastQualityChangeTimeRef.current = Date.now();
      currentTimeRef.current = 0;
    }, 0);

    // Run active background speed test (safely downloading a tiny chunk of the video)
    const runInitialSpeedTest = async () => {
      if (!videoSources) return;
      const testUrl = videoSources['360p'] || videoUrl;
      const startTime = performance.now();
      try {
        const response = await fetch(testUrl, {
          headers: { Range: 'bytes=0-150000' }, // 150KB chunk
          cache: 'no-store',
        });
        if (response.ok) {
          const blob = await response.blob();
          const durationSeconds = (performance.now() - startTime) / 1000;
          if (durationSeconds > 0) {
            const sizeBits = blob.size * 8;
            const speedMbps = (sizeBits / durationSeconds) / (1024 * 1024);

            let estimatedQual: '360p' | '720p' | '1080p' = '720p';
            if (speedMbps >= 5) {
              estimatedQual = '1080p';
            } else if (speedMbps >= 1.5) {
              estimatedQual = '720p';
            } else {
              estimatedQual = '360p';
            }

            setDetectedQuality(estimatedQual);
            lastQualityChangeTimeRef.current = Date.now();
          }
        }
      } catch (e) {
        console.log('Initial range speed test failed, relying on navigator.connection:', e);
      }
    };

    runInitialSpeedTest();

    return () => {
      clearTimeout(resetTimer);
    };
  }, [isOpen, videoSources, videoUrl]);

  // 2. Determine active source URL
  const activeQuality = selectedQuality === 'auto' ? detectedQuality : selectedQuality;
  const activeUrl = videoSources ? (videoSources[activeQuality] || videoUrl) : videoUrl;
  const prevUrlRef = useRef<string>(activeUrl);

  // 3. Smoothly switch video source preserving playhead time
  useEffect(() => {
    if (videoRef.current && prevUrlRef.current !== activeUrl) {
      const video = videoRef.current;
      const prevTime = currentTimeRef.current; // Use exact last playhead position from ref
      const wasPlaying = !video.paused;

      setIsBuffering(true);
      video.src = activeUrl;
      video.load();

      const handleLoadedMetadata = () => {
        video.currentTime = prevTime;
        if (wasPlaying) {
          video.play().catch(err => console.log('Error resuming playback after quality switch:', err));
        }
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      prevUrlRef.current = activeUrl;
    }
  }, [activeUrl]);

  // 4. Listen to Connection Changes (Mobile or Network Changes)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const conn = (navigator as NavigatorWithConnection).connection;
    if (!conn) return;

    const handleConnChange = () => {
      if (selectedQuality === 'auto') {
        const autoQual = getAutoQuality();
        setDetectedQuality(autoQual);
        lastQualityChangeTimeRef.current = Date.now();
      }
    };

    conn.addEventListener('change', handleConnChange);
    return () => {
      conn.removeEventListener('change', handleConnChange);
    };
  }, [selectedQuality]);

  // 5. Controls Auto-Hide timer setup on state changes
  useEffect(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    // If playing, automatically hide controls after 2.5 seconds
    if (isPlaying && !showQualityMenu) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, showQualityMenu]);

  // 6. Synchronize Fullscreen State
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // 7. Close modal on ESC (checking if fullscreen is active)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // If in fullscreen, let the browser exit fullscreen and DO NOT close the modal
        if (document.fullscreenElement) {
          return;
        }
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

  // Video Handlers
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    // Show controls when clicking screen to play/pause
    setShowControls(true);

    if (video.paused) {
      video.play().catch(err => console.log('Playback error:', err));
      setIsPlaying(true);
      setSplashAction('play');
    } else {
      video.pause();
      setIsPlaying(false);
      setSplashAction('pause');
    }

    setTimeout(() => {
      setSplashAction(null);
    }, 500);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    currentTimeRef.current = video.currentTime;

    // Calculate buffered length
    const time = video.currentTime;
    let currentBufferedEnd = 0;
    for (let i = 0; i < video.buffered.length; i++) {
      const start = video.buffered.start(i);
      const end = video.buffered.end(i);
      if (start <= time && end >= time) {
        currentBufferedEnd = end;
        break;
      }
    }
    setBufferedEnd(currentBufferedEnd);

    // ABR (Adaptive Bitrate) Logic: Monitor Buffer health during playback
    if (selectedQuality === 'auto' && videoSources) {
      const now = Date.now();
      // Adjust quality at most once every 10 seconds to avoid oscillation
      if (now - lastQualityChangeTimeRef.current > 10000) {
        const bufferDuration = currentBufferedEnd - time;

        // Stalling/Low buffer: Downgrade
        if (bufferDuration < 3 && !video.paused && video.readyState >= 2) {
          if (detectedQuality === '1080p' && videoSources['720p']) {
            setDetectedQuality('720p');
            lastQualityChangeTimeRef.current = now;
          } else if (detectedQuality === '720p' && videoSources['360p']) {
            setDetectedQuality('360p');
            lastQualityChangeTimeRef.current = now;
          }
        }
        // Healthy buffer: Upgrade
        else if (bufferDuration > 15) {
          if (detectedQuality === '360p' && videoSources['720p']) {
            setDetectedQuality('720p');
            lastQualityChangeTimeRef.current = now;
          } else if (detectedQuality === '720p' && videoSources['1080p']) {
            setDetectedQuality('1080p');
            lastQualityChangeTimeRef.current = now;
          }
        }
      }
    }
  };

  const handleWaiting = () => {
    setIsBuffering(true);
    // Instant downgrade logic if a stall is detected
    if (selectedQuality === 'auto' && videoSources) {
      const now = Date.now();
      if (now - lastQualityChangeTimeRef.current > 4000) {
        if (detectedQuality === '1080p' && videoSources['720p']) {
          setDetectedQuality('720p');
          lastQualityChangeTimeRef.current = now;
        } else if (detectedQuality === '720p' && videoSources['360p']) {
          setDetectedQuality('360p');
          lastQualityChangeTimeRef.current = now;
        }
      }
    }
  };

  const handlePlaying = () => {
    setIsBuffering(false);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    video.muted = newMuted;
    if (newMuted) {
      video.volume = 0;
    } else {
      video.volume = volume;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const val = parseFloat(e.target.value);
    setVolume(val);
    video.volume = val;
    const isValMuted = val === 0;
    setIsMuted(isValMuted);
    video.muted = isValMuted;
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => {
        console.error('Failed to request fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const targetTime = parseFloat(e.target.value);
    video.currentTime = targetTime;
    setCurrentTime(targetTime);
    currentTimeRef.current = targetTime;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying && !showQualityMenu) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  // Helper formatting for video clock
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={playerContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && !showQualityMenu && setShowControls(false)}
        className="relative w-full max-w-7xl bg-black border border-[#5c64f2]/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(92,100,242,0.3)] select-none aspect-video"
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={activeUrl}
          onClick={handlePlayPause}
          onTimeUpdate={handleTimeUpdate}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onProgress={handleTimeUpdate}
          className="w-full h-full object-contain cursor-pointer"
          autoPlay
          playsInline
        />

        {/* Loading Spinner Overlay */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45 pointer-events-none z-30">
            <div className="w-14 h-14 border-4 border-t-[#5c64f2] border-white/20 rounded-full animate-spin" />
          </div>
        )}

        {/* Splash Actions (Play/Pause flash effect in center) */}
        {splashAction && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-ping duration-300">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black/50 border border-white/20 text-white">
              {splashAction === 'play' ? (
                <svg className="w-10 h-10 fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </div>
          </div>
        )}

        {/* Top Header - Close Button overlay (only visible when controls are visible) */}
        <div className={`absolute top-4 right-4 z-40 transition-all duration-300 ${isControlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 border border-white/10 text-white/80 hover:text-white hover:bg-[#5c64f2] hover:border-[#5c64f2]/80 transition-all duration-200 cursor-pointer shadow-md"
            aria-label="Cerrar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quality Cog Popover (inside player) */}
        {showQualityMenu && isControlsVisible && (
          <div className="absolute right-4 bottom-18 w-52 bg-[#0d0c22]/95 border border-[#5c64f2]/30 rounded-xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.5)] p-2 z-50 animate-fadeIn">
            <div className="text-[10px] text-white/40 px-2.5 py-1 uppercase tracking-wider font-bold">
              Calidad de reproducción
            </div>
            <div className="h-[1px] bg-white/10 my-1.5" />

            {/* Auto Button */}
            <button
              onClick={() => {
                setSelectedQuality('auto');
                setShowQualityMenu(false);
              }}
              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-all duration-200 cursor-pointer ${selectedQuality === 'auto'
                ? 'bg-[#5c64f2]/20 text-[#8087f7] font-semibold border border-[#5c64f2]/30'
                : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
            >
              <div className="flex items-center gap-1.5">
                <span>Automático</span>
                {selectedQuality === 'auto' && (
                  <span className="text-[10px] bg-[#5c64f2] text-white px-1.5 py-0.5 rounded-md text-[9px] font-bold">
                    {detectedQuality}
                  </span>
                )}
              </div>
              {selectedQuality === 'auto' && (
                <svg className="w-4 h-4 text-[#8087f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>

            {/* Quality Options */}
            {videoSources && (['1080p', '720p', '360p'] as const).map((q) => {
              const isAvailable = !!videoSources[q];
              if (!isAvailable) return null;

              return (
                <button
                  key={q}
                  onClick={() => {
                    setSelectedQuality(q);
                    setShowQualityMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-all duration-200 cursor-pointer ${selectedQuality === q
                    ? 'bg-[#5c64f2]/20 text-[#8087f7] font-semibold border border-[#5c64f2]/30'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <span>{q}</span>
                  {selectedQuality === q && (
                    <svg className="w-4 h-4 text-[#8087f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Custom Controls Overlay */}
        <div
          onClick={(e) => e.stopPropagation()} // Prevent play/pause when clicking controls bar
          className={`absolute bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-3 transition-all duration-300 ${isControlsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
        >
          {/* Scrubber / Progress Bar Row */}
          <div className="relative group/scrub w-full h-1.5 bg-white/20 rounded-full cursor-pointer transition-all duration-200 hover:h-2.5 flex items-center">
            {/* Buffered progress */}
            <div
              className="absolute top-0 left-0 h-full bg-white/25 rounded-full pointer-events-none"
              style={{ width: `${duration ? (bufferedEnd / duration) * 100 : 0}%` }}
            />
            {/* Played progress */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#5c64f2] to-[#8087f7] rounded-full pointer-events-none shadow-[0_0_8px_rgba(92,100,242,0.6)]"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
            {/* Floating thumb handle */}
            <div
              className="absolute w-3.5 h-3.5 bg-white border-2 border-[#5c64f2] rounded-full opacity-0 group-hover/scrub:opacity-100 transition-opacity duration-150 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{
                left: `${duration ? (currentTime / duration) * 100 : 0}%`,
                transform: 'translateX(-50%)'
              }}
            />
            {/* Native slider element */}
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleScrub}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Buttons & Indicators Row */}
          <div className="flex items-center justify-between">
            {/* Left controls: Play/Pause, Volume, Time */}
            <div className="flex items-center gap-4">
              {/* Play / Pause Button */}
              <button
                onClick={handlePlayPause}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/90 hover:text-white transition-all cursor-pointer"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Volume Container */}
              <div
                className="flex items-center gap-2 group/volume"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/90 hover:text-white transition-all cursor-pointer"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted || volume === 0 ? (
                    <svg className="w-5 h-5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg className="w-5 h-5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
                    </svg>
                  )}
                </button>

                {/* Volume slider (fades in on hover) */}
                <div className={`h-1 bg-white/30 rounded-full transition-all duration-300 relative flex items-center ${showVolumeSlider ? 'w-16 opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none'
                  }`}>
                  <div
                    className="absolute top-0 left-0 h-full bg-[#5c64f2] rounded-full pointer-events-none"
                    style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Time display */}
              <div className="text-xs text-white/80 font-mono tracking-wider">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1 text-white/30">/</span>
                <span className="text-white/50">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right controls: Settings cog, Fullscreen */}
            <div className="flex items-center gap-3">
              {/* Settings / Quality Cog */}
              {videoSources && (
                <div className="relative">
                  <button
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${showQualityMenu
                      ? 'bg-[#5c64f2] text-white shadow-[0_0_10px_rgba(92,100,242,0.5)]'
                      : 'hover:bg-white/10 text-white/90 hover:text-white'
                      }`}
                    aria-label="Calidad de video"
                  >
                    <svg className={`w-5 h-5 fill-current transition-transform duration-500 ${showQualityMenu ? 'rotate-90' : ''}`} viewBox="0 0 24 24">
                      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/90 hover:text-white transition-all cursor-pointer"
                aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              >
                {isFullscreen ? (
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3 3m12 6V4.5M15 9h4.5M15 9l6-6m-6 12v4.5M15 15h4.5M15 15l6 6m-6-6v4.5M9 15H4.5M9 15l-6 6" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
