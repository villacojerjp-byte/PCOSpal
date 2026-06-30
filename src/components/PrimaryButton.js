import { Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import { colors, fonts, gradients, radius, shadow } from '../theme';

export default function PrimaryButton({ label, onPress, icon, outline, style }) {
  if (outline) {
    return (
      <Pressable onPress={onPress} style={[styles.base, styles.outline, style]}>
        {icon ? <Ionicons name={icon} size={18} color={colors.primary} style={{ marginRight: 8 }} /> : null}
        <AppText font={fonts.displaySemiBold} color={colors.primary} style={{ fontSize: 16 }}>
          {label}
        </AppText>
      </Pressable>
    );
  }
  return (
    <Pressable onPress={onPress} style={[shadow.floating, style]}>
      <LinearGradient
        colors={gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.base}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon ? <Ionicons name={icon} size={18} color={colors.white} style={{ marginRight: 8 }} /> : null}
          <AppText font={fonts.displaySemiBold} color={colors.white} style={{ fontSize: 16 }}>
            {label}
          </AppText>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = {
  base: {
    height: 56,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  outline: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
};
