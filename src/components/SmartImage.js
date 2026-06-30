import { useState } from 'react';
import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Image with a soft branded placeholder shown while loading / on error,
// so the layout always looks intentional even if a remote image fails.
export default function SmartImage({ source, style, radius = 0, icon = 'image-outline' }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={[{ backgroundColor: colors.primarySoft, borderRadius: radius, overflow: 'hidden' }, style]}>
      {!failed ? (
        <Image
          source={source}
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      ) : null}
      {(failed || !loaded) && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name={icon} size={26} color={colors.primaryLight} />
        </View>
      )}
    </View>
  );
}
