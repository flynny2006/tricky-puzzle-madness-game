
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';

const CountLevel = () => {
  const levelData = getLevelById(8)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState(false);
  
  // The trick is that users need to count everything including UI elements
  const correctAnswer = '15'; // This includes visible items + UI elements
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer === correctAnswer) {
      completeLevel(8);
      setCompleted(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description={levelData.description}
        hint={levelData.hint}
      >
        <div className="flex flex-col items-center w-full">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Create various objects to count */}
            <div className="w-16 h-16 bg-red-500 rounded-md"></div>
            <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
            <div className="w-16 h-16 bg-green-500 rounded-lg"></div>
            <div className="w-16 h-16 bg-yellow-500 rounded-md flex items-center justify-center text-2xl">🍎</div>
            <div className="w-16 h-16 bg-purple-500 rounded-md flex items-center justify-center text-2xl">🥕</div>
            <div className="w-16 h-16 bg-pink-500 rounded-md flex items-center justify-center text-2xl">🐶</div>
            <div className="w-16 h-16 bg-orange-500 rounded-md flex items-center justify-center text-2xl">🚗</div>
            {/* Add another row for more objects */}
            <div className="w-16 h-16 bg-teal-500 rounded-md flex items-center justify-center text-2xl">📚</div>
            <div className="w-16 h-16 bg-indigo-500 rounded-md flex items-center justify-center text-2xl">⚽</div>
          </div>
          
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className={`w-20 h-10 text-center border ${error ? 'border-game-error' : 'border-gray-300'} rounded-md`}
              placeholder="?"
            />
            
            <Button type="submit" className="bg-game-primary hover:bg-game-primary/90">
              Submit
            </Button>
          </form>
          
          {error && (
            <p className="text-game-error mt-4 animate-wiggle">
              That's not correct!
            </p>
          )}
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={8} />}
    </>
  );
};

export default CountLevel;
