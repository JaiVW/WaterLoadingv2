import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Day01 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Day 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'HelveticaLT93BlackExtended',
  },
});

export default Day01;
