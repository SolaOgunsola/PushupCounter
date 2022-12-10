import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function Counter({ count, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {title} {count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 45,
  },
});

export default Counter;
