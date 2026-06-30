import { View } from 'react-native';
import AppText from './AppText';
import { colors, fonts, radius } from '../theme';

export default function MacroBar({ label, current, goal, color, unit = 'g' }) {
  const pct = goal > 0 ? Math.max(0, Math.min(1, current / goal)) : 0;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
        <AppText font={fonts.bodyBold} color={colors.textPrimary} style={{ fontSize: 13 }}>
          {label}
        </AppText>
        <AppText font={fonts.body} color={colors.textSecondary} style={{ fontSize: 12 }}>
          {current}/{goal}
          {unit}
        </AppText>
      </View>
      <View style={{ height: 7, borderRadius: radius.pill, backgroundColor: colors.track, overflow: 'hidden' }}>
        <View style={{ width: `${pct * 100}%`, height: '100%', borderRadius: radius.pill, backgroundColor: color }} />
      </View>
    </View>
  );
}
