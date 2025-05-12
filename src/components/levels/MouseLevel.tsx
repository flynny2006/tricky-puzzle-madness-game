import React, { useState, useEffect, useRef } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

const MouseLevel = () => {
  const levelData = getLevelById(7)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameAreaRef.current) return;
      
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Make the mouse run away from cursor
      const deltaX = x - mousePosition.x;
      const deltaY = y - mousePosition.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < 100) {
        const moveAwayX = mousePosition.x - deltaX * 0.3;
        const moveAwayY = mousePosition.y - deltaY * 0.3;
        
        // Keep the mouse within the game area
        const newX = Math.min(Math.max(20, moveAwayX), rect.width - 20);
        const newY = Math.min(Math.max(20, moveAwayY), rect.height - 20);
        
        setMousePosition({ x: newX, y: newY });
      }
    };
    
    // Add click handler to the window to catch clicks outside the mouse
    const handleClick = (e: MouseEvent) => {
      if (!gameAreaRef.current) return;
      
      const rect = gameAreaRef.current.getBoundingClientRect();
      const clickedInsideGameArea = (
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom
      );
      
      const mouseElem = document.getElementById('mouse-target');
      const clickedOnMouse = mouseElem && e.target === mouseElem;
      
      // Complete if clicked in game area but not on mouse
      if (clickedInsideGameArea && !clickedOnMouse) {
        completeLevel(7);
        setCompleted(true);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [mousePosition, completeLevel]);
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description={levelData.description}
        hint={levelData.hint}
      >
        <div 
          ref={gameAreaRef}
          className="w-full h-64 bg-white border border-gray-300 relative cursor-pointer"
        >
          <div
            id="mouse-target"
            className="absolute w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer"
            style={{ 
              left: `${mousePosition.x - 20}px`, 
              top: `${mousePosition.y - 20}px`,
              transition: 'left 0.2s, top 0.2s' 
            }}
          >
            🐭
          </div>
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={7} />}
    </>
  );
};

export default MouseLevel;
