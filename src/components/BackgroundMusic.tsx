
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/music/jazz-background.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Start with lower volume
    audioRef.current = audio;
    
    // Try to play (might be blocked by browser autoplay policy)
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Auto-play was prevented
        console.log("Autoplay prevented:", error);
        // We'll rely on the user clicking the button to start audio
      });
    }
    
    // Cleanup
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log("Play error:", e));
    } else {
      audioRef.current.volume = 0;
    }
    
    setIsMuted(!isMuted);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed bottom-4 right-4 z-50 rounded-full w-10 h-10 bg-white/80 hover:bg-white shadow-md"
      onClick={toggleMute}
      title={isMuted ? "Turn music on" : "Turn music off"}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </Button>
  );
};

export default BackgroundMusic;
