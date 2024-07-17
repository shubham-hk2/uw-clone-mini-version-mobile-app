import { cssInterop } from 'nativewind';
import Svg from 'react-native-svg';

export * from './button';
export { default as colors } from './colors';
export * from './focus-aware-status-bar';
export * from './image';
export * from './lottie-splash-screen';
export * from './progress-bar';
export * from './tab-label';
export * from './text';
export * from './utils';

// export base components from react-native
export {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
export { SafeAreaView } from 'react-native-safe-area-context';

//Apply cssInterop to Svg to resolve className string into style
cssInterop(Svg, {
  className: {
    target: 'style',
  },
});
