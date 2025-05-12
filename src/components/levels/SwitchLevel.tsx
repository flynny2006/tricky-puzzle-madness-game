
import React, { useState, useRef } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

const SwitchLevel = () => {
  const levelData = getLevelById(10)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const dragStartYRef = useRef<number | null>(null);
  
  const handleSwitchClick = () => {
    // Clicking does nothing but increment attempts
    setAttempts(attempts + 1);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartYRef.current = e.clientY;
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      dragStartYRef.current = e.touches[0].clientY;
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartYRef.current === null) return;
    
    const dragDistance = dragStartYRef.current - e.clientY;
    if (dragDistance > 50 && !switchOn) {
      setSwitchOn(true);
      setTimeout(() => {
        completeLevel(10);
        setCompleted(true);
      }, 500);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartYRef.current === null || e.touches.length === 0) return;
    
    const dragDistance = dragStartYRef.current - e.touches[0].clientY;
    if (dragDistance > 50 && !switchOn) {
      setSwitchOn(true);
      setTimeout(() => {
        completeLevel(10);
        setCompleted(true);
      }, 500);
    }
  };
  
  const handleMouseUp = () => {
    dragStartYRef.current = null;
  };
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description={levelData.description}
        hint={levelData.hint}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-32 h-64 bg-gray-200 rounded-lg p-4 flex flex-col items-center relative">
            {/* Switch track */}
            <div className="w-12 h-24 bg-gray-400 rounded-full my-4 relative">
              {/* Switch handle */}
              <div 
                className={`w-10 h-10 bg-white rounded-full absolute left-1 cursor-pointer shadow-md
                  transition-transform duration-300 ${switchOn ? 'transform -translate-y-14' : 'transform translate-y-14'}`}
                onClick={handleSwitchClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              ></div>
            </div>
            
            {/* Switch labels */}
            <div className="absolute top-6 right-6 text-gray-500">ON</div>
            <div className="absolute bottom-6 right-6 text-gray-500">OFF</div>
            
            {/* Light indicator */}
            <div className={`w-8 h-8 rounded-full mt-6 ${switchOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          
          {attempts > 2 && (
            <p className="text-gray-600 mt-4">
              Maybe try something other than clicking?
            </p>
          )}
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={10} />}
    </>
  );
};

export default SwitchLevel;
