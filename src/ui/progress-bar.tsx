import { LinearGradient } from 'expo-linear-gradient';
import React, { forwardRef, useImperativeHandle } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  initialProgress?: number;
  style?: ViewStyle | ViewStyle[];
  color?: string;
  height?: number;
  bgColor?: string;
  innerText?: string;
  isGradient?: boolean;
  gradientColors?: string[];
  isTimeLeft?: boolean;
};

export type ProgressBarRef = {
  setProgress: (value: number) => void;
};

export const ProgressBar = forwardRef<ProgressBarRef, Props>(
  (
    {
      initialProgress = 0,
      style,
      color = '#FF6900',
      height = 16,
      bgColor = '#D9D9D9',
      innerText = null,
      isGradient = false,
      gradientColors = ['#FF6900', '#FF8E3C'],
      isTimeLeft,
    },
    ref
  ) => {
    const progress = useSharedValue<number>(initialProgress ?? 0);

    useImperativeHandle(
      ref,
      () => ({
        setProgress: (value: number) => {
          progress.value = withTiming(value, {
            duration: 1000,
            easing: Easing.linear,
          });
        },
      }),
      [progress]
    );

    const animatedStyle = useAnimatedStyle(() => ({
      width: `${progress.value}%`,
      height,
      backgroundColor: isGradient ? undefined : color,
      borderRadius: 35,
    }));

    return (
      <View
        style={[
          styles.container,
          style,
          {
            backgroundColor: bgColor,
            height,
          },
        ]}
      >
        {/* {innerText && isTimeLeft && (
          <Text style={styles.inner_text}>{innerText}</Text>
        )} */}
        <Animated.View style={[styles.progressContainer, animatedStyle]}>
          {isGradient ? (
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            />
          ) : null}
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9D9D9',
    borderRadius: 35,
    overflow: 'hidden',
  },
  progressContainer: {
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  inner_text: {
    position: 'absolute',
    color: 'white',
    zIndex: 1,
    left: 0,
    bottom: 0,
    marginLeft: 10,
    fontSize: 12,
  },
});
