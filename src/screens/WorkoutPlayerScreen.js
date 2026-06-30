import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import { colors, fonts, radius, shadow } from '../theme';
import { workout } from '../data/content';

export default function WorkoutPlayerScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const ex = workout.exercises[index];
  const next = workout.exercises[index + 1];
  const total = workout.exercises.length;

  const go = (dir) => {
    const ni = index + dir;
    if (ni < 0) return;
    if (ni >= total) {
      navigation.goBack();
      return;
    }
    setIndex(ni);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgWarm, paddingTop: insets.top + 8 }}>
      {/* Close */}
      <View style={{ alignItems: 'flex-end', paddingHorizontal: 20 }}>
        <Pressable onPress={() => navigation.goBack()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', ...shadow.soft }}>
          <Ionicons name="close" size={22} color={colors.heading} />
        </Pressable>
      </View>

      {/* progress segments */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 8 }}>
        {workout.exercises.map((_, i) => (
          <View key={i} style={{ flex: 1, height: 5, borderRadius: 3, marginHorizontal: 3, backgroundColor: i <= index ? colors.primary : colors.track }} />
        ))}
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* muscle-group pill */}
        <View style={{ backgroundColor: colors.primarySoft, borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 6, marginBottom: 14 }}>
          <AppText font={fonts.bodyExtraBold} color={colors.primary} style={{ fontSize: 12, letterSpacing: 0.5 }}>
            {ex.group.toUpperCase()}
          </AppText>
        </View>

        <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 30 }}>
          {ex.name}
        </AppText>
        <AppText font={fonts.displaySemiBold} color={colors.textSecondary} style={{ fontSize: 26, marginTop: 4 }}>
          {ex.value}
          <AppText font={fonts.body} color={colors.textMuted} style={{ fontSize: 16 }}>
            {' '}
            {ex.unit}
          </AppText>
        </AppText>

        <View style={{ marginTop: 26, width: 280, height: 280, borderRadius: 140, borderWidth: 6, borderColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', ...shadow.card }}>
          <LinearGradient colors={['#FFFFFF', colors.primarySoft]} style={StyleSheet.absoluteFill} />
          <MaterialCommunityIcons name={ex.icon} size={140} color={colors.primary} />
        </View>

        <AppText font={fonts.bodyBold} color={colors.textMuted} style={{ fontSize: 15, marginTop: 28 }}>
          Go at your own pace.
        </AppText>
      </View>

      {/* controls */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <Pressable onPress={() => go(-1)} disabled={index === 0} style={{ opacity: index === 0 ? 0.3 : 1, padding: 12 }}>
          <Ionicons name="play-skip-back" size={26} color={colors.heading} />
        </Pressable>
        <Pressable onPress={() => go(1)} style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginHorizontal: 30, ...shadow.floating }}>
          <Ionicons name="checkmark" size={34} color={colors.white} />
        </Pressable>
        <Pressable onPress={() => go(1)} style={{ padding: 12 }}>
          <Ionicons name="play-skip-forward" size={26} color={colors.heading} />
        </Pressable>
      </View>

      {/* Next preview */}
      {next ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, marginHorizontal: 20, marginBottom: insets.bottom + 16, borderRadius: radius.lg, padding: 12, ...shadow.soft }}>
          <View style={{ width: 52, height: 52, borderRadius: radius.md, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons name={next.icon} size={30} color={colors.primary} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <AppText font={fonts.bodyBold} color={colors.primary} style={{ fontSize: 12 }}>
              Next
            </AppText>
            <AppText font={fonts.bodyExtraBold} color={colors.textPrimary} style={{ fontSize: 15 }}>
              {next.name} {next.step ? `(${next.step})` : ''}
            </AppText>
            <AppText font={fonts.body} color={colors.textMuted} style={{ fontSize: 12 }}>
              {next.value} {next.unit}
            </AppText>
          </View>
        </View>
      ) : (
        <View style={{ marginBottom: insets.bottom + 16 }} />
      )}
    </View>
  );
}
