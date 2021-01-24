import React from 'react'
import { StyleSheet, View, Text } from 'react-native';

export default function Profile() {
  return (
    <View style={StyleSheet.container}>
      <Text>Profile Screen</Text>
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
