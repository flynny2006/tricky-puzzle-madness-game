
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';

const MazeLevel = () => {
  const levelData = getLevelById(9)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [hitWall, setHitWall] = useState(false);
  
  // Define the invisible maze walls
  const walls = [
    { x1: 50, y1: 0, x2: 50, y2: 100 },
    { x1: 50, y1: 100, x2: 100, y2: 100 },
    { x1: 100, y1: 100, x2: 100, y2: 50 },
    { x1: 100, y1: 50, x2: 150, y2: 50 },
    { x1: 150, y1: 50, x2: 150, y2: 150 },
    { x1: 150, y1: 150, x2: 200, y2: 150 },
    { x1: 50, y1: 150, x2: 50, y2: 200 },
    { x1: 50, y1: 200, x2: 200, y2: 200 },
  ];
  
  // Define the goal
  const goal = { x: 250, y: 150, radius: 15 };
  
  const checkCollision = (x: number, y: number) => {
    for (const wall of walls) {
      // Check if point is close to wall line segment
      const distToWall = distToLineSegment(x, y, wall.x1, wall.y1, wall.x2, wall.y2);
      if (distToWall < 10) {
        return true;
      }
    }
    return false;
  };
  
  // Check if point has reached the goal
  const checkGoal = (x: number, y: number) => {
    const dx = x - goal.x;
    const dy = y - goal.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < goal.radius;
  };
  
  // Calculate distance from point to line segment
  const distToLineSegment = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) param = dot / lenSq;
    
    let xx, yy;
    
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
    
    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    updatePosition(e);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    updatePosition(e);
  };
  
  const handleMouseUp = () => {
    setIsDrawing(false);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDrawing(true);
    updateTouchPosition(e);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing) return;
    updateTouchPosition(e);
  };
  
  const handleTouchEnd = () => {
    setIsDrawing(false);
  };
  
  const updatePosition = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check for wall collision
    if (checkCollision(x, y)) {
      setHitWall(true);
      setPosition({ x: 20, y: 20 });
      setTimeout(() => setHitWall(false), 1000);
      return;
    }
    
    // Check for goal
    if (checkGoal(x, y)) {
      completeLevel(9);
      setCompleted(true);
      return;
    }
    
    setPosition({ x, y });
  };
  
  const updateTouchPosition = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // Check for wall collision
    if (checkCollision(x, y)) {
      setHitWall(true);
      setPosition({ x: 20, y: 20 });
      setTimeout(() => setHitWall(false), 1000);
      return;
    }
    
    // Check for goal
    if (checkGoal(x, y)) {
      completeLevel(9);
      setCompleted(true);
      return;
    }
    
    setPosition({ x, y });
  };
  
  return (
    <>
      <LevelLayout
        levelId={levelData.id}
        title={levelData.title}
        description={levelData.description}
        hint={levelData.hint}
      >
        <div 
          className="w-full h-64 bg-white border-2 border-gray-300 relative"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Start point */}
          <div className="absolute w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white"
            style={{ left: '20px', top: '20px' }}>
            S
          </div>
          
          {/* End point / Goal */}
          <div className="absolute w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white"
            style={{ left: `${goal.x - 15}px`, top: `${goal.y - 15}px` }}>
            E
          </div>
          
          {/* Player cursor */}
          {!hitWall && (
            <div 
              className="absolute w-4 h-4 bg-red-500 rounded-full"
              style={{ 
                left: `${position.x - 2}px`, 
                top: `${position.y - 2}px`,
                transition: isDrawing ? 'none' : 'all 0.1s ease-out'
              }}
            ></div>
          )}
          
          {/* Only show walls when hit (as a hint) */}
          {hitWall && walls.map((wall, i) => (
            <div 
              key={i}
              className="absolute bg-red-300"
              style={{
                left: `${Math.min(wall.x1, wall.x2)}px`,
                top: `${Math.min(wall.y1, wall.y2)}px`,
                width: `${Math.abs(wall.x2 - wall.x1) || 2}px`,
                height: `${Math.abs(wall.y2 - wall.y1) || 2}px`,
                opacity: 0.5
              }}
            ></div>
          ))}
        </div>
        
        {hitWall && (
          <p className="text-game-error mt-4 animate-wiggle">
            You hit a wall! Start over.
          </p>
        )}
      </LevelLayout>
      
      {completed && <LevelComplete level={9} />}
    </>
  );
};

export default MazeLevel;
