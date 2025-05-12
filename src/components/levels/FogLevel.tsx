
import React, { useState, useRef, useEffect } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

const FogLevel = () => {
  const levelData = getLevelById(22)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [fogOpacity, setFogOpacity] = useState(0.8);
  const [rubbingPoints, setRubbingPoints] = useState<{x: number, y: number}[]>([]);
  const [lastTouch, setLastTouch] = useState<{x: number, y: number} | null>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear fog based on vigorous rubbing
  useEffect(() => {
    if (rubbingPoints.length > 20) {
      const reduction = 0.05 * (rubbingPoints.length / 20);
      setFogOpacity(prev => Math.max(0, prev - reduction));
      setRubbingPoints([]);
    }
    
    if (timerRef.current) clearTimeout(timerRef.current);
    
    timerRef.current = setTimeout(() => {
      setRubbingPoints([]);
      if (fogOpacity > 0.1) {
        setFogOpacity(prev => Math.min(0.8, prev + 0.05));
      }
    }, 500);
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [rubbingPoints, fogOpacity]);
  
  // Check for level completion
  useEffect(() => {
    if (fogOpacity <= 0.1 && !completed) {
      completeLevel(22);
      setCompleted(true);
    }
  }, [fogOpacity, completed, completeLevel]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // Only track when mouse button is pressed
    
    const rect = fogRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (lastTouch) {
      // Calculate distance from last touch
      const distance = Math.sqrt(
        Math.pow(x - lastTouch.x, 2) + Math.pow(y - lastTouch.y, 2)
      );
      
      // Only add points for significant movements
      if (distance > 5) {
        setRubbingPoints(prev => [...prev, { x, y }]);
      }
    }
    
    setLastTouch({ x, y });
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = fogRef.current?.getBoundingClientRect();
    if (!rect || !touch) return;
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    if (lastTouch) {
      // Calculate distance from last touch
      const distance = Math.sqrt(
        Math.pow(x - lastTouch.x, 2) + Math.pow(y - lastTouch.y, 2)
      );
      
      // Only add points for significant movements
      if (distance > 5) {
        setRubbingPoints(prev => [...prev, { x, y }]);
      }
    }
    
    setLastTouch({ x, y });
  };
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description={levelData.description}
        hint={levelData.hint}
      >
        <div className="w-full h-64 relative overflow-hidden rounded-lg">
          {/* Hidden content under the fog */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">🏆</div>
            <p className="absolute bottom-4 text-lg font-bold">You found the treasure!</p>
          </div>
          
          {/* Fog overlay */}
          <div
            ref={fogRef}
            className="absolute inset-0 bg-gray-400 cursor-move"
            style={{ 
              opacity: fogOpacity,
              background: 'linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(200,200,200,0.9))'
            }}
            onMouseDown={() => setLastTouch(null)}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setLastTouch(null)}
            onTouchStart={() => setLastTouch(null)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setLastTouch(null)}
          />
          
          {/* Fog effect circles where user is rubbing */}
          {rubbingPoints.slice(-5).map((point, index) => (
            <div
              key={index}
              className="absolute w-10 h-10 rounded-full pointer-events-none"
              style={{
                left: point.x - 20,
                top: point.y - 20,
                background: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 70%, rgba(255,255,255,0) 100%)',
              }}
            />
          ))}
          
          <div className="absolute bottom-2 left-2 text-xs text-gray-500">
            Rub vigorously to clear the fog
          </div>
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={22} />}
    </>
  );
};

export default FogLevel;
