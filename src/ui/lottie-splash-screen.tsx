import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LottieSplashScreen() {
  return (
    <ImageBackground
      source={require('../../assets/onboarding-background.png')}
      style={styles.container}
    >
      <LottieView
        source={require('../../assets/lottie-logo-v1.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Set this to match your design
  },
  lottie: {
    width: width * 1.2,
    height: height * 0.6,
  },
});
