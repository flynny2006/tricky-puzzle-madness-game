
import React, { useState, useRef } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

const ClockLevel = () => {
  const levelData = getLevelById(37)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [hourRotation, setHourRotation] = useState(0);
  const [minuteRotation, setMinuteRotation] = useState(0);
  
  // The correct time is 10:10
  const correctHourRotation = 300; // 10 hours * 30 degrees
  const correctMinuteRotation = 60; // 10 minutes * 6 degrees
  const rotationTolerance = 10; // Degrees of tolerance
  
  const hourHandRef = useRef<HTMLDivElement>(null);
  const minuteHandRef = useRef<HTMLDivElement>(null);
  
  const isClockCorrect = () => {
    const hourDiff = Math.abs((hourRotation % 360) - correctHourRotation);
    const minuteDiff = Math.abs((minuteRotation % 360) - correctMinuteRotation);
    
    return (hourDiff <= rotationTolerance || hourDiff >= 360 - rotationTolerance) && 
           (minuteDiff <= rotationTolerance || minuteDiff >= 360 - rotationTolerance);
  };
  
  const handleHourDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hourHandRef.current) return;
    
    const clock = hourHandRef.current.parentElement;
    if (!clock) return;
    
    const rect = clock.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) + 90;
    setHourRotation(angle);
    
    checkClock();
  };
  
  const handleMinuteDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!minuteHandRef.current) return;
    
    const clock = minuteHandRef.current.parentElement;
    if (!clock) return;
    
    const rect = clock.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) + 90;
    setMinuteRotation(angle);
    
    checkClock();
  };
  
  const checkClock = () => {
    if (isClockCorrect() && !completed) {
      completeLevel(levelData.id);
      setCompleted(true);
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
          {/* Subtle hint for 10:10 */}
          <div className="mb-4 text-gray-300 text-xs">Wall clock model #1010</div>
          
          <div className="relative w-64 h-64 bg-gray-100 rounded-full border-8 border-gray-800 shadow-lg">
            {/* Clock numbers */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xl font-bold">12</div>
            <div className="absolute top-1/2 right-6 -translate-y-1/2 text-xl font-bold">3</div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xl font-bold">6</div>
            <div className="absolute top-1/2 left-6 -translate-y-1/2 text-xl font-bold">9</div>
            
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-4 bg-gray-800"
                style={{
                  transformOrigin: 'bottom center',
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                  left: '50%',
                  top: '10%'
                }}
              />
            ))}
            
            {/* Clock center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full z-20" />
            
            {/* Hour hand */}
            <div
              ref={hourHandRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1.5 h-20 bg-gray-800 rounded-full cursor-move z-10"
              style={{
                transformOrigin: 'top center',
                transform: `translateY(-25%) rotate(${hourRotation}deg)`
              }}
              onMouseMove={(e) => {
                if (e.buttons === 1) handleHourDrag(e);
              }}
              onMouseDown={(e) => handleHourDrag(e)}
            />
            
            {/* Minute hand */}
            <div
              ref={minuteHandRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1 h-28 bg-gray-600 rounded-full cursor-move z-10"
              style={{
                transformOrigin: 'top center',
                transform: `translateY(-25%) rotate(${minuteRotation}deg)`
              }}
              onMouseMove={(e) => {
                if (e.buttons === 1) handleMinuteDrag(e);
              }}
              onMouseDown={(e) => handleMinuteDrag(e)}
            />
          </div>
          
          <p className="mt-4 text-gray-600">
            Drag the clock hands to set the correct time.
          </p>
          
          {completed && (
            <p className="mt-4 text-green-600 font-bold">
              Perfect! The clock now shows the correct time.
            </p>
          )}
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={levelData.id} />}
    </>
  );
};

export default ClockLevel;
