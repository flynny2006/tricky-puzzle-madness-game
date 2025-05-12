
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { Check } from 'lucide-react';

const LevelSelect = () => {
  const navigate = useNavigate();
  const { gameState, isLevelLocked, isLevelCompleted } = useGame();

  const handleLevelSelect = (level: number) => {
    if (!isLevelLocked(level)) {
      navigate(`/level/${level}`);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  // Create an array of level numbers from 1 to totalLevels
  const levels = Array.from({ length: gameState.totalLevels }, (_, i) => i + 1);

  return (
    <div className="game-container px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Button 
          onClick={handleBack} 
          variant="outline"
          className="border-game-primary text-game-primary hover:bg-game-primary/10"
        >
          Back
        </Button>
        <h1 className="text-2xl font-bold text-game-primary">Select Level</h1>
        <div className="w-[70px]"></div> {/* Spacer for alignment */}
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-5 gap-4 mb-8">
        {levels.map((level) => {
          const locked = isLevelLocked(level);
          const completed = isLevelCompleted(level);
          
          return (
            <button
              key={level}
              onClick={() => handleLevelSelect(level)}
              disabled={locked}
              className={`aspect-square rounded-lg text-xl font-bold relative
                ${locked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 
                  completed ? 'bg-game-success text-white' : 'bg-game-primary text-white hover:bg-opacity-90'}
                flex items-center justify-center shadow transition-all
                ${!locked && 'hover:scale-105 active:scale-95'}`}
            >
              {level}
              {completed && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                  <Check size={16} className="text-game-success" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="text-center text-gray-600 mt-4">
        <p>Completed: {gameState.completedLevels.length} / {gameState.totalLevels}</p>
      </div>
    </div>
  );
};

export default LevelSelect;
