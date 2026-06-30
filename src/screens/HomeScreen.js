import { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import LessonCard from '../components/LessonCard';
import PalMascot from '../components/PalMascot';
import { useUser } from '../context/UserContext';
import { colors, fonts, gradients, radius, shadow } from '../theme';
import { weekDays, todaysLessons, userProfile } from '../data/content';

const TODAY_INDEX = 3; // Wed

export default function HomeScreen({ navigation }) {
  const [selected, setSelected] = useState(TODAY_INDEX);
  const { profile } = useUser();

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Greeting */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 22 }}>
          <View style={{ flex: 1 }}>
            <AppText font={fonts.bodyBold} color={colors.textSecondary} style={{ fontSize: 14 }}>
              Good morning,
            </AppText>
            <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 28, marginTop: 2 }}>
              {profile.name}
            </AppText>
          </View>
          <View style={[{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill, marginRight: 10 }, shadow.soft]}>
            <Ionicons name="flame" size={16} color={colors.primary} />
            <AppText font={fonts.bodyExtraBold} color={colors.heading} style={{ fontSize: 14, marginLeft: 4 }}>
              {userProfile.streak}
            </AppText>
          </View>
          <View style={[{ backgroundColor: colors.primarySoft, borderRadius: 26, padding: 4 }, shadow.soft]}>
            <PalMascot size={44} />
          </View>
        </View>

        {/* Continue card */}
        <Pressable
          onPress={() => navigation.navigate('LessonPlayer', { lessonId: 'd3' })}
          style={{ marginHorizontal: 20, marginBottom: 24 }}
        >
          <LinearGradient
            colors={gradients.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[{ borderRadius: radius.xl, padding: 20, flexDirection: 'row', alignItems: 'center' }, shadow.floating]}
          >
            <View style={{ flex: 1 }}>
              <AppText font={fonts.bodyBold} color={'rgba(255,255,255,0.85)'} style={{ fontSize: 13 }}>
                CONTINUE · DAY 3
              </AppText>
              <AppText font={fonts.displaySemiBold} color={colors.white} style={{ fontSize: 20, marginTop: 4 }}>
                Hormones Out of Balance
              </AppText>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <View style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="play" size={13} color={colors.white} />
                  <AppText font={fonts.bodyBold} color={colors.white} style={{ fontSize: 12, marginLeft: 5 }}>
                    3 min lesson
                  </AppText>
                </View>
              </View>
            </View>
            <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="play" size={24} color={colors.primary} style={{ marginLeft: 3 }} />
            </View>
          </LinearGradient>
        </Pressable>

        {/* This Week header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 24 }}>
              This Week
            </AppText>
            <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', marginLeft: 8, ...shadow.soft }}>
              <Ionicons name="chevron-forward" size={15} color={colors.heading} />
            </View>
          </View>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="pricetag-outline" size={16} color={colors.primary} />
            <AppText font={fonts.bodyBold} color={colors.primary} style={{ fontSize: 14, marginLeft: 5 }}>
              Groceries
            </AppText>
          </Pressable>
        </View>

        {/* Day selector */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 20 }}>
          {weekDays.map((d, i) => {
            const active = i === selected;
            return (
              <Pressable
                key={d}
                onPress={() => setSelected(i)}
                style={{
                  alignItems: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: radius.pill,
                  backgroundColor: active ? colors.primary : 'transparent',
                  ...(active ? shadow.floating : {}),
                }}
              >
                <AppText
                  font={active ? fonts.bodyExtraBold : fonts.bodyBold}
                  color={active ? colors.white : colors.textMuted}
                  style={{ fontSize: 14 }}
                >
                  {d}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        {/* Today's Lessons */}
        <AppText font={fonts.bodyBold} color={colors.textSecondary} style={{ fontSize: 14, paddingHorizontal: 20, marginBottom: 8 }}>
          Today's Lessons
        </AppText>

        <View style={{ paddingHorizontal: 12 }}>
          <LessonCard
            item={todaysLessons[0]}
            highlighted
            onPress={() => navigation.navigate('LessonPlayer', { lessonId: 'd2' })}
          />
          <View style={{ height: 8 }} />
          <LessonCard
            item={todaysLessons[1]}
            onPress={() => navigation.navigate('WorkoutPlayer')}
          />
        </View>

        {/* Trusted footer */}
        <View style={{ alignItems: 'center', marginTop: 26 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
            <AppText font={fonts.bodyBold} color={colors.textMuted} style={{ fontSize: 13, marginLeft: 6 }}>
              Trusted by {userProfile.trustedBy} women · Made with OBGYN
            </AppText>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
