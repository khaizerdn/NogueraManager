// File: src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { container, title } from '../config/GlobalStyles';

export default function HomeScreen() {
  return (
    <View style={[container]}>
      <Text style={title}>Welcome to the Home Screen!</Text>
    </View>
  );
}
