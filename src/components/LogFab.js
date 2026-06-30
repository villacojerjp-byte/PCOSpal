import { useRef, useState } from 'react';
import { View, Pressable, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import { logActions } from '../data/content';
import { colors, fonts, radius, shadow } from '../theme';

export default function LogFab({ onSelect }) {
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const to = open ? 0 : 1;
    setOpen(!open);
    Animated.parallel([
      Animated.timing(anim, { toValue: to, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(rotate, { toValue: to, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  };

  const spin = rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '135deg'] });

  return (
    <View style={{ position: 'absolute', right: 20, bottom: 24, alignItems: 'flex-end' }} pointerEvents="box-none">
      {open && (
        <View style={{ alignItems: 'flex-end', marginBottom: 14 }}>
          {logActions.map((a, i) => {
            const translateY = anim.interpolate({
              inputRange: [0, 1],
              outputRange: [20 * (logActions.length - i), 0],
            });
            return (
              <Animated.View key={a.id} style={{ opacity: anim, transform: [{ translateY }], marginBottom: 12 }}>
                <Pressable
                  onPress={() => {
                    toggle();
                    onSelect && onSelect(a);
                  }}
                  style={[
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.card,
                      paddingVertical: 13,
                      paddingHorizontal: 20,
                      borderRadius: radius.pill,
                    },
                    shadow.card,
                  ]}
                >
                  <AppText style={{ fontSize: 18, marginRight: 10 }}>{a.emoji}</AppText>
                  <AppText font={fonts.displaySemiBold} color={colors.heading} style={{ fontSize: 16 }}>
                    {a.label}
                  </AppText>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      )}

      <Pressable onPress={toggle}>
        <Animated.View
          style={[
            {
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ rotate: spin }],
            },
            shadow.floating,
          ]}
        >
          <Ionicons name="add" size={34} color={colors.white} />
        </Animated.View>
      </Pressable>
    </View>
  );
}
