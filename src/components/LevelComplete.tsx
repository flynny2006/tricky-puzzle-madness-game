
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

interface LevelCompleteProps {
  level: number;
}

const LevelComplete: React.FC<LevelCompleteProps> = ({ level }) => {
  const { nextLevel, gameState } = useGame();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Trigger confetti effect when component mounts
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const handleNextLevel = () => {
    nextLevel();
    
    // If there are more levels
    if (level < gameState.totalLevels) {
      navigate(`/level/${level + 1}`);
    } else {
      // If this was the last level, go to completion screen
      navigate('/completion');
    }
  };

  const handleLevelSelect = () => {
    navigate('/levels');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-xs w-full shadow-lg animate-pop text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-game-primary mb-1">Level {level} Complete!</h2>
          <p className="text-gray-600 mb-4">You solved the puzzle!</p>
          
          <div className="flex flex-col gap-3 mt-6">
            <Button
              onClick={handleNextLevel}
              className="bg-game-primary text-white hover:bg-game-primary/90"
            >
              {level < gameState.totalLevels ? 'Next Level' : 'Finish Game'}
            </Button>
            
            <Button
              onClick={handleLevelSelect}
              variant="outline"
              className="border-game-primary text-game-primary hover:bg-game-primary/10"
            >
              Level Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelComplete;
