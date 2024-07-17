import { Text } from './text';

const TabLabel = ({ focused, color, children }) => (
  <Text
    style={{
      color,
      fontSize: 10,
      fontFamily: focused ? 'Poppins_700Bold' : 'Poppins_600SemiBold',
    }}
  >
    {children}
  </Text>
);

export default TabLabel;
