
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';

const CatLevel = () => {
  const levelData = getLevelById(17)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [fishPosition, setFishPosition] = useState({ x: 0, y: 0 });
  const [isCatFed, setIsCatFed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    // Get cat position (center of screen)
    const catRect = document.getElementById('cat')?.getBoundingClientRect();
    
    if (catRect) {
      const catCenter = {
        x: catRect.left + catRect.width / 2,
        y: catRect.top + catRect.height / 2
      };
      
      // Check if fish is close to cat
      const fishCenter = {
        x: info.point.x,
        y: info.point.y
      };
      
      const distance = Math.sqrt(
        Math.pow(fishCenter.x - catCenter.x, 2) + 
        Math.pow(fishCenter.y - catCenter.y, 2)
      );
      
      if (distance < 100) { // Close enough to feed
        setIsCatFed(true);
        completeLevel(17);
        setCompleted(true);
      }
    }
    
    setFishPosition({ x: info.offset.x, y: info.offset.y });
  };
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description={levelData.description}
        hint={levelData.hint}
      >
        <div className="w-full flex flex-col items-center">
          {/* Cat */}
          <div id="cat" className="w-40 h-40 relative mb-8">
            <motion.div
              animate={isCatFed ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: 2, duration: 0.5 }}
            >
              <div className="text-8xl">
                {isCatFed ? "😺" : "😿"}
              </div>
            </motion.div>
            <p className="text-center mt-2">
              {isCatFed ? "Yum! Thank you!" : "I'm hungry..."}
            </p>
          </div>
          
          {/* Fish - hidden in the corner */}
          <motion.div
            drag
            dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className={`absolute bottom-6 right-8 text-4xl cursor-grab ${isDragging ? 'z-50' : ''} ${isCatFed ? 'opacity-0' : 'animate-pulse'}`}
            whileDrag={{ scale: 1.1 }}
            style={{ x: fishPosition.x, y: fishPosition.y }}
          >
            🐟
          </motion.div>
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={17} />}
    </>
  );
};

export default CatLevel;
