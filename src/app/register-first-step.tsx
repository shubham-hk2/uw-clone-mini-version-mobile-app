import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import * as z from 'zod';

import { useGenerateOTP, useVerifyOTP } from '@/api/otp';
import Flag from '@/components/icons/flag';
import { translate, useAuth } from '@/core';
import { setToken } from '@/core/auth/utils';
import { getAndSaveFCMToken } from '@/core/hooks/use-fcm';
import useKeyboardVisibility from '@/core/hooks/use-keyboard-visibility';
import { useRegisterStore } from '@/core/stores/registerStore/store';
import { useUserDataStore } from '@/core/stores/user-store';
import { Button, showErrorMessage, Text, View } from '@/ui';

const schema = z.object({
  phone_number: z
    .string({
      required_error: 'Phone Number is required.',
    })
    .length(9, {
      message: 'Phone Number must be 9 characters long.',
    }),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export default function RegisterFirstStep({ setActive }: { setActive: any }) {
  const router = useRouter();
  const { isLogin } = useLocalSearchParams();
  const [phone, setPhone] = useState<string>('');
  const isKeyboardVisible = useKeyboardVisibility();
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const signIn = useAuth.use.signIn();
  const phoneInputRef = useRef<TextInput>(null);
  const [code, setCode] = useState(['', '', '', '']);
  const codeInputs = useRef<Array<TextInput | null>>([]);
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const { add } = useRegisterStore();
  const setUserData = useUserDataStore((state) => state.setUserData);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit: handleOTPSubmit,
    control: controlSubmit,
    getValues,
  } = useForm<any>();

  const { mutate: generateOTP, isPending } = useGenerateOTP({
    onSuccess(data, variables) {
      setPhone(variables.phone_number);
      setIsPhoneSubmitted(true);
      console.log(data);
    },
    onError(error: any) {
      console.log(error);
      // showError(error);
      showErrorMessage(error?.response?.data?.message);
    },
  });

  const { mutate: verifyOTP, isPending: isVerifyOTPLoading } = useVerifyOTP({
    async onSuccess(data) {
      if (isLogin) {
        if (data?.user) {
          await signIn(data?.token);

          await getAndSaveFCMToken();
          setUserData(data?.user);
          router.push('/(app)');
        } else {
          setToken(data?.token);
          setUserData(data?.user);
          setActive(1);
        }
      } else if (!isLogin) {
        setActive(1);
        setToken(data?.token);
        add({ phone_number: phone });
      }
    },
    onError(error: any) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
    },
  });

  const onSubmit: SubmitHandler<FormType> = (data: FormType) => {
    data.phone_number = `+94${data.phone_number}`;
    generateOTP(data);
  };

  const onSubmitOTP: SubmitHandler<any> = () => {
    const data = getValues();

    const newData = {
      phone_number: phone,
      otp:
        data['codeInput-0'] +
        data['codeInput-1'] +
        data['codeInput-2'] +
        data['codeInput-3'],
    };

    if (newData.otp.length < 4) {
      showErrorMessage('Please enter a valid OTP');
      return;
    }

    verifyOTP(newData);
  };

  useEffect(() => {
    if (isPhoneSubmitted && codeInputs.current[0]) {
      codeInputs.current[0]?.focus();
    }
  }, [isPhoneSubmitted]);

  useEffect(() => {
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (errors.phone_number?.message) {
      showErrorMessage(errors.phone_number?.message);
    }
  }, [errors]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      if (isResendEnabled) {
        setIsResendEnabled(true);
      }
    }
  }, [resendTimer, isPhoneSubmitted, isResendEnabled]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      {!isPhoneSubmitted && (
        <View style={styles.phoneInputContainer}>
          <Text style={styles.title}>
            {translate('registerFirst.enterPhone')}
          </Text>
          <Text style={styles.description}>
            {translate('registerFirst.phoneText')}
          </Text>
          <View style={styles.phoneInputWrapper}>
            <View style={styles.countryCodeText}>
              <Flag />
              <Text>+94</Text>
            </View>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType="numeric"
                  style={[
                    styles.phoneInput,
                    isKeyboardVisible && styles.phoneInputActive,
                  ]}
                  onChangeText={(e) => {
                    onChange(e);
                    setPhone(e);
                  }}
                  value={value}
                  ref={phoneInputRef}
                  onBlur={onBlur}
                  placeholder="Enter your number"
                  accessibilityLabel="inputPhoneNumber" // Maestro E2E: For iOS testing
                  testID="inputPhoneNumber" // Maestro E2E: For Android testing
                />
              )}
              name="phone_number"
            />
          </View>
        </View>
      )}

      {!isPhoneSubmitted && (
        <Button
          textStyle={styles.btn_text}
          label="registerFirst.nextButton"
          style={styles.nextButton}
          onPress={handleSubmit(onSubmit)}
          disabled={!!errors.phone_number || phone.length !== 9}
          loading={isPending}
        />
      )}

      {isPhoneSubmitted && (
        <View style={styles.codeInputContainer}>
          <Text style={styles.title}>{translate('registerOtp.enterOtp')}</Text>
          <Text style={styles.description}>
            {translate('registerOtp.otpText')} {phone}.{' '}
            <Text
              style={styles.changeText}
              onPress={() => setIsPhoneSubmitted(false)}
            >
              {translate('registerFirst.change')}
            </Text>
          </Text>
          <View style={styles.codeInputWrapper}>
            {[...Array(4)].map((_, index) => (
              <Controller
                key={index}
                control={controlSubmit}
                name={`codeInput-${index}`} // Unique name for each input
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (codeInputs.current[index] = ref)}
                    style={styles.codeInput}
                    maxLength={1}
                    keyboardType="numeric"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      onChange(text);
                      const newCode = [...code];
                      newCode[index] = text;
                      setCode(newCode);
                      if (text && index < 3) {
                        codeInputs.current[index + 1]?.focus();
                      }
                    }}
                    onKeyPress={({ nativeEvent }) => {
                      if (
                        nativeEvent.key === 'Backspace' &&
                        index > 0 &&
                        !code[index]
                      ) {
                        codeInputs.current[index - 1]?.focus();
                      }
                    }}
                    accessibilityLabel={`inputVerificationCode${index + 1}`}
                    testID={`inputVerificationCode${index + 1}`}
                  />
                )}
              />
            ))}
          </View>
        </View>
      )}

      {isPhoneSubmitted && (
        <View style={styles.buttonContainer}>
          <Button
            textStyle={styles.btn_text}
            disabled={!phone}
            label="registerFirst.nextButton"
            style={styles.nextButton}
            onPress={handleOTPSubmit(onSubmitOTP)}
            loading={isVerifyOTPLoading}
            testID="buttonNextVerification" // Maestro E2E: For Android testing
            accessibilityLabel="buttonNextVerification" // Maestro E2E: For iOS testing
          />
          <Button
            disabled={!isResendEnabled}
            label={`${translate('registerOtp.resendButton')} ${
              resendTimer > 0 ? `(${resendTimer}s)` : ''
            }`}
            style={styles.resendButton}
            loading={isPending}
            onPress={() => {
              if (isResendEnabled) {
                setResendTimer(60);
                setIsResendEnabled(false);
                generateOTP({ phone_number: phone });
              }
            }}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 51,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
    paddingRight: 16,
    gap: 10,
  },
  closeButton: {
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
  phoneInputContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 34,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 18,
    marginBottom: 25,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
  },
  countryCodeText: {
    fontSize: 16,
    height: 52,
    width: 96,
    maxWidth: 96,
    borderRadius: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '##D8E0EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneInput: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#000',
    flex: 1,
    width: '100%',
    borderRadius: 12,
    fontFamily: 'Poppins_500Medium',
  },
  phoneInputActive: {
    borderColor: '#000',
  },
  nextButton: {
    marginTop: 'auto',
    textAlign: 'center',
  },
  btn_text: {
    fontFamily: 'Poppins_700Bold',
  },
  codeInputContainer: {
    flexDirection: 'column',
  },
  changeText: {
    color: '#2E00E5',
  },
  codeInputWrapper: {
    flexDirection: 'row',
  },
  codeInput: {
    backgroundColor: '#F2F5F7',
    marginRight: 8,
    width: 48,
    height: 56,
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 12,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 'auto',
  },
  resendButton: {
    marginTop: 'auto',
    textAlign: 'center',
  },
});
