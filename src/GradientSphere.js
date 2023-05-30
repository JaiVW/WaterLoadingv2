import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientSphere = () => {
  return (
    <LinearGradient
      colors={['#ff00ff', '#00ffff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.sphere}
    />
  );
};

const styles = StyleSheet.create({
  sphere: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default GradientSphere;
