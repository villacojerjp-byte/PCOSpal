import { View } from 'react-native';
import { colors, radius, shadow } from '../theme';

export default function Card({ style, soft, children, ...rest }) {
  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: soft ? colors.cardSoft : colors.card,
          borderRadius: radius.lg,
          padding: 16,
        },
        shadow.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}
