import { View, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import SmartImage from '../components/SmartImage';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fonts, radius, shadow } from '../theme';
import { recipes } from '../data/content';

const INGREDIENTS = [
  '1 lb lean ground turkey',
  '1 cup black beans, rinsed',
  '2 cups baby spinach',
  '1/2 cup low-sugar enchilada sauce',
  '1/4 cup shredded cheese',
  'Whole-grain tortillas',
];

function Stat({ icon, value, label, color }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Ionicons name={icon} size={20} color={color} />
      <AppText font={fonts.displaySemiBold} color={colors.heading} style={{ fontSize: 17, marginTop: 4 }}>
        {value}
      </AppText>
      <AppText font={fonts.body} color={colors.textMuted} style={{ fontSize: 12 }}>
        {label}
      </AppText>
    </View>
  );
}

export default function RecipeDetailScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const recipe = recipes.find((r) => r.id === route?.params?.id) || recipes[0];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>
        <View style={{ height: 280 }}>
          <SmartImage source={{ uri: recipe.image }} style={{ width: '100%', height: '100%' }} icon="restaurant-outline" />
          <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', top: insets.top + 8, left: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="chevron-down" size={22} color={colors.heading} />
          </Pressable>
          <Pressable style={{ position: 'absolute', top: insets.top + 8, right: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="bookmark-outline" size={20} color={colors.heading} />
          </Pressable>
        </View>

        <View style={{ padding: 20, marginTop: -28, backgroundColor: colors.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28 }}>
          {/* tags */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
            {recipe.tags.map((t) => (
              <View key={t} style={{ backgroundColor: colors.primarySoft, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, marginBottom: 6 }}>
                <AppText font={fonts.bodyBold} color={colors.primary} style={{ fontSize: 12 }}>
                  {t}
                </AppText>
              </View>
            ))}
          </View>

          <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 26 }}>
            {recipe.title}
          </AppText>

          <View style={{ flexDirection: 'row', backgroundColor: colors.card, borderRadius: radius.lg, paddingVertical: 16, marginTop: 16, ...shadow.soft }}>
            <Stat icon="time-outline" value={`${recipe.time}m`} label="Time" color={colors.primary} />
            <Stat icon="flame-outline" value={recipe.calories} label="Calories" color={colors.sugar} />
            <Stat icon="barbell-outline" value={`${recipe.protein}g`} label="Protein" color={colors.protein} />
          </View>

          <AppText font={fonts.body} color={colors.textSecondary} style={{ fontSize: 15, lineHeight: 23, marginTop: 18 }}>
            {recipe.description}
          </AppText>

          <AppText font={fonts.bodyExtraBold} color={colors.heading} style={{ fontSize: 18, marginTop: 24, marginBottom: 10 }}>
            Ingredients
          </AppText>
          {INGREDIENTS.map((ing, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: i === INGREDIENTS.length - 1 ? 0 : 1, borderBottomColor: colors.border }}>
              <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: colors.primary, marginRight: 12 }} />
              <AppText font={fonts.body} color={colors.textPrimary} style={{ fontSize: 15 }}>
                {ing}
              </AppText>
            </View>
          ))}

          <PrimaryButton label="Add to meal plan" icon="add-circle-outline" style={{ marginTop: 22 }} onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </View>
  );
}
