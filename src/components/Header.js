import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import { colors, fonts, shadow } from '../theme';

function RoundIcon({ name, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: colors.card,
          alignItems: 'center',
          justifyContent: 'center',
        },
        shadow.soft,
      ]}
    >
      <Ionicons name={name} size={20} color={colors.heading} />
    </Pressable>
  );
}

// Centered serif title with optional round icon buttons on each side.
export default function Header({ title, leftIcon, rightIcon, onLeft, onRight }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 18,
      }}
    >
      <View style={{ width: 44 }}>
        {leftIcon ? <RoundIcon name={leftIcon} onPress={onLeft} /> : null}
      </View>
      <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 26 }}>
        {title}
      </AppText>
      <View style={{ width: 44, alignItems: 'flex-end' }}>
        {rightIcon ? <RoundIcon name={rightIcon} onPress={onRight} /> : null}
      </View>
    </View>
  );
}
