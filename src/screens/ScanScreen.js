import { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import Header from '../components/Header';
import SmartImage from '../components/SmartImage';
import Badge from '../components/Badge';
import ScoreScale from '../components/ScoreScale';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fonts, radius, shadow, gradients } from '../theme';
import { scanResult, scoreScale } from '../data/content';

function Bracket({ style }) {
  return <View style={[{ position: 'absolute', width: 34, height: 34, borderColor: colors.white }, style]} />;
}

export default function ScanScreen() {
  const [scanned, setScanned] = useState(false);

  if (!scanned) {
    return (
      <Screen>
        <Header title="Scan" />
        <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 110 }}>
          <View style={[{ flex: 1, borderRadius: radius.xl, overflow: 'hidden' }, shadow.card]}>
            <LinearGradient colors={['#2A1F4D', '#5B21B6']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {/* viewfinder frame */}
              <View style={{ width: 230, height: 230, justifyContent: 'center', alignItems: 'center' }}>
                <Bracket style={{ top: 0, left: 0, borderLeftWidth: 4, borderTopWidth: 4, borderTopLeftRadius: 12 }} />
                <Bracket style={{ top: 0, right: 0, borderRightWidth: 4, borderTopWidth: 4, borderTopRightRadius: 12 }} />
                <Bracket style={{ bottom: 0, left: 0, borderLeftWidth: 4, borderBottomWidth: 4, borderBottomLeftRadius: 12 }} />
                <Bracket style={{ bottom: 0, right: 0, borderRightWidth: 4, borderBottomWidth: 4, borderBottomRightRadius: 12 }} />
                <Ionicons name="scan-outline" size={70} color={'rgba(255,255,255,0.5)'} />
              </View>
              <AppText font={fonts.bodyBold} color={'rgba(255,255,255,0.85)'} style={{ fontSize: 15, marginTop: 30, textAlign: 'center', paddingHorizontal: 30 }}>
                Point at a meal or barcode to get an instant PCOS score
              </AppText>
            </LinearGradient>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
            <Pressable style={[{ width: 50, height: 50, borderRadius: 25, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', marginRight: 26 }, shadow.soft]}>
              <Ionicons name="barcode-outline" size={24} color={colors.heading} />
            </Pressable>
            <Pressable onPress={() => setScanned(true)} style={[{ width: 78, height: 78, borderRadius: 39, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: colors.primary }, shadow.floating]}>
              <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary }} />
            </Pressable>
            <Pressable style={[{ width: 50, height: 50, borderRadius: 25, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', marginLeft: 26 }, shadow.soft]}>
              <Ionicons name="images-outline" size={22} color={colors.heading} />
            </Pressable>
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Food Score" rightIcon="close" onRight={() => setScanned(false)} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}>
        {/* Result image with verdict + scan line */}
        <View style={[{ borderRadius: radius.xl, overflow: 'hidden' }, shadow.card]}>
          <SmartImage source={{ uri: scanResult.image }} style={{ width: '100%', height: 300 }} icon="restaurant-outline" />
          <View style={{ position: 'absolute', top: 16, alignSelf: 'center' }}>
            <Badge label={scanResult.verdict} icon="checkmark-circle" color={colors.success} float />
          </View>
          <View style={{ position: 'absolute', top: '52%', left: 0, right: 0, height: 4, backgroundColor: colors.primary, opacity: 0.9 }} />
        </View>

        <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 22, marginTop: 18 }}>
          {scanResult.title}
        </AppText>
        <AppText font={fonts.body} color={colors.textSecondary} style={{ fontSize: 14, lineHeight: 21, marginTop: 8 }}>
          {scanResult.description}
        </AppText>

        {/* Insights */}
        <View style={[{ backgroundColor: colors.card, borderRadius: radius.lg, padding: 16, marginTop: 18 }, shadow.soft]}>
          {scanResult.insights.map((ins, i) => (
            <View
              key={ins.label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 10,
                borderTopWidth: i === 0 ? 0 : 1,
                borderTopColor: colors.border,
              }}
            >
              <AppText font={fonts.bodyBold} color={colors.textPrimary} style={{ fontSize: 14 }}>
                {ins.label}
              </AppText>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={ins.good ? 'checkmark-circle' : 'alert-circle'} size={16} color={ins.good ? colors.success : colors.sugar} />
                <AppText font={fonts.bodyExtraBold} color={ins.good ? colors.success : colors.sugar} style={{ fontSize: 14, marginLeft: 6 }}>
                  {ins.value}
                </AppText>
              </View>
            </View>
          ))}
        </View>

        {/* Macros row */}
        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          {[
            { k: 'Calories', v: scanResult.macros.calories, c: colors.heading },
            { k: 'Protein', v: scanResult.macros.protein + 'g', c: colors.protein },
            { k: 'Carbs', v: scanResult.macros.carbs + 'g', c: colors.carbs },
            { k: 'Sugar', v: scanResult.macros.sugar + 'g', c: colors.sugar },
          ].map((m) => (
            <View key={m.k} style={[{ flex: 1, backgroundColor: colors.card, borderRadius: radius.md, paddingVertical: 14, alignItems: 'center', marginHorizontal: 4 }, shadow.soft]}>
              <AppText font={fonts.displaySemiBold} color={m.c} style={{ fontSize: 17 }}>
                {m.v}
              </AppText>
              <AppText font={fonts.body} color={colors.textMuted} style={{ fontSize: 11, marginTop: 2 }}>
                {m.k}
              </AppText>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 26, marginBottom: 8 }}>
          <ScoreScale scale={scoreScale} active={scanResult.grade} />
        </View>

        <PrimaryButton label="Scan another" icon="scan-outline" onPress={() => setScanned(false)} style={{ marginTop: 18 }} />
      </ScrollView>
    </Screen>
  );
}
