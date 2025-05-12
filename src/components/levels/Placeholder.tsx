
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

interface PlaceholderProps {
  levelId: number;
}

const Placeholder: React.FC<PlaceholderProps> = ({ levelId }) => {
  const levelData = getLevelById(levelId)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  
  const handleComplete = () => {
    completeLevel(levelId);
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
          <div className="text-lg mb-4">This level is under construction.</div>
          <p className="text-gray-600 text-center mb-6">
            We're working hard to implement this tricky puzzle!
          </p>
          <button 
            className="mt-4 bg-game-primary text-white px-4 py-2 rounded"
            onClick={handleComplete}
          >
            Complete (placeholder)
          </button>
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={levelId} />}
    </>
  );
};

export default Placeholder;
