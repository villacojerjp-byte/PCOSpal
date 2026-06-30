import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

// Consistent screen background + top safe-area padding.
export default function Screen({ children, style, background = colors.bg, noTopPad }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[{ flex: 1, backgroundColor: background, paddingTop: noTopPad ? 0 : insets.top + 8 }, style]}>
      {children}
    </View>
  );
}
