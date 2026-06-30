// Mock content for PCOS Pal. Images use Unsplash CDN with graceful fallbacks.
const img = (id, w = 500) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const todaysLessons = [
  {
    id: 'l1',
    title: 'Why PCOS Makes You Gain Weight',
    day: 'Day 2',
    duration: '3 Minutes',
    type: 'video',
    presenter: 'Dr. Maya',
    thumb: img('1573496359142-b8d87734a5a2', 300),
  },
  {
    id: 'w-home',
    title: 'Metabolic Balance Builder Workout',
    day: '7 Min · No Equipment',
    duration: '7 Minutes',
    type: 'workout',
    thumb: img('1518611012118-696072aa579a', 300),
  },
];

export const lessons = [
  {
    id: 'd1',
    day: 'Day 1',
    title: 'PCOS 101: The Basics',
    duration: '4 Minutes',
    presenter: 'Julia',
    status: 'completed',
    thumb: img('1517841905240-472988babdf9', 600),
    illustration: img('1559757175-08fda9d72c84', 300),
  },
  {
    id: 'd2',
    day: 'Day 2',
    title: 'Why PCOS Makes You Gain Weight',
    duration: '3 Minutes',
    presenter: 'Julia',
    status: 'completed',
    thumb: img('1494790108377-be9c29b29330', 600),
    illustration: img('1607962837359-5e7e89f86776', 300),
  },
  {
    id: 'd3',
    day: 'Day 3',
    title: 'Hormones Out of Balance',
    duration: '3 Minutes',
    presenter: 'Julia',
    status: 'current',
    thumb: img('1487412720507-e7ab37603c6f', 600),
    illustration: img('1576091160550-2173dba999ef', 300),
  },
  {
    id: 'd4',
    day: 'Day 4',
    title: 'Insulin & Blood Sugar',
    duration: '5 Minutes',
    presenter: 'Julia',
    status: 'locked',
    thumb: img('1544005313-94ddf0286df2', 600),
    illustration: img('1505751172876-fa1923c5c528', 300),
  },
  {
    id: 'd5',
    day: 'Day 5',
    title: 'Foods That Heal',
    duration: '4 Minutes',
    presenter: 'Julia',
    status: 'locked',
    thumb: img('1438761681033-6461ffad8d80', 600),
    illustration: img('1490645935967-10de6ba17061', 300),
  },
];

export const recipeCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export const recipes = [
  {
    id: 'r1',
    title: 'Veggie-Packed Turkey Enchiladas',
    category: 'Dinner',
    protein: 32,
    calories: 420,
    time: 35,
    image: img('1565299624946-b28f40a0ae38', 500),
    tags: ['Anti-Inflammatory', 'High Protein'],
    description:
      'A cozy, fiber-rich dinner that keeps blood sugar steady while delivering 32g of protein to support hormone balance.',
  },
  {
    id: 'r2',
    title: 'Protein-Packed Vanilla Oat Latte',
    category: 'Breakfast',
    protein: 22,
    calories: 210,
    time: 5,
    image: img('1461023058943-07fcbe16d735', 500),
    tags: ['Insulin Safe', 'High Protein'],
    description:
      'A creamy morning latte that swaps the sugar crash for slow-release energy and a protein boost.',
  },
  {
    id: 'r3',
    title: 'Salmon & Sweet Potato Bowl',
    category: 'Lunch',
    protein: 38,
    calories: 480,
    time: 25,
    image: img('1467003909585-2f8a72700288', 500),
    tags: ['Omega-3', 'Antioxidant Rich'],
    description:
      'High-quality protein and omega-3s from salmon alongside fiber-rich complex carbs that help insulin response.',
  },
  {
    id: 'r4',
    title: 'Green Goddess Chickpea Salad',
    category: 'Lunch',
    protein: 19,
    calories: 350,
    time: 15,
    image: img('1512621776951-a57141f2eefd', 500),
    tags: ['Anti-Inflammatory', 'Fiber Rich'],
    description:
      'A bright, herby salad loaded with plant protein and gut-friendly fiber to keep you full for hours.',
  },
  {
    id: 'r5',
    title: 'Cinnamon Almond Energy Bites',
    category: 'Snack',
    protein: 8,
    calories: 140,
    time: 10,
    image: img('1490567674331-72de84996ef2', 500),
    tags: ['Insulin Safe', 'No Added Sugar'],
    description:
      'Naturally sweet bites with cinnamon to support healthy blood sugar between meals.',
  },
  {
    id: 'r6',
    title: 'Berry Spinach Smoothie',
    category: 'Breakfast',
    protein: 24,
    calories: 230,
    time: 5,
    image: img('1505252585461-04db1eb84625', 500),
    tags: ['Antioxidant Rich', 'High Protein'],
    description:
      'Antioxidant-packed berries and leafy greens blended with protein to fight inflammation.',
  },
];

