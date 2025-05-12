
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

const KeyLevel = () => {
  const levelData = getLevelById(20)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [keyFound, setKeyFound] = useState(false);
  
  // The key is hidden in the spacing in the description
  const handleClick = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;
    
    // Check if clicking on the door when key is found
    if (element.classList.contains('door') && keyFound) {
      setDoorOpen(true);
      completeLevel(20);
      setCompleted(true);
      return;
    }
    
    // Check if clicked on the hidden key
    if (element.classList.contains('hidden-key')) {
      setKeyFound(true);
    }
  };
  
  // Split the description to hide a key in the spacing
  const descriptionParts = [
    "Find the key",
    " to unlock ",
    "the door."
  ];
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description=""
        hint={levelData.hint}
      >
        <div className="w-full h-64 flex flex-col items-center">
          {/* Custom description with hidden key */}
          <p className="mb-6 text-center">
            {descriptionParts[0]}
            <span className="hidden-key relative cursor-pointer" onClick={handleClick}>
              {" "}
              <span className="absolute top-0 left-0 opacity-5 text-yellow-500 select-none">🔑</span>
              {"  "}
            </span>
            {descriptionParts[1]}
            <span>
              {descriptionParts[2]}
            </span>
          </p>
          
          {/* Door */}
          <div 
            className={`w-32 h-56 ${doorOpen ? 'bg-black' : 'bg-amber-800'} rounded-t-lg relative door cursor-pointer ${keyFound ? 'hover:bg-amber-700' : ''}`}
            onClick={handleClick}
          >
            {/* Door handle */}
            <div className="absolute right-3 top-1/2 w-3 h-6 bg-yellow-600 rounded-full"></div>
            
            {/* Keyhole */}
            <div className="absolute right-3 top-[60%] w-3 h-3 bg-black rounded-full"></div>
            
            {doorOpen && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white">You made it!</p>
              </div>
            )}
          </div>
          
          {/* Show key in inventory if found */}
          {keyFound && !doorOpen && (
            <div className="mt-4 bg-gray-100 p-2 rounded">
              <div className="text-yellow-500 text-xl">🔑</div>
              <p className="text-xs mt-1">Click on the door to use the key</p>
            </div>
          )}
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={20} />}
    </>
  );
};

export default KeyLevel;
