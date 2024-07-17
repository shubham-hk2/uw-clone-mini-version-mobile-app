import React from 'react';
import { View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const PaginationItem: React.FC<{
  index: number;
  length: number;
  animValue: SharedValue<number>;
  isRotate?: boolean;
  activeIndex: number;
}> = ({ index, length, animValue, activeIndex }) => {
  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [16, 34, 16]; // Width values for inactive and active states

    if (index === 0 && animValue.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
    }

    const width = interpolate(
      animValue.value,
      inputRange,
      outputRange,
      Extrapolation.CLAMP
    );

    return {
      width,
      height: 6,
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        width: index === activeIndex ? 24 : 16,
        height: 3,
        opacity: index === activeIndex ? 1 : 0.3,
        backgroundColor: '#000000',
      }}
    >
      <Animated.View style={[animStyle]} />
    </View>
  );
};
