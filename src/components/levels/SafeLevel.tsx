
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SafeLevel = () => {
  const levelData = getLevelById(6)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  
  const correctCode = '4213';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === correctCode) {
      completeLevel(6);
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
        <div className="flex flex-col items-center">
          <div className="w-64 h-80 bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="w-full text-center mb-4">
              <span className="text-red-500">4</span>
              <span className="text-white"> Open </span>
              <span className="text-yellow-500">2</span>
              <span className="text-white"> The </span>
              <span className="text-blue-500">1</span>
              <span className="text-white"> Safe </span>
              <span className="text-green-500">3</span>
            </div>
            
            <div className="w-full h-12 bg-gray-900 text-green-500 mb-6 flex items-center justify-center text-2xl font-mono">
              {code || '____'}
            </div>
            
            <form onSubmit={handleSubmit} className="w-full">
              <Input
                type="password"
                maxLength={4}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`mb-4 bg-gray-800 text-white text-center ${error ? 'border-red-500' : ''}`}
                placeholder="Enter 4-digit code"
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gray-500 hover:bg-gray-600"
              >
                Unlock
              </Button>
            </form>
          </div>
          
          {error && (
            <p className="text-game-error mt-4 animate-wiggle">
              Incorrect code!
            </p>
          )}
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={6} />}
    </>
  );
};

export default SafeLevel;
