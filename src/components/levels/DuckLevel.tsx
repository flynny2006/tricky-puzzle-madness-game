
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

const DuckLevel = () => {
  const levelData = getLevelById(1)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  
  const handleComplete = () => {
    completeLevel(1);
    setCompleted(true);
  };
  
  const description = "Tap the duck to proceed.";
  
  const enhancedDescription = (
    <p className="text-gray-700">Tap the <span onClick={handleComplete} className="cursor-pointer">duck</span> to proceed.</p>
  );
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description=""
        hint={levelData.hint}
      >
        {enhancedDescription}
        
        <div className="mt-8">
          <img
            src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
            alt="A yellow rubber duck"
            className="w-48 h-48 object-cover rounded-lg cursor-pointer"
            onClick={() => {}} // This does nothing - it's a trick!
          />
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={1} />}
    </>
  );
};

export default DuckLevel;
