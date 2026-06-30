import { View } from 'react-native';
import AppText from './AppText';
import { colors, fonts, radius, shadow } from '../theme';

const SCORE_COLORS = {
  E: colors.scoreE,
  D: colors.scoreD,
  C: colors.scoreC,
  B: colors.scoreB,
  A: colors.scoreA,
};

// Nutri-Score style scale E D C B A with the active grade enlarged.
export default function ScoreScale({ scale = ['E', 'D', 'C', 'B', 'A'], active = 'A' }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.card,
          borderRadius: radius.pill,
          padding: 6,
          alignItems: 'center',
          ...shadow.soft,
        }}
      >
        {scale.map((g) => {
          const isActive = g === active;
          const dim = 44;
          if (isActive) {
            return (
              <View
                key={g}
                style={[
                  {
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: SCORE_COLORS[g],
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  shadow.soft,
                ]}
              >
                <AppText font={fonts.displayBold} color={colors.white} style={{ fontSize: 28 }}>
                  {g}
                </AppText>
              </View>
            );
          }
          return (
            <View
              key={g}
              style={{
                width: dim,
                height: dim,
                borderRadius: dim / 2,
                backgroundColor: SCORE_COLORS[g],
                opacity: 0.85,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 2,
              }}
            >
              <AppText font={fonts.displayBold} color={colors.white} style={{ fontSize: 18 }}>
                {g}
              </AppText>
            </View>
          );
        })}
      </View>
    </View>
  );
}
