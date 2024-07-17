import React, { useRef, useState } from 'react';
import type { PressableProps, StyleProp, TextStyle, View } from 'react-native';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import type { TxKeyPath } from '@/core';
import { translate } from '@/core';

const buttonStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    fontFamily: 'Poppins_700Bold',
  },
  label: {
    fontSize: 16,

    fontFamily: 'Poppins_700Bold',
  },
  indicator: {
    height: 24,
    color: '#FFFFFF',
  },
  defaultContainer: {
    backgroundColor: '#FF6900',
    borderBottomWidth: 4,
    borderBottomColor: '#A0A0A0',
  },
  defaultLabel: {
    color: '#FFFFFF',
  },
  defaultIndicator: {
    color: '#FFFFFF',
  },
  secondaryContainer: {
    backgroundColor: '#394F5F',
  },
  secondaryLabel: {
    color: '#FF6900',
  },
  secondaryIndicator: {
    color: '#FFFFFF',
  },
  outlineContainer: {
    borderColor: '#DDDDDD',
    borderBottomWidth: 4,
  },
  outlineLabel: {
    color: '#C45100',
  },
  outlineIndicator: {
    color: '#C45100',
  },
  destructiveContainer: {
    backgroundColor: '#FF0000',
  },
  destructiveLabel: {
    color: '#FFFFFF',
  },
  destructiveIndicator: {
    color: '#FFFFFF',
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  ghostLabel: {
    color: '#000000',
    textDecorationLine: 'underline',
  },
  ghostIndicator: {
    color: '#000000',
  },
  linkContainer: {
    backgroundColor: 'transparent',
  },
  linkLabel: {
    color: '#808080',
  },
  linkIndicator: {
    color: '#808080',
  },
  sizeDefaultContainer: {
    height: 56,
  },
  sizeDefaultLabel: {
    fontSize: 16,
  },
  sizeLgContainer: {
    height: 48,
    paddingHorizontal: 32,
  },
  sizeLgLabel: {
    fontSize: 20,
  },
  sizeSmContainer: {
    height: 32,
    paddingHorizontal: 12,
  },
  sizeSmLabel: {
    fontSize: 12,
  },
  sizeSmIndicator: {
    height: 8,
  },
  sizeIconContainer: {
    height: 36,
    width: 36,
  },
  disabledContainer: {
    backgroundColor: '#F2F5F7',
    borderBottomWidth: 4,
    borderBottomColor: '#F2F5F7',
  },
  disabledLabel: {
    color: '#B3C1D3',
    fontFamily: 'Poppins_700Bold',
  },
  disabledIndicator: {
    color: '#A0A0A0',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  opacity75: {
    opacity: 0.75,
  },
  opacity100: {
    opacity: 1,
  },
});

interface Props extends Omit<PressableProps, 'disabled'> {
  label?: string;
  loading?: boolean;
  variant?:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'destructive'
    | 'ghost'
    | 'link';
  size?: 'default' | 'lg' | 'sm' | 'icon';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = React.forwardRef<View, Props>(
  (
    {
      label: text,
      loading = false,
      variant = 'default',
      disabled = false,
      size = 'default',
      fullWidth = true,
      testID,
      style,
      textStyle,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);
    const scale = useRef(new Animated.Value(1)).current;
    // const scaleY = useRef(new Animated.Value(1)).current;
    const animateIn = () => {
      Animated.spring(scale, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    };

    const animateOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        // friction: 3,
        // tension: 40,
      }).start();
    };
    const getContainerStyle = () => {
      const baseStyles = [
        buttonStyles.container,
        buttonStyles[`${variant}Container` as keyof typeof buttonStyles],
        buttonStyles[
          `size${
            size.charAt(0).toUpperCase() + size.slice(1)
          }Container` as keyof typeof buttonStyles
        ],
        disabled && buttonStyles.disabledContainer,
        fullWidth ? buttonStyles.fullWidth : buttonStyles.selfCenter,
        isPressed ? buttonStyles.opacity75 : buttonStyles.opacity100,
      ];
      return StyleSheet.flatten([baseStyles.filter(Boolean) as any, style]);
    };

    const getLabelStyle = () => {
      const baseStyles = [
        buttonStyles.label,
        buttonStyles[`${variant}Label` as keyof typeof buttonStyles],
        buttonStyles[
          `size${
            size.charAt(0).toUpperCase() + size.slice(1)
          }Label` as keyof typeof buttonStyles
        ],
        disabled && buttonStyles.disabledLabel,
        { fontFamily: 'Poppins_700Bold' }, // Add this to the array instead
      ];
      return StyleSheet.flatten(baseStyles.filter(Boolean));
    };

    const getIndicatorStyle = () => {
      const baseStyles = [
        buttonStyles.indicator,
        buttonStyles[`${variant}Indicator` as keyof typeof buttonStyles],
        buttonStyles[
          `size${
            size.charAt(0).toUpperCase() + size.slice(1)
          }Indicator` as keyof typeof buttonStyles
        ],
        disabled && buttonStyles.disabledIndicator,
      ];
      return StyleSheet.flatten([baseStyles.filter(Boolean)]);
    };

    return (
      <Animated.View style={{ transform: [{ scale }], marginTop: 'auto' }}>
        <Pressable
          disabled={disabled || loading}
          style={getContainerStyle()}
          {...props}
          ref={ref}
          testID={testID}
          onPressIn={() => {
            setIsPressed(true);
            animateIn();
          }}
          onPressOut={() => {
            setIsPressed(false);
            animateOut();
          }}
        >
          {props.children ? (
            props.children
          ) : (
            <>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  style={getIndicatorStyle() as any}
                  testID={testID ? `${testID}-activity-indicator` : undefined}
                />
              ) : (
                <Text
                  testID={testID ? `${testID}-label` : undefined}
                  style={[getLabelStyle(), textStyle]}
                >
                  {translate(text as TxKeyPath)}
                </Text>
              )}
            </>
          )}
        </Pressable>
      </Animated.View>
    );
  }
);
