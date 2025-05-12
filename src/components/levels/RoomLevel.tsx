
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';

const RoomLevel = () => {
  const levelData = getLevelById(40)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [pictureRemoved, setPictureRemoved] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  
  const handlePictureClick = () => {
    if (!pictureRemoved) {
      setPictureRemoved(true);
    }
  };
  
  const handleKeyClick = () => {
    if (pictureRemoved && !hasKey) {
      setHasKey(true);
    }
  };
  
  const handleDoorClick = () => {
    if (hasKey && !doorOpen) {
      setDoorOpen(true);
      completeLevel(levelData.id);
      setCompleted(true);
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
        <div className="w-full h-64 bg-gray-200 rounded-md relative overflow-hidden">
          {/* Room walls and floor */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-400" />
          
          {/* Floor */}
          <div className="absolute bottom-0 w-full h-16 bg-amber-800" />
          
          {/* Left Wall Pattern (actually a hidden door) */}
          <div 
            className={`absolute left-4 top-12 h-32 w-16 ${doorOpen ? 'bg-black' : 'bg-gray-300'} cursor-pointer`}
            onClick={handleDoorClick}
          >
            {!doorOpen && (
              <div className="grid grid-cols-2 h-full w-full">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="border border-gray-400"></div>
                ))}
              </div>
            )}
            
            {hasKey && !doorOpen && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500">
                Try me
              </div>
            )}
          </div>
          
          {/* Picture frame on wall */}
          {!pictureRemoved ? (
            <motion.div 
              className="absolute right-10 top-8 w-20 h-16 bg-amber-100 rounded shadow-md border-4 border-amber-800 cursor-pointer"
              onClick={handlePictureClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-lg">🏞️</div>
              </div>
            </motion.div>
          ) : (
            <div className="absolute right-10 top-8 w-20 h-16 bg-gray-300 rounded">
              {/* Empty wall space where picture was */}
              {!hasKey && (
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500"
                  onClick={handleKeyClick}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <div className="text-xs">🔑</div>
                </motion.div>
              )}
            </div>
          )}
          
          {/* Show key in inventory if collected */}
          {hasKey && (
            <div className="absolute bottom-4 right-4 bg-gray-800 rounded-lg p-2">
              <div className="text-xl">🔑</div>
            </div>
          )}
          
          {/* Success message when door opens */}
          {doorOpen && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                <p className="text-lg font-bold text-green-600">You escaped!</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-gray-600">
          {pictureRemoved && !hasKey && "There's something behind the picture!"}
          {hasKey && !doorOpen && "You found a key! What can it open?"}
          {doorOpen && "Freedom at last!"}
          {!pictureRemoved && "Look around the room for clues..."}
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={levelData.id} />}
    </>
  );
};

export default RoomLevel;
