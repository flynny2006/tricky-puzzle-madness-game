
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
    hint: "The word 'duck' might be more important than the image. Read the text carefully and look for clickable elements.",
    solution: "Tap the word 'duck' in the description, not the duck image.",
    component: "DuckLevel"
  },
  {
    id: 2,
    title: "Find the Button",
    description: "Find the hidden button to proceed.",
    hint: "Check the corners of the screen carefully. The button is there but might be almost invisible or very tiny.",
    solution: "A tiny button is hidden in the bottom right corner.",
    component: "FindButtonLevel"
  },
  {
    id: 3,
    title: "Solve 3 + 3",
    description: "What is 3 + 3?",
    hint: "This is a trick question. In this puzzle world, math doesn't always follow the rules you expect. Try different answers.",
    solution: "The answer is 8, not 6. The level is about tricking expectations.",
    component: "MathLevel"
  },
  {
    id: 4,
    title: "Turn on the Light",
    description: "Find a way to turn on the light.",
    hint: "Try physically interacting with your device in different ways. Think about how you'd turn on a real light that won't respond to tapping.",
    solution: "Shake your phone/device to turn on the light.",
    component: "LightLevel"
  },
  {
    id: 5,
    title: "Find the Exit",
    description: "Find the exit to proceed.",
    hint: "Sometimes changing your perspective reveals new paths. Try rotating your device to see what happens.",
    solution: "Rotate your device to reveal the hidden exit.",
    component: "ExitLevel"
  },
  {
    id: 6,
    title: "Open the Safe",
    description: "Open the safe by finding the correct code.",
    hint: "The colors in the title text hold the key to unlocking the safe. Notice the sequence of colored numbers and words.",
    solution: "The code is in the level title's styling/colors.",
    component: "SafeLevel"
  },
  {
    id: 7,
    title: "Catch the Mouse",
    description: "Catch the mouse to proceed.",
    hint: "The mouse is too quick to catch directly. Think about how to trap it rather than catching it directly.",
    solution: "Click outside the mouse area to trap it.",
    component: "MouseLevel"
  },
  {
    id: 8,
    title: "Count the Objects",
    description: "How many objects are there?",
    hint: "Count EVERYTHING on the screen, including interface elements and objects that might not seem part of the puzzle at first.",
    solution: "The count includes the question mark and other UI elements.",
    component: "CountLevel"
  },
  {
    id: 9,
    title: "Escape the Maze",
    description: "Find your way through the invisible maze.",
    hint: "Trace carefully with your finger. There might be a pattern to the walls - try following the edges of the screen first.",
    solution: "The correct path is along the top and right edges.",
    component: "MazeLevel"
  },
  {
    id: 10,
    title: "Flip the Switch",
    description: "Find a way to flip the switch.",
    hint: "Tapping might not be enough. Try holding and dragging instead - like you would with a real switch.",
    solution: "Hold and drag the switch instead of tapping it.",
    component: "SwitchLevel"
  },
  {
    id: 11,
    title: "Unlock Your Phone",
    description: "Unlock the phone with the pattern.",
    hint: "Look at the background design carefully. The pattern is hidden somewhere - it might be in lines, dots, or shapes on the screen.",
    solution: "The unlock pattern is visible in the background design.",
    component: "PhoneLevel"
  },
  {
    id: 12,
    title: "Put Out the Fire",
    description: "Put out the fire to proceed.",
    hint: "How would you put out a real candle? Your device has capabilities you might not be using - like the microphone.",
    solution: "Blow into your device's microphone to put out the fire.",
    component: "FireLevel"
  },
  {
    id: 13,
    title: "Find the Difference",
    description: "Find the difference between these two images.",
    hint: "Don't just look at the images. Sometimes the difference might be in unexpected places, like the URL, title, or description.",
    solution: "The difference is in the URL or title, not in the images.",
    component: "DifferenceLevel"
  },
  {
    id: 14,
    title: "Which Box Has the Prize?",
    description: "Choose the box with the prize.",
    hint: "The prize might move between boxes. Pay attention to what happens when you click - you might need multiple clicks in a sequence.",
    solution: "Multiple clicks are required. The prize moves between boxes.",
    component: "BoxesLevel"
  },
  {
    id: 15,
    title: "Solve the Puzzle",
    description: "Rearrange the pieces to solve the puzzle.",
    hint: "Not all pieces can be moved. Focus on identifying which ones are actually interactive before trying to solve the entire puzzle.",
    solution: "Only move the pieces that are actually movable.",
    component: "PuzzleLevel"
  },
  {
    id: 16,
    title: "Press the Button 10 Times",
    description: "Press the button exactly 10 times to proceed.",
    hint: "Watch the counter carefully. It might not always increase by 1 each time - it could go backwards sometimes.",
    solution: "The counter sometimes counts down instead of up.",
    component: "CounterLevel"
  },
  {
    id: 17,
    title: "Feed the Cat",
    description: "Feed the hungry cat.",
    hint: "Look for food items somewhere else on the screen. You might need to drag an item (like a fish) to the cat.",
    solution: "Drag the fish from elsewhere on the screen to the cat.",
    component: "CatLevel"
  },
  {
    id: 18,
    title: "Turn the Lights On",
    description: "Find a way to turn on all the lights.",
    hint: "Each switch affects multiple lights in a pattern. Try to identify the pattern by testing each switch's effect on the lights.",
    solution: "The light switches affect adjacent lights in a specific pattern.",
    component: "LightsLevel"
  },
  {
    id: 19,
    title: "Charge the Phone",
    description: "Your phone is out of battery. Charge it.",
    hint: "Think about your actual phone - how do you charge it? Look for a way to simulate that action in the game.",
    solution: "Connect your device to a charger, or tap specific areas.",
    component: "ChargeLevel"
  },
  {
    id: 20,
    title: "Find the Key",
    description: "Find the key to unlock the door.",
    hint: "The key might not look like a traditional key. Look carefully at the text and spacing in the description and title.",
    solution: "The key is hidden in the level's description spacing.",
    component: "KeyLevel"
  },
  {
    id: 21,
    title: "Balance the Scale",
    description: "Balance the scale to proceed.",
    hint: "Some weights may be deceptive - they might be heavier or lighter than they appear. Experiment with different combinations.",
    solution: "Some weights are heavier than they appear.",
    component: "ScaleLevel"
  },
  {
    id: 22,
    title: "Clear the Fog",
    description: "Clear the fog to see what's underneath.",
    hint: "Think about how fog works in real life. What makes fog disappear? Try rubbing the screen quickly as if generating heat.",
    solution: "Rub the screen quickly to generate heat and clear the fog.",
    component: "FogLevel"
  },
  {
    id: 23,
    title: "Find the Hidden Message",
    description: "There's a hidden message. Can you find it?",
    hint: "The message might only appear with a change in perspective or lighting. Try tilting your device at different angles.",
    solution: "Tilt your device to see the hidden message in the shadows.",
    component: "MessageLevel"
  },
  {
    id: 24,
    title: "Solve the Riddle",
    description: "I'm tall when I'm young and short when I'm old. What am I?",
    hint: "Think of something that literally gets shorter as it ages or is used. It might be something that burns.",
    solution: "The answer is 'candle' - drag the candle to the answer box.",
    component: "RiddleLevel"
  },
  {
    id: 25,
    title: "Color the Rainbow",
    description: "Color the rainbow with the correct colors.",
    hint: "Remember the order of colors in a rainbow: Red, Orange, Yellow, Green, Blue, Indigo, Violet (ROYGBIV).",
    solution: "The colors must be in the correct rainbow order (ROYGBIV).",
    component: "RainbowLevel"
  },
  {
    id: 26,
    title: "Hit the Target",
    description: "Hit the bullseye to proceed.",
    hint: "The target is tricky - it might move when you try to tap it. Try predicting its movement or find a way to stop it first.",
    solution: "The target moves - predict its movement or find another way.",
    component: "TargetLevel"
  },
  {
    id: 27,
    title: "Water the Plant",
    description: "The plant needs water to grow.",
    hint: "You need to find a water source first. Look for cloud elements that could produce rain if dragged to the right place.",
    solution: "Create water by dragging the cloud over the plant.",
    component: "PlantLevel"
  },
  {
    id: 28,
    title: "Cross the River",
    description: "Help the chicken, fox, and grain cross the river.",
    hint: "This is a classic puzzle - you can't leave the fox with the chicken or the chicken with the grain. Plan your trips carefully.",
    solution: "Classic river crossing puzzle - don't leave fox with chicken or chicken with grain.",
    component: "RiverLevel"
  },
  {
    id: 29,
    title: "Crack the Code",
    description: "Enter the correct sequence to proceed.",
    hint: "Look for repeating patterns in the background. The code might be hidden in visual elements that aren't obviously part of the puzzle.",
    solution: "The code is visible in the background pattern sequences.",
    component: "CodeLevel"
  },
  {
    id: 30,
    title: "Defuse the Bomb",
    description: "The bomb will explode! Defuse it quickly!",
    hint: "There should be instructions somewhere. Look for a manual or guide hidden in the level - check all elements carefully.",
    solution: "Read the manual hidden elsewhere in the level.",
    component: "BombLevel"
  },
  {
    id: 31,
    title: "Tune the Radio",
    description: "Find the right frequency to proceed.",
    hint: "Listen for audio clues as you adjust the dial. The correct frequency might be hinted at by visual elements in the background.",
    solution: "The correct frequency is hinted at by background elements.",
    component: "RadioLevel"
  },
  {
    id: 32,
    title: "Arrange the Stars",
    description: "Arrange the stars in the correct constellation.",
    hint: "There's a faint pattern visible in the background. Try to match your star arrangement to that pattern.",
    solution: "The constellation pattern is faintly visible in the background.",
    component: "StarsLevel"
  },
  {
    id: 33,
    title: "Solve the Equation",
    description: "Solve for x: 3x + 5 = 20",
    hint: "Think outside the box. Rather than just solving for x, you might need to manipulate the equation itself in creative ways.",
    solution: "The solution involves manipulating the equation itself.",
    component: "EquationLevel"
  },
  {
    id: 34,
    title: "Build the Bridge",
    description: "Help the character cross the gap.",
    hint: "Drag items from your inventory to create a stable structure. Pay attention to the physics - the bridge needs proper support.",
    solution: "Drag items from inventory to create a proper bridge structure.",
    component: "BridgeLevel"
  },
  {
    id: 35,
    title: "Celebration!",
    description: "You've made it to the end! Celebrate!",
    hint: "Show your excitement! Try tapping rapidly or in a specific pattern.",
    solution: "Simply tap repeatedly on the screen to celebrate.",
    component: "CelebrationLevel"
  },
  // New levels start here
  {
    id: 36,
    title: "Wake Up!",
    description: "It's time to wake up! Make the sun rise.",
    hint: "The sun might be stuck on screen. Try dragging it in unexpected directions - even off the screen completely.",
    solution: "Drag the sun icon completely off the screen to trigger the sunrise.",
    component: "SunriseLevel"
  },
  {
    id: 37,
    title: "Fix the Clock",
    description: "The clock is broken. Fix it to show the correct time.",
    hint: "The hands of the clock might need to be moved manually. But what's the 'correct' time? Look for clues in the level design.",
    solution: "Arrange the hands to match the time shown subtly in the background elements.",
    component: "ClockLevel"
  },
  {
    id: 38,
    title: "Find the Password",
    description: "You need a password to continue.",
    hint: "The password is hidden in plain sight. Try turning your device upside down or looking at the text from a different angle.",
    solution: "The text contains numbers that look like letters when turned upside down, forming the password.",
    component: "PasswordLevel"
  },
  {
    id: 39,
    title: "Organize the Shelf",
    description: "Arrange the items on the shelf correctly.",
    hint: "There's a specific order to follow. Look at the first letters of each item and see if they spell something meaningful.",
    solution: "The first letters of the correctly arranged items spell a word that's relevant to the game.",
    component: "ShelfLevel"
  },
  {
    id: 40,
    title: "Escape the Room",
    description: "Find a way out of the locked room.",
    hint: "Not everything is as it appears. Some 'walls' might actually be doors, and some seemingly solid objects might be movable.",
    solution: "Move the picture frame to reveal a hidden key, then use it on what appears to be just a wall pattern.",
    component: "RoomLevel"
  },
];

export default levelData;

// Helper function to get level data by ID
export const getLevelById = (id: number): LevelData | undefined => {
  return levelData.find(level => level.id === id);
};
