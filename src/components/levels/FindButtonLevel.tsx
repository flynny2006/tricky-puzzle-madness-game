
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

const FindButtonLevel = () => {
  const levelData = getLevelById(2)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  
  const handleComplete = () => {
    completeLevel(2);
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
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-lg">The button is somewhere on this screen...</p>
        </div>
        
        {/* Hidden button in bottom right */}
        <button
          className="absolute bottom-1 right-1 w-2 h-2 bg-transparent hover:bg-game-primary rounded-full border-none"
          onClick={handleComplete}
          aria-label="Hidden button"
        />
      </LevelLayout>
      
      {completed && <LevelComplete level={2} />}
    </>
  );
};

export default FindButtonLevel;
