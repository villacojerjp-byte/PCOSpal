import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import { colors, fonts, radius, shadow } from '../theme';

const ICONS = {
  Home: 'home',
  Lessons: 'book',
  Scan: 'scan',
  Recipes: 'restaurant',
  Progress: 'stats-chart',
};

export default function TabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: insets.bottom > 0 ? insets.bottom : 14,
          flexDirection: 'row',
          backgroundColor: colors.card,
          borderRadius: radius.pill,
          height: 66,
          paddingHorizontal: 8,
          alignItems: 'center',
        },
        shadow.floating,
      ]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const isScan = route.name === 'Scan';

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        if (isScan) {
          return (
            <Pressable key={route.key} onPress={onPress} style={{ flex: 1, alignItems: 'center' }}>
              <View
                style={[
                  {
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: -28,
                    borderWidth: 5,
                    borderColor: colors.bg,
                  },
                  shadow.floating,
                ]}
              >
                <Ionicons name="scan-outline" size={26} color={colors.white} />
              </View>
            </Pressable>
          );
        }

        return (
          <Pressable key={route.key} onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons
              name={focused ? ICONS[route.name] : `${ICONS[route.name]}-outline`}
              size={24}
              color={focused ? colors.primary : colors.textMuted}
            />
            <AppText
              font={focused ? fonts.bodyExtraBold : fonts.bodyBold}
              color={focused ? colors.primary : colors.textMuted}
              style={{ fontSize: 10, marginTop: 3 }}
            >
              {route.name}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
