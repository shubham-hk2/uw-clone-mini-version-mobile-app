import React from 'react';
import { StyleSheet, View } from 'react-native';

const Skeleton = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonContent}>
      <View style={styles.skeletonText} />
      <View style={styles.skeletonProgressBar} />
      <View style={styles.skeletonNumber} />
    </View>
  </View>
);

export default Skeleton;

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  skeletonImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
  },
  skeletonContent: {
    flex: 1,
    marginLeft: 20,
  },
  skeletonText: {
    height: 20,
    width: '60%',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  skeletonProgressBar: {
    height: 6,
    width: '100%',
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
  },
  skeletonNumber: {
    height: 15,
    width: 40,
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-end',
  },
});
