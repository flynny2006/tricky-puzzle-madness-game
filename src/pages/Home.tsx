
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';

const Home = () => {
  const navigate = useNavigate();
  const { gameState, resetProgress } = useGame();
  
  const handleStart = () => {
    navigate('/levels');
  };
  
  const handleContinue = () => {
    navigate(`/level/${gameState.currentLevel}`);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress?')) {
      resetProgress();
    }
  };

  return (
    <div className="game-container flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-5xl text-game-primary font-bold mb-8 animate-bounce-light">Brain Tricks</h1>
      
      <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-game-primary flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-white flex items-center justify-center">
          <div className="text-game-primary text-5xl font-bold">🧠</div>
        </div>
      </div>
      
      <p className="text-xl mb-8 text-center">
        Challenge your mind with tricky puzzles that make you think outside the box!
      </p>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {gameState.completedLevels.length > 0 ? (
          <Button 
            onClick={handleContinue}
            className="bg-game-primary text-white hover:bg-game-primary/90 p-6 text-xl"
          >
            Continue
          </Button>
        ) : null}
        
        <Button 
          onClick={handleStart}
          className={`${gameState.completedLevels.length > 0 ? 'bg-game-secondary' : 'bg-game-primary'} 
          text-white hover:bg-opacity-90 p-6 text-xl`}
        >
          {gameState.completedLevels.length > 0 ? 'Level Select' : 'Start Game'}
        </Button>
        
        {gameState.completedLevels.length > 0 ? (
          <Button 
            variant="outline"
            onClick={handleResetProgress}
            className="border-game-accent text-game-accent hover:bg-game-accent/10"
          >
            Reset Progress
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
