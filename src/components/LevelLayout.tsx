
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import HintDialog from './HintDialog';

interface LevelLayoutProps {
  children: React.ReactNode;
  levelId: number;
  title: string;
  description: string;
  hint: string;
}

const LevelLayout: React.FC<LevelLayoutProps> = ({
  children,
  levelId,
  title,
  description,
  hint,
}) => {
  const navigate = useNavigate();
  const [hintOpen, setHintOpen] = React.useState(false);
  
  const handleBack = () => {
    navigate('/levels');
  };
  
  return (
    <div className="game-container px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <Button 
          onClick={handleBack} 
          variant="outline"
          className="border-game-primary text-game-primary hover:bg-game-primary/10"
        >
          Back
        </Button>
        <h1 className="text-xl font-bold text-game-primary">Level {levelId}</h1>
        <Button 
          onClick={() => setHintOpen(true)}
          className="bg-game-accent text-white hover:bg-game-accent/90"
        >
          Hint
        </Button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-md min-h-[300px] flex flex-col items-center justify-center relative">
        {children}
      </div>
      
      <HintDialog
        open={hintOpen}
        setOpen={setHintOpen}
        level={levelId}
        hint={hint}
      />
    </div>
  );
};

export default LevelLayout;
