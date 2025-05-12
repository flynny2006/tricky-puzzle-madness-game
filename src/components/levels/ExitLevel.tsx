
import React, { useState, useEffect } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

const ExitLevel = () => {
  const levelData = getLevelById(5)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  // Track device orientation
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Get device orientation (beta is front-to-back tilt)
      const tiltAngle = event.beta || 0;
      setRotation(tiltAngle);
      
      // Complete level if device is significantly tilted
      if (Math.abs(tiltAngle) > 60) {
        handleExitFound();
      }
    };
    
    // For desktop testing
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position relative to center of screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      
      // Map mouse movement to rotation 
      const newRotation = Math.max(-90, Math.min(90, distanceY / 3));
      setRotation(newRotation);
      
      // Complete level if mouse is moved far enough
      if (Math.abs(newRotation) > 60) {
        handleExitFound();
      }
    };
    
    window.addEventListener('deviceorientation', handleOrientation);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const handleExitFound = () => {
    completeLevel(5);
    setCompleted(true);
  };
  
  // Calculate exit visibility based on rotation
  const exitOpacity = Math.min(1, Math.abs(rotation) / 60);
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description={levelData.description}
        hint={levelData.hint}
      >
        <div className="relative flex flex-col items-center justify-center w-full h-64">
          {/* Maze with hidden exit */}
          <div 
            className="w-full h-64 bg-gray-200 border border-gray-300 relative"
            style={{ transform: `rotateX(${rotation}deg)`, perspective: '500px' }}
          >
            {/* Visible maze walls */}
            <div className="absolute top-10 left-10 w-20 h-5 bg-gray-500"></div>
            <div className="absolute top-40 left-30 w-5 h-20 bg-gray-500"></div>
            <div className="absolute top-30 right-20 w-5 h-30 bg-gray-500"></div>
            <div className="absolute bottom-20 left-40 w-30 h-5 bg-gray-500"></div>
            
            {/* Hidden exit that becomes visible when tilted */}
            <button
              className="absolute bottom-0 right-10 w-16 h-16 rounded-t-md transition-opacity duration-300"
              style={{
                backgroundColor: 'green',
                opacity: exitOpacity,
              }}
              onClick={handleExitFound}
            >
              EXIT
            </button>
          </div>
          
          <p className="mt-4 text-center text-gray-600">
            {rotation > 30 ? "I think I see something..." : "I can't find the exit..."}
          </p>
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={5} />}
    </>
  );
};

export default ExitLevel;
