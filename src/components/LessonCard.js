import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import SmartImage from './SmartImage';
import { colors, fonts, radius, shadow } from '../theme';

// Horizontal lesson / workout row used in "Today's Lessons".
export default function LessonCard({ item, highlighted, onPress }) {
  const isWorkout = item.type === 'workout';
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: highlighted ? colors.card : 'transparent',
          borderRadius: radius.lg,
          padding: highlighted ? 12 : 12,
        },
        highlighted && shadow.card,
      ]}
    >
      <SmartImage
        source={{ uri: item.thumb }}
        radius={radius.md}
        style={{ width: 96, height: 84 }}
        icon={isWorkout ? 'barbell-outline' : 'play-outline'}
      />
      <View style={{ flex: 1, marginLeft: 14 }}>
        <AppText
          font={fonts.bodyExtraBold}
          color={highlighted ? colors.textPrimary : colors.textSecondary}
          style={{ fontSize: 16, lineHeight: 21 }}
          numberOfLines={2}
        >
          {item.title}
        </AppText>
        {!isWorkout && (
          <AppText font={fonts.bodyBold} color={colors.primary} style={{ fontSize: 13, marginTop: 4 }}>
            {item.day}
          </AppText>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Ionicons
            name={isWorkout ? 'time-outline' : 'videocam-outline'}
            size={14}
            color={colors.textMuted}
          />
          <AppText font={fonts.body} color={colors.textMuted} style={{ fontSize: 12, marginLeft: 5 }}>
            {item.day && isWorkout ? item.day : item.duration}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}
