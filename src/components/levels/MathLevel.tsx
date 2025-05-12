
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';

const MathLevel = () => {
  const levelData = getLevelById(3)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);
  
  const handleAnswerClick = (answer: number) => {
    setSelectedAnswer(answer);
    if (answer === 8) { // The trick answer
      completeLevel(3);
      setCompleted(true);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
    }
  };
  
  const possibleAnswers = [5, 6, 7, 8];
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description={levelData.description}
        hint={levelData.hint}
      >
        <div className="flex flex-col items-center">
          <div className="text-6xl font-bold mb-8">3 + 3 = ?</div>
          
          <div className="grid grid-cols-2 gap-4 max-w-xs">
            {possibleAnswers.map((answer) => (
              <Button
                key={answer}
                className={`w-20 h-20 text-3xl ${
                  selectedAnswer === answer 
                    ? (answer === 8 ? 'bg-game-success' : 'bg-game-error') 
                    : 'bg-game-primary'
                } hover:bg-opacity-90`}
                onClick={() => handleAnswerClick(answer)}
              >
                {answer}
              </Button>
            ))}
          </div>
          
          {showError && (
            <p className="text-game-error mt-6 animate-wiggle">
              Try again!
            </p>
          )}
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={3} />}
    </>
  );
};

export default MathLevel;
