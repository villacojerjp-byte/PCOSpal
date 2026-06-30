import { View, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import SmartImage from '../components/SmartImage';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fonts, radius, shadow } from '../theme';
import { lessons } from '../data/content';

const TAKEAWAYS = [
  'Insulin resistance is the root driver of PCOS weight gain.',
  'Balancing blood sugar reduces cravings and fatigue.',
  'Protein + fiber at every meal keeps hormones steady.',
];

export default function LessonPlayerScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const lesson = lessons.find((l) => l.id === route?.params?.lessonId) || lessons[2];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>
        {/* Video hero */}
        <View style={{ height: 360 }}>
          <SmartImage source={{ uri: lesson.thumb }} style={{ width: '100%', height: '100%' }} icon="person-outline" />
          <LinearGradient colors={['rgba(42,31,77,0.45)', 'transparent', 'rgba(42,31,77,0.5)']} style={{ position: 'absolute', inset: 0, top: 0, left: 0, right: 0, bottom: 0 }} />
          <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', top: insets.top + 8, left: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="chevron-down" size={22} color={colors.heading} />
          </Pressable>
          <View style={{ position: 'absolute', top: '42%', alignSelf: 'center', width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center', ...shadow.floating }}>
            <Ionicons name="play" size={30} color={colors.primary} style={{ marginLeft: 4 }} />
          </View>
          <View style={{ position: 'absolute', bottom: 16, left: 20 }}>
            <AppText font={fonts.bodyExtraBold} color={colors.white} style={{ fontSize: 14 }}>
              {lesson.presenter}
            </AppText>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <AppText font={fonts.bodyBold} color={colors.primary} style={{ fontSize: 13 }}>
            {lesson.day} · {lesson.duration}
          </AppText>
          <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 26, marginTop: 6 }}>
            {lesson.title}
          </AppText>
          <AppText font={fonts.body} color={colors.textSecondary} style={{ fontSize: 15, lineHeight: 23, marginTop: 12 }}>
            In this lesson, your PCOS coach breaks down what's really happening in your body and the small, science-backed
            shifts that make the biggest difference — reviewed by an OB/GYN and endocrinologist.
          </AppText>

          <AppText font={fonts.bodyExtraBold} color={colors.heading} style={{ fontSize: 17, marginTop: 24, marginBottom: 8 }}>
            Key takeaways
          </AppText>
          {TAKEAWAYS.map((t, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.card, borderRadius: radius.md, padding: 14, marginBottom: 10, ...shadow.soft }}>
              <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Ionicons name="checkmark" size={15} color={colors.primary} />
              </View>
              <AppText font={fonts.bodyBold} color={colors.textPrimary} style={{ fontSize: 14, lineHeight: 20, flex: 1 }}>
                {t}
              </AppText>
            </View>
          ))}

          <PrimaryButton label="Mark as complete" icon="checkmark-circle" onPress={() => navigation.goBack()} style={{ marginTop: 18 }} />
        </View>
      </ScrollView>
    </View>
  );
}
