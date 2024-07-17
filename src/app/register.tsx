import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import useKeyboardVisibility from '@/core/hooks/use-keyboard-visibility';
import type { ProgressBarRef } from '@/ui';
import { Image, ProgressBar, View } from '@/ui';

import RegisterFirstStep from './register-first-step';
import RegisterSecondStep from './register-second-step';

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const isKeyboardVisible = useKeyboardVisibility();
  const router = useRouter();
  const { isLogin } = useLocalSearchParams();

  const progressBarRef = useRef<ProgressBarRef>(null);

  useEffect(() => {
    switch (activeStep) {
      case 1:
        progressBarRef.current?.setProgress(40);
        break;
      case 2:
        progressBarRef.current?.setProgress(60);
        break;
      case 3:
        progressBarRef.current?.setProgress(80);
        break;
      case 4:
        progressBarRef.current?.setProgress(90);
        break;
      case 5:
        progressBarRef.current?.setProgress(100);
        break;

      default:
        // Handle any steps not explicitly covered above
        break;
    }
  }, [activeStep]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View
        style={[
          styles.innerContainer,
          isKeyboardVisible
            ? styles.containerKeyboardVisible
            : styles.containerKeyboardHidden,
        ]}
      >
        {activeStep != 5 ? (
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                if (activeStep === 0) {
                  router.back();
                } else {
                  setActiveStep(activeStep - 1);
                }
              }}
            >
              <Image
                style={styles.backButton}
                contentFit="contain"
                source={
                  activeStep === 0
                    ? require('../../assets/close-button.png')
                    : require('../../assets/arrow-button.png')
                }
              />
            </TouchableOpacity>
            {!isLogin && (
              <View style={styles.progressBarContainer}>
                <ProgressBar
                  ref={progressBarRef}
                  style={styles.progressBar}
                  initialProgress={20}
                />
              </View>
            )}
          </View>
        ) : null}

        {activeStep === 0 && <RegisterFirstStep setActive={setActiveStep} />}
        {activeStep === 1 && <RegisterSecondStep setActive={setActiveStep} />}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 51,
    paddingBottom: 30,
  },
  containerKeyboardVisible: {
    paddingBottom: 6,
  },
  containerKeyboardHidden: {
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
    paddingRight: 16,
    gap: 10,
  },
  backButton: {
    width: 20,
    height: 20,
    aspectRatio: 1,
    marginLeft: 5,
    marginRight: 20,
  },

  progressBarContainer: {
    flex: 1,
    paddingRight: 16,
    borderRadius: 33,
  },
  progressBar: {
    borderRadius: 33,
  },
});
