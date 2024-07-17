import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const FullWidthSkeleton = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonImage}>
      <Svg
        width={40}
        height={40}
        viewBox="0 0 20 18"
        fill="currentColor"
        style={styles.icon}
      >
        <Path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </Svg>
    </View>
  </View>
);

export default FullWidthSkeleton;

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  skeletonImage: {
    width: Dimensions.get('window').width - 40, // Full width minus padding
    height: 131, // Desired height for the rectangle
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#999999',
  },
});
