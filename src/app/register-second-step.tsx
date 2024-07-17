import React, { useEffect, useRef } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import * as z from 'zod';

import { translate } from '@/core';
import useKeyboardVisibility from '@/core/hooks/use-keyboard-visibility';
import { setItem } from '@/core/storage';
import { useRegisterStore } from '@/core/stores/registerStore/store';
import type { ProgressBarRef } from '@/ui';
import { Button, Text, View } from '@/ui';

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export default function RegisterSecondStep({ setActive }: { setActive: any }) {
  const isValidName = (text: string) =>
    /^[a-zA-Z\s]+$/.test(text) && text.trim() !== '';
  const [focus, setFocus] = React.useState<boolean>(false);

  const [name, setName] = React.useState<string>('');
  const progressBarRef = useRef<ProgressBarRef>(null);
  const { add } = useRegisterStore();
  const nameInputRef = useRef<TextInput>(null);

  const isKeyboardVisible = useKeyboardVisibility();

  useEffect(() => {
    progressBarRef.current?.setProgress(40);

    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>
            {translate('registerSecond.nameTitle')}
          </Text>
          <TextInput
            style={[
              styles.textInput,
              focus && isKeyboardVisible && styles.textInputFocused,
            ]}
            placeholder="Full name"
            ref={nameInputRef}
            placeholderTextColor="#B3C1D3"
            value={name}
            onChangeText={(e) => {
              setName(e);
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Button
            disabled={!name || isValidName(name) === false}
            label="registerSecond.nextButton"
            style={[
              styles.nextButton,
              isKeyboardVisible && { marginBottom: 20 },
            ]}
            textStyle={styles.btn_text}
            onPress={() => {
              setItem('name', name);
              add({ name: name });
              setActive(2);
            }}
          />
        </View>
      </ScrollView>
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
  inputContainer: {
    flexDirection: 'column',
  },

  title: {
    fontSize: 34,
    color: '#000',
    marginBottom: 16,
    fontFamily: 'Poppins_700Bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  textInput: {
    height: 52,
    width: '100%',
    paddingLeft: 16,
    backgroundColor: '#F2F5F7',
    fontSize: 18,
    color: '#000',
    borderRadius: 12,
    fontFamily: 'Poppins_500Medium',
  },
  textInputFocused: {
    borderColor: '#000',
    borderWidth: 1,
  },
  nextButton: {
    marginTop: 'auto',
    textAlign: 'center',
  },
  btn_text: {
    fontFamily: 'Poppins_700Bold',
  },
});
