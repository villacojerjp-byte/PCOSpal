// PCOS Pal — Purple theme
// The original app's hero/brand color is a vivid raspberry ("eggplant") tone.
// Per the project brief, that brand color is replaced everywhere with purple,
// while keeping the rest of the visual language identical.
export const colors = {
  // Brand (purple — replaces the original raspberry/eggplant)
  primary: '#7C3AED', // vivid violet — main brand / buttons / FAB
  primaryDark: '#6D28D9',
  primaryDeep: '#5B21B6', // hero gradient bottom
  primaryLight: '#A78BFA', // periwinkle accent (progress rings, "Day" labels)
  primarySoft: '#EFE7FE', // soft chip / banner background
  primarySofter: '#F5EFFE',

  // Backgrounds
  bg: '#F7F2FC', // app screen background (soft lavender)
  bgWarm: '#FBEFF6', // alternate warm-lavender background
  card: '#FFFFFF',
  cardSoft: '#FBF8FF',

  // Text
  heading: '#2A1F4D', // dark plum — serif screen titles & big numbers
  textPrimary: '#2C2640',
  textSecondary: '#7C7790',
  textMuted: '#A7A2B6',
  white: '#FFFFFF',

  // Data viz / macros
  protein: '#5B9BF0',
  carbs: '#73C56A',
  sugar: '#F5A623',
  water: '#4FB6E8',

  // Food score scale (E worst → A best)
  scoreE: '#E8633A',
  scoreD: '#F0973E',
  scoreC: '#F2C744',
  scoreB: '#9FCF5B',
  scoreA: '#1E9E55',
  success: '#1E9E55',

  // Cycle / period accent (kept warm by intent)
  cycle: '#E24B7A',

  // Lines & surfaces
  border: '#EFEAF6',
  track: '#ECE7F4',
  shadow: '#2A1F4D',
};

// Reusable gradients
export const gradients = {
  hero: ['#8B5CF6', '#7C3AED', '#5B21B6'],
  primary: ['#8B5CF6', '#6D28D9'],
  ring: ['#A78BFA', '#7C3AED'],
  card: ['#FFFFFF', '#FBF8FF'],
};
