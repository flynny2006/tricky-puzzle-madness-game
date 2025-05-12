
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLevelById } from '@/data/levelData';
import { useGame } from '@/context/GameContext';
import LoadingLevel from '@/components/levels/LoadingLevel';

// Import all level components
import DuckLevel from '@/components/levels/DuckLevel';
import FindButtonLevel from '@/components/levels/FindButtonLevel';
import MathLevel from '@/components/levels/MathLevel';
import LightLevel from '@/components/levels/LightLevel';
import ExitLevel from '@/components/levels/ExitLevel';
import SafeLevel from '@/components/levels/SafeLevel';
import MouseLevel from '@/components/levels/MouseLevel';
import CountLevel from '@/components/levels/CountLevel';
import MazeLevel from '@/components/levels/MazeLevel';
import SwitchLevel from '@/components/levels/SwitchLevel';

// More level components
import PhoneLevel from '@/components/levels/PhoneLevel';
import FireLevel from '@/components/levels/FireLevel';
import DifferenceLevel from '@/components/levels/DifferenceLevel';
import BoxesLevel from '@/components/levels/BoxesLevel';
import PuzzleLevel from '@/components/levels/PuzzleLevel';
import CounterLevel from '@/components/levels/CounterLevel';
import CatLevel from '@/components/levels/CatLevel';
import LightsLevel from '@/components/levels/LightsLevel';
import ChargeLevel from '@/components/levels/ChargeLevel';
import KeyLevel from '@/components/levels/KeyLevel';

// Even more level components
import ScaleLevel from '@/components/levels/ScaleLevel';
import FogLevel from '@/components/levels/FogLevel';
import MessageLevel from '@/components/levels/MessageLevel';
import RiddleLevel from '@/components/levels/RiddleLevel';
import RainbowLevel from '@/components/levels/RainbowLevel';
import TargetLevel from '@/components/levels/TargetLevel';
import PlantLevel from '@/components/levels/PlantLevel';
import RiverLevel from '@/components/levels/RiverLevel';
import CodeLevel from '@/components/levels/CodeLevel';
import BombLevel from '@/components/levels/BombLevel';

// Final levels
import RadioLevel from '@/components/levels/RadioLevel';
import StarsLevel from '@/components/levels/StarsLevel';
import EquationLevel from '@/components/levels/EquationLevel';
import BridgeLevel from '@/components/levels/BridgeLevel';
import CelebrationLevel from '@/components/levels/CelebrationLevel';

// New levels
import SunriseLevel from '@/components/levels/SunriseLevel';
import ClockLevel from '@/components/levels/ClockLevel';
import PasswordLevel from '@/components/levels/PasswordLevel';
import ShelfLevel from '@/components/levels/ShelfLevel';
import RoomLevel from '@/components/levels/RoomLevel';

const levelComponents = {
  DuckLevel,
  FindButtonLevel,
  MathLevel,
  LightLevel,
  ExitLevel,
  SafeLevel,
  MouseLevel,
  CountLevel,
  MazeLevel,
  SwitchLevel,
  PhoneLevel,
  FireLevel,
  DifferenceLevel,
  BoxesLevel,
  PuzzleLevel,
  CounterLevel,
  CatLevel,
  LightsLevel,
  ChargeLevel,
  KeyLevel,
  ScaleLevel,
  FogLevel,
  MessageLevel,
  RiddleLevel,
  RainbowLevel,
  TargetLevel,
  PlantLevel,
  RiverLevel,
  CodeLevel,
  BombLevel,
  RadioLevel,
  StarsLevel,
  EquationLevel,
  BridgeLevel,
  CelebrationLevel,
  SunriseLevel,
  ClockLevel,
  PasswordLevel,
  ShelfLevel,
  RoomLevel,
};

const LevelPage = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { isLevelLocked, gameState } = useGame();
  const [loading, setLoading] = React.useState(true);

  const levelIdNumber = parseInt(levelId || '1', 10);
  const levelData = getLevelById(levelIdNumber);

  useEffect(() => {
    if (!levelId || isNaN(levelIdNumber)) {
      navigate('/levels');
      return;
    }

    // Check if level is valid and not locked
    if (!levelData || isLevelLocked(levelIdNumber)) {
      navigate('/levels');
      return;
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [levelId, levelIdNumber, navigate, levelData, isLevelLocked]);

  if (loading) {
    return <LoadingLevel level={levelIdNumber} />;
  }

  if (!levelData) {
    navigate('/levels');
    return null;
  }

  // Dynamically select the correct level component
  const LevelComponent = levelComponents[levelData.component as keyof typeof levelComponents];

  if (!LevelComponent) {
    console.error(`Level component not found: ${levelData.component}`);
    navigate('/levels');
    return null;
  }

  return <LevelComponent />;
};

export default LevelPage;
