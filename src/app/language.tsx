import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useSelectedLanguage } from '@/core';
import { useUserDataStore } from '@/core/stores/user-store';
import { Button, Image } from '@/ui';

const languages: {
  label: string;
  value: 'si' | 'ta' | 'en';
}[] = [
  { label: 'English', value: 'en' },
  { label: 'සිංහල', value: 'si' },
  { label: 'தமிழ்', value: 'ta' },
];

const LanguageSelectionScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const userData = useUserDataStore((state) => state.userData);

  const router = useRouter();
  const { from } = useLocalSearchParams<{ from?: string }>();
  const { setLanguage, changeLanguageLoggedIn } = useSelectedLanguage();

  const handleSelectLanguage = (language: 'si' | 'ta' | 'en') => {
    setSelectedLanguage(language);
  };

  useLayoutEffect(() => {
    if (userData?.language) {
      setSelectedLanguage(userData.language);
    }
  }, [userData?.language]);

  return (
    <ImageBackground
      source={require('../../assets/language-bg.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        {from === 'profile' && (
          <View style={styles.backContainer}>
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.backButton}
                contentFit="contain"
                source={require('../../assets/arrow-button.png')}
              />
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.header}>Select language</Text>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.value}
            style={[
              styles.languageOption,
              selectedLanguage === language.value &&
                styles.languageOptionSelected,
            ]}
            onPress={() => handleSelectLanguage(language.value)}
          >
            <Text
              style={[
                styles.languageLabel,
                selectedLanguage === language.value &&
                  styles.languageLabelSelected,
              ]}
            >
              {language.label}
            </Text>
            <View
              style={[
                styles.radioButton,
                selectedLanguage === language.value &&
                  styles.radioButtonSelected,
              ]}
            >
              {selectedLanguage === language.value && (
                <View style={styles.checkboxInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}
        <Button
          label="Select"
          variant="default"
          disabled={!selectedLanguage}
          style={styles.button}
          onPress={() => {
            if (from === 'profile') {
              setLanguage(selectedLanguage as 'si' | 'ta' | 'en');
              changeLanguageLoggedIn(selectedLanguage as 'si' | 'ta' | 'en');
            } else {
              setLanguage(selectedLanguage as 'si' | 'ta' | 'en');
              router.replace('/onboarding');
            }
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 51,
  },
  header: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 32,
    marginBottom: 32,
  },

  languageOption: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    padding: 19,
    borderColor: '#D8E0EA',
    backgroundColor: '#F2F3F7',
  },
  languageOptionSelected: {
    backgroundColor: '#EDF4FF',
  },
  languageLabel: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
  },
  languageLabelSelected: {
    fontFamily: 'Poppins_700Bold',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#FF6900',
    backgroundColor: '#FF6900',
    borderRadius: 9999,
  },
  checkboxInner: {
    width: 9,
    height: 9,
    borderRadius: 9999,
    color: '#EDF4FF',
    backgroundColor: '#EDF4FF',
  },
  button: {
    marginTop: 'auto',
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginRight: 20,
  },
});

export default LanguageSelectionScreen;
