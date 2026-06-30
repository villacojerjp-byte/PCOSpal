import { View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppText from '../components/AppText';
import PalMascot from '../components/PalMascot';
import { colors, fonts, gradients, radius, shadow } from '../theme';
import { userProfile } from '../data/content';

export default function WelcomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={gradients.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <StatusBar style="light" />
      <View style={{ flex: 1, paddingTop: insets.top + 30, paddingBottom: insets.bottom + 24, paddingHorizontal: 28, alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: 16, padding: 5 }}>
            <PalMascot size={40} />
          </View>
          <AppText font={fonts.displayBold} color={colors.white} style={{ fontSize: 24, marginLeft: 10 }}>
            PCOS Pal
          </AppText>
        </View>

        {/* Hero copy */}
        <View style={{ alignItems: 'center' }}>
          <AppText font={fonts.scriptBold} color={'rgba(255,255,255,0.95)'} style={{ fontSize: 52, lineHeight: 56 }}>
            Your
          </AppText>
          <AppText font={fonts.displayBold} color={colors.white} style={{ fontSize: 86, lineHeight: 92, letterSpacing: 1 }}>
            PCOS
          </AppText>
          <AppText font={fonts.scriptBold} color={'rgba(255,255,255,0.95)'} style={{ fontSize: 52, lineHeight: 56 }}>
            partner
          </AppText>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
            <Ionicons name="star" size={22} color={colors.white} />
            <AppText font={fonts.displayBold} color={colors.white} style={{ fontSize: 24, marginLeft: 8 }}>
              {userProfile.rating}
            </AppText>
            <AppText font={fonts.bodyBold} color={'rgba(255,255,255,0.85)'} style={{ fontSize: 14, marginLeft: 10 }}>
              · Trusted by {userProfile.trustedBy} women
            </AppText>
          </View>
        </View>

        {/* CTA */}
        <View style={{ width: '100%' }}>
          <Pressable
            onPress={() => navigation.navigate('Onboarding')}
            style={[{ backgroundColor: colors.white, borderRadius: radius.pill, height: 58, alignItems: 'center', justifyContent: 'center' }, shadow.floating]}
          >
            <AppText font={fonts.displaySemiBold} color={colors.primary} style={{ fontSize: 18 }}>
              Get Started
            </AppText>
          </Pressable>
          <Pressable onPress={() => navigation.replace('Main')} style={{ alignItems: 'center', marginTop: 16 }}>
            <AppText font={fonts.bodyBold} color={'rgba(255,255,255,0.9)'} style={{ fontSize: 14 }}>
              I already have an account
            </AppText>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
