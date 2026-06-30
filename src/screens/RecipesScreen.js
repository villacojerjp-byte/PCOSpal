import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import Header from '../components/Header';
import Chip from '../components/Chip';
import RecipeCard from '../components/RecipeCard';
import { colors, fonts, radius, shadow } from '../theme';
import { recipes, recipeCategories } from '../data/content';

export default function RecipesScreen({ navigation }) {
  const [category, setCategory] = useState('All');
  const cats = ['All', ...recipeCategories];
  const filtered = category === 'All' ? recipes : recipes.filter((r) => r.category === category);

  // Two-column layout
  const left = filtered.filter((_, i) => i % 2 === 0);
  const right = filtered.filter((_, i) => i % 2 === 1);

  return (
    <Screen>
      <Header title="Recipes" leftIcon="bookmark-outline" rightIcon="search" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Banner */}
        <View style={{ marginHorizontal: 20, marginBottom: 18, backgroundColor: colors.primarySoft, borderRadius: radius.md, paddingVertical: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="sync" size={18} color={colors.primary} />
          <AppText font={fonts.bodyBold} color={colors.primary} style={{ fontSize: 14, marginLeft: 10 }}>
            New recipes added weekly!
          </AppText>
        </View>

        {/* Category chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 4 }} style={{ marginBottom: 18 }}>
          {cats.map((c) => (
            <Chip key={c} label={c} active={c === category} onPress={() => setCategory(c)} />
          ))}
        </ScrollView>

        {/* Grid */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
          <View style={{ flex: 1, paddingHorizontal: 4 }}>
            {left.map((r) => (
              <RecipeCard key={r.id} item={r} style={{ marginBottom: 12 }} onPress={() => navigation.navigate('RecipeDetail', { id: r.id })} />
            ))}
          </View>
          <View style={{ flex: 1, paddingHorizontal: 4 }}>
            {right.map((r) => (
              <RecipeCard key={r.id} item={r} style={{ marginBottom: 12 }} onPress={() => navigation.navigate('RecipeDetail', { id: r.id })} />
            ))}
          </View>
        </View>

        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="restaurant-outline" size={40} color={colors.primaryLight} />
            <AppText font={fonts.bodyBold} color={colors.textMuted} style={{ fontSize: 14, marginTop: 10 }}>
              No {category.toLowerCase()} recipes yet
            </AppText>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
