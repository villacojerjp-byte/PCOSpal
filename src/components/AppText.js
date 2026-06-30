import { Text } from 'react-native';
import { colors, fonts } from '../theme';

// Base text component. Defaults to the rounded body font so we never fall back
// to the platform system font. Pass a `font` from the theme to override.
export default function AppText({ font = fonts.body, color = colors.textPrimary, style, children, ...rest }) {
  return (
    <Text {...rest} style={[{ fontFamily: font, color }, style]}>
      {children}
    </Text>
  );
}
