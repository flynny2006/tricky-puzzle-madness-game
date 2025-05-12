
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';

interface HintDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  level: number;
  hint: string;
}

const HintDialog: React.FC<HintDialogProps> = ({ open, setOpen, level, hint }) => {
  const { useHint, hasUsedHint } = useGame();
  const [showHint, setShowHint] = React.useState(false);
  const alreadyUsed = hasUsedHint(level);

  const handleUseHint = () => {
    useHint(level);
    setShowHint(true);
  };

  React.useEffect(() => {
    if (open && alreadyUsed) {
      setShowHint(true);
    } else {
      setShowHint(false);
    }
  }, [open, alreadyUsed]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Need a hint?</DialogTitle>
          <DialogDescription>
            {!showHint && !alreadyUsed ? (
              "Sometimes you need to think outside the box!"
            ) : null}
          </DialogDescription>
        </DialogHeader>
        
        {showHint || alreadyUsed ? (
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold">{hint}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center p-6">
            <p className="text-center text-sm">
              Are you sure you want to see the hint?
            </p>
            <Button onClick={handleUseHint} className="w-full bg-game-accent hover:bg-game-accent/90">
              Show Hint
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HintDialog;
