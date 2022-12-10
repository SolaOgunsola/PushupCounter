import React from 'react';
import { View, StyleSheet, Switch, Text } from 'react-native';
import colors from '../config/colors';

function DebugSwitch({ onValueChange, value, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>Debug Info: </Text>
      <Switch
        trackColor={{ false: 'red', true: 'red' }}
        ios_backgroundColor='#3e3e3e'
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
});

export default DebugSwitch;
