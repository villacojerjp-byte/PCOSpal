import { useCallback } from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { Fredoka_400Regular, Fredoka_500Medium, Fredoka_600SemiBold, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { Caveat_400Regular, Caveat_700Bold } from '@expo-google-fonts/caveat';

import RootNavigator from './src/navigation/RootNavigator';
import { UserProvider } from './src/context/UserContext';
import { colors } from './src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.bg, primary: colors.primary },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSerif: DMSerifDisplay_400Regular,
    Fredoka: Fredoka_400Regular,
    FredokaMedium: Fredoka_500Medium,
    FredokaSemiBold: Fredoka_600SemiBold,
    FredokaBold: Fredoka_700Bold,
    Nunito: Nunito_400Regular,
    NunitoSemiBold: Nunito_600SemiBold,
    NunitoBold: Nunito_700Bold,
    NunitoExtraBold: Nunito_800ExtraBold,
    Caveat: Caveat_400Regular,
    CaveatBold: Caveat_700Bold,
  });

  const onReady = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <UserProvider>
        <View style={{ flex: 1, backgroundColor: colors.bg }} onLayout={onReady}>
          <StatusBar style="dark" />
          <NavigationContainer theme={navTheme}>
            <RootNavigator />
          </NavigationContainer>
        </View>
      </UserProvider>
    </SafeAreaProvider>
  );
}
