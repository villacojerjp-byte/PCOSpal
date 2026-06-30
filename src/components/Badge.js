import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import { colors, fonts, radius, shadow } from '../theme';

// Pill badge — used for "Safe for PCOS", check-tags, etc.
export default function Badge({ label, icon, color = colors.success, textColor = colors.white, float }) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          backgroundColor: color,
          borderRadius: radius.pill,
          paddingHorizontal: 16,
          paddingVertical: 9,
        },
        float && shadow.soft,
      ]}
    >
      {icon ? (
        <Ionicons name={icon} size={15} color={textColor} style={{ marginRight: 6 }} />
      ) : null}
      <AppText font={fonts.bodyExtraBold} color={textColor} style={{ fontSize: 14 }}>
        {label}
      </AppText>
    </View>
  );
}
