
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GameState {
  currentLevel: number;
  maxLevel: number;
  completedLevels: number[];
  hintsUsed: Record<number, boolean>;
  totalLevels: number;
}

interface GameContextType {
  gameState: GameState;
  completeLevel: (level: number) => void;
  resetProgress: () => void;
  useHint: (level: number) => void;
  hasUsedHint: (level: number) => boolean;
  isLevelCompleted: (level: number) => boolean;
  isLevelLocked: (level: number) => boolean;
  goToLevel: (level: number) => void;
  nextLevel: () => void;
}

const defaultGameState: GameState = {
  currentLevel: 1,
  maxLevel: 1,
  completedLevels: [],
  hintsUsed: {},
  totalLevels: 35,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  
  // Load game state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem('brainOutGameState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setGameState(parsedState);
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('brainOutGameState', JSON.stringify(gameState));
  }, [gameState]);

  const completeLevel = (level: number) => {
    setGameState(prev => {
      // Only add to completed levels if not already completed
      const newCompletedLevels = prev.completedLevels.includes(level) 
        ? prev.completedLevels 
        : [...prev.completedLevels, level];
      
      // Update max level if this completion would unlock a new level
      const newMaxLevel = Math.max(prev.maxLevel, level + 1);
      
      return {
        ...prev,
        completedLevels: newCompletedLevels,
        maxLevel: newMaxLevel > prev.totalLevels ? prev.totalLevels : newMaxLevel
      };
    });
  };

  const resetProgress = () => {
    setGameState(defaultGameState);
    localStorage.removeItem('brainOutGameState');
  };

  const useHint = (level: number) => {
    setGameState(prev => ({
      ...prev,
      hintsUsed: { ...prev.hintsUsed, [level]: true }
    }));
  };

  const hasUsedHint = (level: number) => {
    return !!gameState.hintsUsed[level];
  };

  const isLevelCompleted = (level: number) => {
    return gameState.completedLevels.includes(level);
  };

  const isLevelLocked = (level: number) => {
    return level > gameState.maxLevel;
  };

  const goToLevel = (level: number) => {
    if (level <= gameState.maxLevel) {
      setGameState(prev => ({
        ...prev,
        currentLevel: level
      }));
    }
  };

  const nextLevel = () => {
    setGameState(prev => {
      const nextLevel = prev.currentLevel + 1;
      return {
        ...prev,
        currentLevel: nextLevel <= prev.totalLevels ? nextLevel : prev.currentLevel
      };
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        completeLevel,
        resetProgress,
        useHint,
        hasUsedHint,
        isLevelCompleted,
        isLevelLocked,
        goToLevel,
        nextLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
