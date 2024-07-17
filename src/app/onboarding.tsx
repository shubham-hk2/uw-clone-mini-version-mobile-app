import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { PaginationItem } from '@/components/pagination-item';
import { translate } from '@/core';
import { Button, FocusAwareStatusBar, Image, Text, View } from '@/ui';
import LottieView from 'lottie-react-native';

export default function Onboarding() {
  const router = useRouter();
  const width = Dimensions.get('window').width;
  let progressValue = useSharedValue<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ImageBackground
      source={require('../../assets/onboarding-background.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <FocusAwareStatusBar />
        <Carousel
          pagingEnabled
          height={Dimensions.get('window').height * 0.68}
          loop
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
            setActiveIndex(Math.round(absoluteProgress));
          }}
          width={width}
          data={[
            {
              title: 'onboarding.personalCoaching',
              subtitle: 'onboarding.receiveCoaching',
              image: require('../../assets/lottie-onboarding-globe.json'),
            },
            {
              title: 'onboarding.studyFlexibility',
              subtitle: 'onboarding.practiceAnyTime',
              image: require('../../assets/lottie-onboarding-microscope.json'),
            },
            {
              title: 'onboarding.smartAdvice',
              subtitle: 'onboarding.makeProgress',
              image: require('../../assets/lottie-onboarding-book.json'),
            },
          ]}
          autoPlay={false}
          scrollAnimationDuration={500}
          renderItem={({ item }: { item: any }) => (
            <View style={styles.slide}>
              <LottieView
                source={item.image}
                loop
                autoPlay
                style={styles.animation}
                resizeMode="contain"
              />
              <Text style={styles.title}>{translate(item.title)}</Text>
              <Text style={styles.subtitle}>{translate(item.subtitle)}</Text>
            </View>
          )}
        />
        <View
          style={{
            gap: 6,
            width: 'auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 50,
          }}
        >
          {Array.from({ length: 3 }).map((backgroundColor, index) => {
            return (
              <PaginationItem
                animValue={progressValue}
                activeIndex={activeIndex}
                index={index}
                key={index}
                isRotate={false}
                length={3}
              />
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="onboarding.getStarted"
            onPress={() => router.push('/register')}
            textStyle={styles.getStartedButtonText}
            style={{
              backgroundColor: '#FF6900',
              borderColor: '#C45100',
              borderBottomWidth: 4,
            }}
          />
          <Text
            style={styles.linkButton}
            onPress={() => {
              router.push({
                pathname: '/register',
                params: {
                  isLogin: 'true',
                },
              });
            }}
          >
            {translate('onboarding.ialreadyhaveanaccount')}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 89,
    paddingBottom: 30,
  },
  dotStyle: {
    width: 16,
    height: 3,
    opacity: 0.3,
  },
  activeDotStyle: {
    width: 24,
    height: 3,
    opacity: 1,
    backgroundColor: '#000000',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    aspectRatio: 1,
    width: '90%',
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    color: '#000000',
    letterSpacing: -0.5,

    fontFamily: 'Poppins_700Bold',
  },
  subtitle: {
    marginTop: 3,
    textAlign: 'center',
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 48,
  },
  buttonContainer: {
    marginTop: 'auto',
    width: '100%',
    paddingHorizontal: 16,
  },
  linkButton: {
    color: '#F2F2F2',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins_600SemiBold',
    textTransform: 'uppercase',
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
  },
  animation: {
    // height: 284,
    // width: 253,
    width: '100%',
    flex: 1,
    // marginBottom: 40,
  },
});
