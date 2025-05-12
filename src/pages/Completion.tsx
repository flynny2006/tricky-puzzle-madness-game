
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';
import confetti from 'canvas-confetti';

const Completion = () => {
  const navigate = useNavigate();
  const { gameState } = useGame();
  
  useEffect(() => {
    // Create a celebratory confetti effect
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Randomly spread confetti from both sides
      confetti({
        particleCount: Math.floor(particleCount),
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      
      confetti({
        particleCount: Math.floor(particleCount),
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="game-container flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl text-game-primary font-bold mb-4 text-center">
        Congratulations!
      </h1>
      
      <div className="w-48 h-48 mx-auto my-8 rounded-full bg-game-success/20 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-game-success/40 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-game-success flex items-center justify-center text-6xl">
            🏆
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-8 text-center animate-pulse-light">
        You've completed all {gameState.totalLevels} levels!
      </h2>
      
      <p className="text-xl mb-6 text-center max-w-md">
        Your brain is truly exceptional! You've conquered all the tricky puzzles and proven your creative thinking skills.
      </p>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button 
          onClick={() => navigate('/levels')}
          className="bg-game-primary text-white hover:bg-game-primary/90 p-6 text-xl"
        >
          Level Select
        </Button>
        
        <Button 
          onClick={() => navigate('/')}
          className="bg-game-secondary text-game-text hover:bg-game-secondary/90 p-6 text-xl"
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default Completion;
