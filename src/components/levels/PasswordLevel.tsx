
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PasswordLevel = () => {
  const levelData = getLevelById(38)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  
  const correctPassword = "5318008"; // Spells "BOOBIES" when turned upside down (classic calculator joke)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      completeLevel(levelData.id);
      setCompleted(true);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
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
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="text-center mb-8">
            <p className="mb-8">Enter the password to continue:</p>
            <div className="p-4 bg-gray-100 rounded-md text-2xl font-mono mb-6 rotate-180">
              5318008
            </div>
            <p className="text-sm text-gray-600">
              (Hint: Sometimes you need to look at things from a different perspective)
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`text-center ${showError ? 'border-red-500' : ''}`}
              />
              
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
          
          {showError && (
            <p className="mt-4 text-red-500 animate-pulse">
              Incorrect password!
            </p>
          )}
          
          {completed && (
            <p className="mt-4 text-green-600 font-bold">
              Password accepted!
            </p>
          )}
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={levelData.id} />}
    </>
  );
};

export default PasswordLevel;
