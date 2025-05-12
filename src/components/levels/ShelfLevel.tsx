
import React, { useState } from 'react';
import LevelLayout from '../LevelLayout';
import { getLevelById } from '@/data/levelData';
import LevelComplete from '../LevelComplete';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';

interface ShelfItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const ShelfLevel = () => {
  const levelData = getLevelById(39)!;
  const { completeLevel } = useGame();
  const [completed, setCompleted] = useState(false);
  
  // The items should spell "PUZZLE" when arranged correctly
  const initialItems: ShelfItem[] = [
    { id: "item1", name: "Umbrella", emoji: "☂️", color: "bg-blue-200" },
    { id: "item2", name: "Zebra Toy", emoji: "🦓", color: "bg-gray-200" },
    { id: "item3", name: "Lamp", emoji: "💡", color: "bg-yellow-200" },
    { id: "item4", name: "Envelope", emoji: "✉️", color: "bg-red-200" },
    { id: "item5", name: "Plant", emoji: "🌱", color: "bg-green-200" },
    { id: "item6", name: "Pen", emoji: "🖊️", color: "bg-purple-200" },
  ];
  
  // The correct order: P-U-Z-Z-L-E
  const correctOrder = ["item5", "item1", "item2", "item2", "item3", "item4"];
  
  const [items, setItems] = useState<ShelfItem[]>(shuffleArray([...initialItems]));
  const [shelfItems, setShelfItems] = useState<(ShelfItem | null)[]>(Array(6).fill(null));
  
  function shuffleArray(array: ShelfItem[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  
  const handleDragStart = (item: ShelfItem) => {
    // Implementation for drag start
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // If dragging from items list to shelf
    if (source.droppableId === 'items' && destination.droppableId === 'shelf') {
      const newItems = [...items];
      const item = newItems.splice(source.index, 1)[0];
      
      const newShelfItems = [...shelfItems];
      newShelfItems[destination.index] = item;
      
      setItems(newItems);
      setShelfItems(newShelfItems);
    }
    // If rearranging on the shelf
    else if (source.droppableId === 'shelf' && destination.droppableId === 'shelf') {
      const newShelfItems = [...shelfItems];
      const [item] = newShelfItems.splice(source.index, 1);
      newShelfItems.splice(destination.index, 0, item);
      
      setShelfItems(newShelfItems);
    }
    // If removing from shelf back to items
    else if (source.droppableId === 'shelf' && destination.droppableId === 'items') {
      const newShelfItems = [...shelfItems];
      const item = newShelfItems[source.index];
      newShelfItems[source.index] = null;
      
      if (item) {
        setItems([...items, item]);
      }
      
      setShelfItems(newShelfItems);
    }
    
    // Check if arrangement is correct
    checkShelfArrangement();
  };
  
  // Simplified for this example - just comparing the first letters
  const checkShelfArrangement = () => {
    const filledShelf = shelfItems.filter(item => item !== null) as ShelfItem[];
    
    if (filledShelf.length === 6) {
      const word = filledShelf.map(item => item.name[0]).join('');
      
      if (word.toLowerCase() === 'puzzle') {
        completeLevel(levelData.id);
        setCompleted(true);
      }
    }
  };
  
  const handleItemClick = (item: ShelfItem) => {
    // Find the first empty slot on the shelf
    const emptyIndex = shelfItems.findIndex(slot => slot === null);
    if (emptyIndex !== -1) {
      const newItems = items.filter(i => i.id !== item.id);
      const newShelfItems = [...shelfItems];
      newShelfItems[emptyIndex] = item;
      
      setItems(newItems);
      setShelfItems(newShelfItems);
      
      // Check if arrangement is correct
      setTimeout(() => {
        checkShelfArrangement();
      }, 100);
    }
  };
  
  const handleShelfItemClick = (index: number) => {
    const item = shelfItems[index];
    if (item) {
      const newShelfItems = [...shelfItems];
      newShelfItems[index] = null;
      
      setItems([...items, item]);
      setShelfItems(newShelfItems);
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
          {/* The shelf */}
          <div className="w-full max-w-md mb-8">
            <div className="bg-amber-800 h-8 rounded-t-md w-full"></div>
            <div className="flex justify-around p-4 bg-amber-600 rounded-b-md">
              {shelfItems.map((item, index) => (
                <div 
                  key={`shelf-${index}`} 
                  className={`w-12 h-16 ${item ? item.color : 'bg-amber-500'} rounded-md flex items-center justify-center cursor-pointer shadow-md`}
                  onClick={() => handleShelfItemClick(index)}
                >
                  {item && (
                    <div className="text-2xl">{item.emoji}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Available items */}
          <div className="flex flex-wrap justify-center gap-4">
            {items.map((item, index) => (
              <motion.div
                key={`item-${index}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`${item.color} w-16 h-16 rounded-md flex flex-col items-center justify-center cursor-pointer shadow-md`}
                onClick={() => handleItemClick(item)}
              >
                <div className="text-2xl">{item.emoji}</div>
                <div className="text-xs mt-1 text-center">{item.name}</div>
              </motion.div>
            ))}
          </div>
          
          {completed && (
            <div className="mt-6 text-green-600 font-bold text-lg animate-pulse">
              Perfect! You solved the PUZZLE!
            </div>
          )}
        </div>
      </LevelLayout>
      
      {completed && <LevelComplete level={levelData.id} />}
    </>
  );
};

export default ShelfLevel;
