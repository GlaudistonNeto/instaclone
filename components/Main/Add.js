import React from 'react'
import { StyleSheet, View, Text } from 'react-native';

export default function Add() {
  return (
    <View style={StyleSheet.container}>
      <Text>Add Screen</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
