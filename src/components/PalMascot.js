import { useId } from 'react';
import Svg, { Defs, LinearGradient, Stop, Path, Circle, Ellipse, Rect } from 'react-native-svg';

// The PCOS Pal berry mascot, drawn as resolution-independent SVG.
// Body is purple to match the brand theme; leaves stay green for contrast.
// Gradient ids are made unique per instance so they resolve correctly on web
// (shared SVG gradient ids fail to render with react-native-web).
export default function PalMascot({ size = 96 }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const bodyId = `pal-body-${uid}`;
  const leafId = `pal-leaf-${uid}`;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id={bodyId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A78BFA" />
          <Stop offset="1" stopColor="#7C3AED" />
        </LinearGradient>
        <LinearGradient id={leafId} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#3BC9A6" />
          <Stop offset="1" stopColor="#159B86" />
        </LinearGradient>
      </Defs>

      {/* curly stem */}
      <Path
        d="M50 30 C50 18 40 16 38 24 C36 31 46 31 45 23 C44 14 54 12 56 20"
        stroke="#159B86"
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />

      {/* leaves */}
      <Path d="M50 33 C40 20 20 22 18 33 C30 40 46 40 50 33 Z" fill={`url(#${leafId})`} />
      <Path d="M50 33 C60 20 80 22 82 33 C70 40 54 40 50 33 Z" fill={`url(#${leafId})`} />

      {/* body */}
      <Rect x={20} y={32} width={60} height={56} rx={28} fill={`url(#${bodyId})`} />

      {/* eyes */}
      <Circle cx={40} cy={56} r={11} fill="#FFFFFF" />
      <Circle cx={62} cy={56} r={11} fill="#FFFFFF" />
      <Circle cx={42} cy={58} r={6} fill="#2A1163" />
      <Circle cx={64} cy={58} r={6} fill="#2A1163" />
      <Circle cx={44} cy={56} r={2} fill="#FFFFFF" />
      <Circle cx={66} cy={56} r={2} fill="#FFFFFF" />

      {/* cheeks */}
      <Ellipse cx={32} cy={70} rx={5} ry={3.4} fill="#E7B9FF" opacity={0.9} />
      <Ellipse cx={70} cy={70} rx={5} ry={3.4} fill="#E7B9FF" opacity={0.9} />

      {/* smile */}
      <Path d="M45 70 C49 75 57 75 61 70" stroke="#2A1163" strokeWidth={3.4} strokeLinecap="round" fill="none" />
    </Svg>
  );
}
