
import React, { useState, useEffect } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

const LightLevel = () => {
  const levelData = getLevelById(4)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  
  // Using device motion to detect shaking
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    const threshold = 15;
    
    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;
      
      const x = acceleration.x || 0;
      const y = acceleration.y || 0;
      const z = acceleration.z || 0;
      
      const deltaX = Math.abs(x - lastX);
      const deltaY = Math.abs(y - lastY);
      const deltaZ = Math.abs(z - lastZ);
      
      if ((deltaX > threshold && deltaY > threshold) || 
          (deltaX > threshold && deltaZ > threshold) || 
          (deltaY > threshold && deltaZ > threshold)) {
        handleShake();
      }
      
      lastX = x;
      lastY = y;
      lastZ = z;
    };
    
    // Also allow mouse movement as "shake" for desktop users
    const handleMouseMove = (event: MouseEvent) => {
      if (event.movementX > 20 || event.movementY > 20) {
        handleShake();
      }
    };
    
    window.addEventListener('devicemotion', handleMotion);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const handleShake = () => {
    // Alternate light state on shake
    setShakeCount(prev => prev + 1);
    if (shakeCount > 5 && !lightOn) {
      setLightOn(true);
      setTimeout(() => {
        completeLevel(4);
        setCompleted(true);
      }, 1000);
    }
  };
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description={levelData.description}
        hint={levelData.hint}
      >
        <div className="flex flex-col items-center w-full">
          <div 
            className={`w-32 h-32 rounded-full transition-all duration-300 mb-8 ${
              lightOn ? 'bg-yellow-300 shadow-lg shadow-yellow-200' : 'bg-gray-300'
            }`}
          />
          
          <p className="text-lg text-center">
            {lightOn 
              ? "Great! The light is now on." 
              : "The light is off. Find a way to turn it on."}
          </p>
          
          <div className="mt-8 text-sm text-gray-500">
            {shakeCount > 0 && shakeCount <= 5 && (
              <p>Keep going...</p>
            )}
          </div>
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={4} />}
    </>
  );
};

export default LightLevel;
