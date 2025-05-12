
import React, { useState, useRef } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';

const SunriseLevel = () => {
  const levelData = getLevelById(36)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });
  const constraintsRef = useRef(null);
  
  // Check if the sun has been dragged off screen
  const handleDragEnd = (event: any, info: any) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Check if sun is dragged off the screen
    if (info.point.x < 0 || info.point.x > viewportWidth || 
        info.point.y < 0 || info.point.y > viewportHeight) {
      completeLevel(levelData.id);
      setCompleted(true);
    }
    
    setSunPosition({ x: info.offset.x, y: info.offset.y });
  };
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description={levelData.description}
        hint={levelData.hint}
      >
        <div 
          className="w-full h-64 bg-gradient-to-b from-blue-400 to-blue-700 overflow-hidden"
          ref={constraintsRef}
        >
          {!completed ? (
            <motion.div
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="w-20 h-20 bg-yellow-400 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center shadow-lg"
              style={{
                boxShadow: "0 0 40px 20px rgba(255, 200, 0, 0.6)",
                margin: "40px auto"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">☀️</span>
            </motion.div>
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute top-0 left-0 w-full">
                <div className="w-full h-40 bg-gradient-to-b from-yellow-200 to-orange-400" />
              </div>
              <div className="absolute bottom-0 w-full flex justify-center">
                <div className="w-20 h-20 rounded-t-full bg-white animate-bounce -mb-10" />
              </div>
            </div>
          )}
        </div>
        
        {completed && (
          <div className="mt-4 text-green-600 font-bold text-lg">
            Good morning! You woke up!
          </div>
        )}
      </LevelLayout>
      
      {completed && <LevelComplete level={levelData.id} />}
    </>
  );
};

export default SunriseLevel;
