import { View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import AppText from './AppText';
import { colors, fonts } from '../theme';

// Circular progress ring with a gradient stroke and centered value.
export default function ProgressRing({
  size = 116,
  stroke = 12,
  progress = 0.4, // 0..1
  value,
  sub,
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, progress));
  const offset = c * (1 - clamped);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={colors.primaryLight} />
            <Stop offset="1" stopColor={colors.primary} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={colors.track}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <AppText font={fonts.displaySemiBold} color={colors.primary} style={{ fontSize: 24 }}>
          {value}
        </AppText>
        {sub ? (
          <AppText font={fonts.body} color={colors.textMuted} style={{ fontSize: 12, marginTop: -2 }}>
            {sub}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}
