
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

const PhoneLevel = () => {
  const levelData = getLevelById(11)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  
  // Placeholder for now - in a real implementation this would have the phone unlock functionality
  
  const handleComplete = () => {
    completeLevel(levelData.id);
    setCompleted(true);
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
          <p>This level is under construction.</p>
          <button 
            className="mt-4 bg-game-primary text-white px-4 py-2 rounded"
            onClick={handleComplete}
          >
            Complete (placeholder)
          </button>
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={levelData.id} />}
    </>
  );
};

export default PhoneLevel;
