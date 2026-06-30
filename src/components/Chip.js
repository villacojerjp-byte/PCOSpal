import { Pressable } from 'react-native';
import AppText from './AppText';
import { colors, fonts, radius, shadow } from '../theme';

export default function Chip({ label, active, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          paddingHorizontal: 20,
          paddingVertical: 11,
          borderRadius: radius.pill,
          backgroundColor: active ? colors.primary : colors.card,
          marginRight: 10,
        },
        active ? shadow.floating : shadow.soft,
        style,
      ]}
    >
      <AppText
        font={fonts.bodyBold}
        color={active ? colors.white : colors.textSecondary}
        style={{ fontSize: 14 }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}
