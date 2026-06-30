import { View, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import Header from '../components/Header';
import SmartImage from '../components/SmartImage';
import { colors, fonts, radius, shadow } from '../theme';
import { lessons } from '../data/content';

function StatusDot({ status }) {
  const map = {
    completed: { bg: colors.success, icon: 'checkmark' },
    current: { bg: colors.primary, icon: 'play' },
    locked: { bg: colors.track, icon: 'lock-closed' },
  };
  const s = map[status];
  return (
    <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: s.bg, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name={s.icon} size={16} color={status === 'locked' ? colors.textMuted : colors.white} />
    </View>
  );
}

export default function LessonsScreen({ navigation }) {
  const featured = lessons.find((l) => l.status === 'current') || lessons[0];

  return (
    <Screen>
      <Header title="Lessons" rightIcon="ellipsis-horizontal" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Featured presenter video */}
        <Pressable
          onPress={() => navigation.navigate('LessonPlayer', { lessonId: featured.id })}
          style={{ marginHorizontal: 20, marginBottom: 24 }}
        >
          <View style={[{ borderRadius: radius.xl, overflow: 'hidden', height: 300 }, shadow.card]}>
            <SmartImage source={{ uri: featured.thumb }} style={{ width: '100%', height: '100%' }} icon="person-outline" />
            <LinearGradient
              colors={['transparent', 'rgba(42,31,77,0.65)']}
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 160 }}
            />
            <View style={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6 }}>
              <AppText font={fonts.bodyExtraBold} color={colors.heading} style={{ fontSize: 13 }}>
                {featured.presenter}
              </AppText>
            </View>
            <View style={{ position: 'absolute', top: '40%', alignSelf: 'center', width: 66, height: 66, borderRadius: 33, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center', ...shadow.floating }}>
              <Ionicons name="play" size={28} color={colors.primary} style={{ marginLeft: 4 }} />
            </View>
            <View style={{ position: 'absolute', left: 18, bottom: 18, right: 18 }}>
              <AppText font={fonts.bodyBold} color={colors.primaryLight} style={{ fontSize: 13 }}>
                {featured.day}
              </AppText>
              <AppText font={fonts.serif} color={colors.white} style={{ fontSize: 24, marginTop: 2 }}>
                {featured.title}
              </AppText>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Ionicons name="videocam-outline" size={14} color={'rgba(255,255,255,0.85)'} />
                <AppText font={fonts.body} color={'rgba(255,255,255,0.85)'} style={{ fontSize: 12, marginLeft: 5 }}>
                  {featured.duration}
                </AppText>
              </View>
            </View>
          </View>
        </Pressable>

        <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 22, paddingHorizontal: 20, marginBottom: 14 }}>
          Your Journey
        </AppText>

        <View style={{ paddingHorizontal: 16 }}>
          {lessons.map((l) => {
            const locked = l.status === 'locked';
            return (
              <Pressable
                key={l.id}
                disabled={locked}
                onPress={() => navigation.navigate('LessonPlayer', { lessonId: l.id })}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.card,
                    borderRadius: radius.lg,
                    padding: 12,
                    marginBottom: 12,
                    opacity: locked ? 0.6 : 1,
                  },
                  l.status === 'current' ? shadow.card : shadow.soft,
                ]}
              >
                <SmartImage source={{ uri: l.illustration }} radius={radius.md} style={{ width: 64, height: 64 }} icon="book-outline" />
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <AppText font={fonts.bodyBold} color={l.status === 'current' ? colors.primary : colors.textMuted} style={{ fontSize: 12 }}>
                    {l.day}
                  </AppText>
                  <AppText font={fonts.bodyExtraBold} color={colors.textPrimary} style={{ fontSize: 15, marginTop: 2 }} numberOfLines={1}>
                    {l.title}
                  </AppText>
                  <AppText font={fonts.body} color={colors.textMuted} style={{ fontSize: 12, marginTop: 2 }}>
                    {locked ? 'Locked' : l.status === 'completed' ? 'Completed' : l.duration}
                  </AppText>
                </View>
                <StatusDot status={l.status} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}
