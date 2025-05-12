
import React from 'react';

interface LoadingLevelProps {
  level: number;
}

const LoadingLevel: React.FC<LoadingLevelProps> = ({ level }) => {
  return (
    <div className="game-container flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Loading Level {level}</h1>
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-game-primary animate-pulse-light rounded-full"></div>
        </div>
      </div>
      
      <div className="w-24 h-24 border-4 border-game-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-6 text-gray-600">Preparing your challenge...</p>
    </div>
  );
};

export default LoadingLevel;
