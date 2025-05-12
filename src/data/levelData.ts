
export interface LevelData {
  id: number;
  title: string;
  description: string;
  hint: string;
  solution?: string; // Optional detailed solution (not shown to users)
  component: string; // The component name to render
}

const levelData: LevelData[] = [
  {
    id: 1,
    title: "Tap the Duck",
    description: "Tap the duck to proceed.",
    hint: "Maybe the duck isn't what you think it is. Look at the entire screen carefully.",
    solution: "Tap the word 'duck' in the description, not the duck image.",
    component: "DuckLevel"
  },
  {
    id: 2,
    title: "Find the Button",
    description: "Find the hidden button to proceed.",
    hint: "It could be invisible or very small. Check the corners!",
    solution: "A tiny button is hidden in the bottom right corner.",
    component: "FindButtonLevel"
  },
  {
    id: 3,
    title: "Solve 3 + 3",
    description: "What is 3 + 3?",
    hint: "Don't overthink it. The answer might be different from what you expect.",
    solution: "The answer is 8, not 6. The level is about tricking expectations.",
    component: "MathLevel"
  },
  {
    id: 4,
    title: "Turn on the Light",
    description: "Find a way to turn on the light.",
    hint: "Sometimes you need to physically interact with your device.",
    solution: "Shake your phone/device to turn on the light.",
    component: "LightLevel"
  },
  {
    id: 5,
    title: "Find the Exit",
    description: "Find the exit to proceed.",
    hint: "Try looking at things from a different angle.",
    solution: "Rotate your device to reveal the hidden exit.",
    component: "ExitLevel"
  },
  {
    id: 6,
    title: "Open the Safe",
    description: "Open the safe by finding the correct code.",
    hint: "The code is hidden somewhere on the screen.",
    solution: "The code is in the level title's styling/colors.",
    component: "SafeLevel"
  },
  {
    id: 7,
    title: "Catch the Mouse",
    description: "Catch the mouse to proceed.",
    hint: "You'll need to be quick or think of an alternative way.",
    solution: "Click outside the mouse area to trap it.",
    component: "MouseLevel"
  },
  {
    id: 8,
    title: "Count the Objects",
    description: "How many objects are there?",
    hint: "Don't forget to count everything, including UI elements.",
    solution: "The count includes the question mark and other UI elements.",
    component: "CountLevel"
  },
  {
    id: 9,
    title: "Escape the Maze",
    description: "Find your way through the invisible maze.",
    hint: "Use your finger to trace a path. The maze has invisible walls.",
    solution: "The correct path is along the top and right edges.",
    component: "MazeLevel"
  },
  {
    id: 10,
    title: "Flip the Switch",
    description: "Find a way to flip the switch.",
    hint: "You might need to use more than just tapping.",
    solution: "Hold and drag the switch instead of tapping it.",
    component: "SwitchLevel"
  },
  {
    id: 11,
    title: "Unlock Your Phone",
    description: "Unlock the phone with the pattern.",
    hint: "The pattern might be visible somewhere else on the screen.",
    solution: "The unlock pattern is visible in the background design.",
    component: "PhoneLevel"
  },
  {
    id: 12,
    title: "Put Out the Fire",
    description: "Put out the fire to proceed.",
    hint: "Think about how you'd put out a real fire.",
    solution: "Blow into your device's microphone to put out the fire.",
    component: "FireLevel"
  },
  {
    id: 13,
    title: "Find the Difference",
    description: "Find the difference between these two images.",
    hint: "There might be more differences than you think.",
    solution: "The difference is in the URL or title, not in the images.",
    component: "DifferenceLevel"
  },
  {
    id: 14,
    title: "Which Box Has the Prize?",
    description: "Choose the box with the prize.",
    hint: "The hint might be in the way the boxes are presented.",
    solution: "Multiple clicks are required. The prize moves between boxes.",
    component: "BoxesLevel"
  },
  {
    id: 15,
    title: "Solve the Puzzle",
    description: "Rearrange the pieces to solve the puzzle.",
    hint: "Not all pieces need to be moved.",
    solution: "Only move the pieces that are actually movable.",
    component: "PuzzleLevel"
  },
  {
    id: 16,
    title: "Press the Button 10 Times",
    description: "Press the button exactly 10 times to proceed.",
    hint: "The count might not be what it seems.",
    solution: "The counter sometimes counts down instead of up.",
    component: "CounterLevel"
  },
  {
    id: 17,
    title: "Feed the Cat",
    description: "Feed the hungry cat.",
    hint: "Look for food items on the screen.",
    solution: "Drag the fish from elsewhere on the screen to the cat.",
    component: "CatLevel"
  },
  {
    id: 18,
    title: "Turn the Lights On",
    description: "Find a way to turn on all the lights.",
    hint: "The pattern of light switches matters.",
    solution: "The light switches affect adjacent lights in a specific pattern.",
    component: "LightsLevel"
  },
  {
    id: 19,
    title: "Charge the Phone",
    description: "Your phone is out of battery. Charge it.",
    hint: "Think about how you charge a real phone.",
    solution: "Connect your device to a charger, or tap specific areas.",
    component: "ChargeLevel"
  },
  {
    id: 20,
    title: "Find the Key",
    description: "Find the key to unlock the door.",
    hint: "The key might not look like a traditional key.",
    solution: "The key is hidden in the level's description spacing.",
    component: "KeyLevel"
  },
  {
    id: 21,
    title: "Balance the Scale",
    description: "Balance the scale to proceed.",
    hint: "You can drag and drop weights.",
    solution: "Some weights are heavier than they appear.",
    component: "ScaleLevel"
  },
  {
    id: 22,
    title: "Clear the Fog",
    description: "Clear the fog to see what's underneath.",
    hint: "Try using gestures like you would to clear real fog.",
    solution: "Rub the screen quickly to generate heat and clear the fog.",
    component: "FogLevel"
  },
  {
    id: 23,
    title: "Find the Hidden Message",
    description: "There's a hidden message. Can you find it?",
    hint: "Try changing your perspective or the lighting.",
    solution: "Tilt your device to see the hidden message in the shadows.",
    component: "MessageLevel"
  },
  {
    id: 24,
    title: "Solve the Riddle",
    description: "I'm tall when I'm young and short when I'm old. What am I?",
    hint: "Think of things that change height as they age or get used.",
    solution: "The answer is 'candle' - drag the candle to the answer box.",
    component: "RiddleLevel"
  },
  {
    id: 25,
    title: "Color the Rainbow",
    description: "Color the rainbow with the correct colors.",
    hint: "The right order matters. Think about natural rainbows.",
    solution: "The colors must be in the correct rainbow order (ROYGBIV).",
    component: "RainbowLevel"
  },
  {
    id: 26,
    title: "Hit the Target",
    description: "Hit the bullseye to proceed.",
    hint: "Sometimes aiming isn't enough.",
    solution: "The target moves - predict its movement or find another way.",
    component: "TargetLevel"
  },
  {
    id: 27,
    title: "Water the Plant",
    description: "The plant needs water to grow.",
    hint: "You need to find a water source first.",
    solution: "Create water by dragging the cloud over the plant.",
    component: "PlantLevel"
  },
  {
    id: 28,
    title: "Cross the River",
    description: "Help the chicken, fox, and grain cross the river.",
    hint: "Be careful what you leave together unattended.",
    solution: "Classic river crossing puzzle - don't leave fox with chicken or chicken with grain.",
    component: "RiverLevel"
  },
  {
    id: 29,
    title: "Crack the Code",
    description: "Enter the correct sequence to proceed.",
    hint: "The pattern repeats throughout the level.",
    solution: "The code is visible in the background pattern sequences.",
    component: "CodeLevel"
  },
  {
    id: 30,
    title: "Defuse the Bomb",
    description: "The bomb will explode! Defuse it quickly!",
    hint: "Cutting the right wire matters, but which one?",
    solution: "Read the manual hidden elsewhere in the level.",
    component: "BombLevel"
  },
  {
    id: 31,
    title: "Tune the Radio",
    description: "Find the right frequency to proceed.",
    hint: "Listen carefully for clues as you adjust.",
    solution: "The correct frequency is hinted at by background elements.",
    component: "RadioLevel"
  },
  {
    id: 32,
    title: "Arrange the Stars",
    description: "Arrange the stars in the correct constellation.",
    hint: "Look for a pattern guide somewhere in the level.",
    solution: "The constellation pattern is faintly visible in the background.",
    component: "StarsLevel"
  },
  {
    id: 33,
    title: "Solve the Equation",
    description: "Solve for x: 3x + 5 = 20",
    hint: "The solution is not as straightforward as it seems.",
    solution: "The solution involves manipulating the equation itself.",
    component: "EquationLevel"
  },
  {
    id: 34,
    title: "Build the Bridge",
    description: "Help the character cross the gap.",
    hint: "You'll need to create a path using available materials.",
    solution: "Drag items from inventory to create a proper bridge structure.",
    component: "BridgeLevel"
  },
  {
    id: 35,
    title: "Celebration!",
    description: "You've made it to the end! Celebrate!",
    hint: "Show your excitement!",
    solution: "Simply tap repeatedly on the screen to celebrate.",
    component: "CelebrationLevel"
  },
];

export default levelData;

// Helper function to get level data by ID
export const getLevelById = (id: number): LevelData | undefined => {
  return levelData.find(level => level.id === id);
};