export const recipePromises = [
  'Anti-Inflammatory',
  'High Protein',
  'Insulin Safe',
  'Antioxidant Rich',
];

export const scanResult = {
  title: 'Salmon & Sweet Potato Bowl',
  verdict: 'Safe for PCOS',
  grade: 'A',
  image: img('1467003909585-2f8a72700288', 600),
  description:
    'This meal provides high-quality protein and omega-3s from salmon alongside fiber-rich complex carbohydrates, which helps keep blood sugar steady and supports hormone balance.',
  macros: { protein: 38, carbs: 42, sugar: 9, calories: 480 },
  insights: [
    { label: 'Blood sugar impact', value: 'Low', good: true },
    { label: 'Insulin friendly', value: 'Yes', good: true },
    { label: 'Inflammation', value: 'Reduces', good: true },
  ],
};

export const scoreScale = ['E', 'D', 'C', 'B', 'A'];

export const progress = {
  caloriesGoal: 1622,
  caloriesConsumed: 680,
  get caloriesLeft() {
    return this.caloriesGoal - this.caloriesConsumed;
  },
  macros: {
    protein: { current: 55, goal: 126 },
    carbs: { current: 305, goal: 121 },
    sugar: { current: 46, goal: 20 },
  },
  meals: {
    Breakfast: 160,
    Lunch: 520,
    Snacks: 0,
    Water: '0 oz',
  },
  totalWeightLost: 25,
  syncedHealth: true,
  date: 'April 14',
};

export const logActions = [
  { id: 'weight', label: 'Log Weight', emoji: '💯' },
  { id: 'meal', label: 'Log Meal', emoji: '🥑' },
  { id: 'workout', label: 'Log Workout', emoji: '💪' },
  { id: 'water', label: 'Log Water Intake', emoji: '💧' },
  { id: 'cycle', label: 'Log Cycle', emoji: '🩸' },
];

export const workout = {
  title: 'Metabolic Balance Builder',
  duration: '7 Min',
  equipment: 'No Equipment',
  exercises: [
    { name: 'Dead Bugs', value: 29, unit: 'reps', image: img('1576678927484-cc907957088c', 300) },
    { name: 'Warrior III Pose', value: 30, unit: 'sec', step: '2/5', image: img('1518611012118-696072aa579a', 300) },
    { name: 'Glute Bridges', value: 15, unit: 'reps', step: '3/5', image: img('1571019613454-1cb2f99b2d8b', 300) },
    { name: 'Bird Dogs', value: 12, unit: 'reps', step: '4/5', image: img('1599058917212-d750089bc07e', 300) },
    { name: 'Child’s Pose', value: 45, unit: 'sec', step: '5/5', image: img('1545205597-3d9d02c29597', 300) },
  ],
};

export const weightLogs = {
  totalLost: 25,
  startWeight: 178,
  currentWeight: 153,
  goalWeight: 145,
  before: img('1518310383802-640c2de311b2', 500),
  after: img('1488716820095-cbe80883c496', 500),
  history: [178, 174, 171, 168, 164, 160, 157, 153],
};

export const testimonials = [
  { id: 't1', name: 'Emily', quote: 'Finally found an app for my PCOS!', avatar: img('1438761681033-6461ffad8d80', 120) },
  { id: 't2', name: 'Sarah', quote: 'Incredibly simple and helpful.', avatar: img('1494790108377-be9c29b29330', 120) },
  { id: 't3', name: 'Louna', quote: "Best PCOS app I've ever tried!", avatar: img('1534528741775-53994a69daeb', 120) },
];

export const userProfile = {
  name: 'Jordan',
  streak: 12,
  rating: 4.6,
  trustedBy: '100K',
};
