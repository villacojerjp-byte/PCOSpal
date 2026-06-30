// Font family aliases — these names are registered in App.js via useFonts().
export const fonts = {
  // Elegant serif — screen titles ("Recipes", "This Week", "Dead Bugs")
  serif: 'DMSerif',

  // Rounded display — bold headlines, brand wordmark, big stats
  display: 'Fredoka',
  displayMedium: 'FredokaMedium',
  displaySemiBold: 'FredokaSemiBold',
  displayBold: 'FredokaBold',

  // Clean rounded body
  body: 'Nunito',
  bodySemiBold: 'NunitoSemiBold',
  bodyBold: 'NunitoBold',
  bodyExtraBold: 'NunitoExtraBold',

  // Casual handwritten script — accent words
  script: 'Caveat',
  scriptBold: 'CaveatBold',
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const shadow = {
  card: {
    shadowColor: '#2A1F4D',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  soft: {
    shadowColor: '#2A1F4D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  floating: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 16,
    elevation: 8,
  },
};
