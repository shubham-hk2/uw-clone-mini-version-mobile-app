import type { AxiosError } from 'axios';
import { Dimensions, Platform } from 'react-native';
import { StatusBar } from 'react-native';
import { showMessage } from 'react-native-flash-message';
export const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('screen');

export const WIDTH = width;
export const HEIGHT = height;

// for onError react queries and mutations
export const showError = (error: AxiosError) => {
  const description = extractError(error?.response?.data).trimEnd();

  showMessage({
    message: 'Error',
    description,
    type: 'danger',
    duration: 4000,
    icon: 'danger',
    statusBarHeight: StatusBar.currentHeight,
  });
};

export const showErrorMessage = (message: string = 'Something went wrong ') => {
  showMessage({
    message,
    type: 'danger',
    duration: 4000,
    statusBarHeight: StatusBar.currentHeight,
  });
};

export const extractError = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    const messages = data.map((item) => {
      return `  ${extractError(item)}`;
    });

    return `${messages.join('')}`;
  }

  if (typeof data === 'object' && data !== null) {
    const messages = Object.entries(data).map((item) => {
      const [key, value] = item;
      const separator = Array.isArray(value) ? ':\n ' : ': ';

      return `- ${key}${separator}${extractError(value)} \n `;
    });
    return `${messages.join('')} `;
  }
  return 'Something went wrong ';
};

export function getInitials(name: string) {
  if (!name) return '';

  const namesArray = name.trim().split(' ');
  if (namesArray.length === 1) return namesArray[0].charAt(0).toUpperCase();

  return (
    namesArray[0].charAt(0).toUpperCase() +
    namesArray[namesArray.length - 1].charAt(0).toUpperCase()
  );
}
