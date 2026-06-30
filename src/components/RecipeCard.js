import { View, Pressable } from 'react-native';
import AppText from './AppText';
import SmartImage from './SmartImage';
import { colors, fonts, radius, shadow } from '../theme';

export default function RecipeCard({ item, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={[{ borderRadius: radius.lg, ...shadow.card, backgroundColor: colors.card }, style]}>
      <SmartImage
        source={{ uri: item.image }}
        style={{ width: '100%', height: 116, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg }}
        icon="restaurant-outline"
      />
      <View style={{ padding: 12 }}>
        <AppText font={fonts.bodyExtraBold} color={colors.textPrimary} style={{ fontSize: 15, lineHeight: 20 }} numberOfLines={2}>
          {item.title}
        </AppText>
        <AppText font={fonts.bodyBold} color={colors.textMuted} style={{ fontSize: 12, marginTop: 6 }}>
          {item.category} · {item.protein}g Protein
        </AppText>
      </View>
    </Pressable>
  );
}
