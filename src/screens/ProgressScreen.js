import { View, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import Card from '../components/Card';
import ProgressRing from '../components/ProgressRing';
import MacroBar from '../components/MacroBar';
import SmartImage from '../components/SmartImage';
import LogFab from '../components/LogFab';
import { colors, fonts, radius, shadow } from '../theme';
import { progress, weightLogs } from '../data/content';

function MealStat({ label, value }) {
  return (
    <View style={{ width: '50%', paddingVertical: 12, alignItems: 'center' }}>
      <AppText font={fonts.body} color={colors.textMuted} style={{ fontSize: 13 }}>
        {label}
      </AppText>
      <AppText font={fonts.displaySemiBold} color={colors.heading} style={{ fontSize: 22, marginTop: 2 }}>
        {value}
      </AppText>
    </View>
  );
}

export default function ProgressScreen({ navigation }) {
  const ringProgress = progress.caloriesConsumed / progress.caloriesGoal;

  return (
    <Screen>
      <View style={{ paddingHorizontal: 20, marginBottom: 6 }}>
        <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 26 }}>
          Progress
        </AppText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: 20, paddingTop: 8 }}>
        {/* Calorie tracker card */}
        <Card style={{ padding: 18 }}>
          {/* Today dropdown */}
          <View style={{ alignItems: 'center', marginBottom: 14 }}>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bg, borderRadius: radius.pill, paddingHorizontal: 16, paddingVertical: 8 }}>
              <Ionicons name="chevron-down" size={15} color={colors.heading} />
              <AppText font={fonts.bodyBold} color={colors.heading} style={{ fontSize: 14, marginLeft: 6 }}>
                Today
              </AppText>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <AppText font={fonts.display} color={colors.heading} style={{ fontSize: 44, lineHeight: 50 }}>
                {progress.caloriesLeft}
              </AppText>
              <AppText font={fonts.bodyBold} color={colors.textSecondary} style={{ fontSize: 15, marginTop: -2 }}>
                Calories Left
              </AppText>
            </View>
            <ProgressRing
              size={120}
              progress={ringProgress}
              value={progress.caloriesConsumed}
              sub={`/${progress.caloriesGoal.toLocaleString()}`}
            />
          </View>

          {/* Macro bars */}
          <View style={{ marginTop: 18 }}>
            <MacroBar label="Protein" current={progress.macros.protein.current} goal={progress.macros.protein.goal} color={colors.protein} />
            <View style={{ flexDirection: 'row', marginTop: 16 }}>
              <MacroBar label="Carbs" current={progress.macros.carbs.current} goal={progress.macros.carbs.goal} color={colors.carbs} />
              <View style={{ width: 16 }} />
              <MacroBar label="Sugar" current={progress.macros.sugar.current} goal={progress.macros.sugar.goal} color={colors.sugar} />
            </View>
          </View>
        </Card>

        {/* Meals grid */}
        <Card style={{ marginTop: 16, padding: 6 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <MealStat label="Breakfast" value={progress.meals.Breakfast} />
            <MealStat label="Lunch" value={progress.meals.Lunch} />
            <MealStat label="Snacks" value={progress.meals.Snacks} />
            <MealStat label="Water" value={progress.meals.Water} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.border, marginTop: 4 }}>
            <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
            <AppText font={fonts.bodyBold} color={colors.primary} style={{ fontSize: 13, marginLeft: 6 }}>
              Synced with Apple Health
            </AppText>
          </View>
        </Card>

        {/* Week nav */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 18 }}>
          <Ionicons name="chevron-back" size={20} color={colors.textMuted} />
          <AppText font={fonts.bodyBold} color={colors.textSecondary} style={{ fontSize: 14, marginHorizontal: 20 }}>
            {progress.date}
          </AppText>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </View>

        {/* Weight results card */}
        <Card style={{ marginTop: 18, padding: 18 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="pencil" size={15} color={colors.textSecondary} />
              <AppText font={fonts.bodyBold} color={colors.textSecondary} style={{ fontSize: 14, marginLeft: 6 }}>
                Edit Weight Logs
              </AppText>
            </Pressable>
            <Ionicons name="share-outline" size={20} color={colors.textSecondary} />
          </View>

          <View style={{ alignItems: 'center', marginTop: 14 }}>
            <AppText font={fonts.display} color={colors.heading} style={{ fontSize: 40 }}>
              {weightLogs.totalLost} lbs
            </AppText>
            <AppText font={fonts.bodyBold} color={colors.textSecondary} style={{ fontSize: 15, marginTop: -2 }}>
              Total Weight Lost
            </AppText>
          </View>

          {/* before/after */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 18 }}>
            <View style={{ transform: [{ rotate: '-4deg' }] }}>
              <SmartImage source={{ uri: weightLogs.before }} radius={radius.md} style={{ width: 120, height: 160, borderWidth: 4, borderColor: colors.white }} icon="person-outline" />
              <View style={{ position: 'absolute', bottom: 8, alignSelf: 'center', backgroundColor: colors.white, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 4, ...shadow.soft }}>
                <AppText font={fonts.bodyExtraBold} color={colors.heading} style={{ fontSize: 12 }}>
                  Before
                </AppText>
              </View>
            </View>
            <View style={{ transform: [{ rotate: '4deg' }], marginLeft: -12, marginTop: 16 }}>
              <SmartImage source={{ uri: weightLogs.after }} radius={radius.md} style={{ width: 120, height: 160, borderWidth: 4, borderColor: colors.white }} icon="person-outline" />
              <View style={{ position: 'absolute', bottom: 8, alignSelf: 'center', backgroundColor: colors.primary, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 4, ...shadow.soft }}>
                <AppText font={fonts.bodyExtraBold} color={colors.white} style={{ fontSize: 12 }}>
                  After
                </AppText>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>

      <LogFab onSelect={() => {}} />
    </Screen>
  );
}
