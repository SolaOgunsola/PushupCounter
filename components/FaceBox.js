import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';

import colors from '../config/colors';

function FaceBox({ style }) {
  return (
    <View style={[styles.faceBox, style]}>
      <Octicons name='dot-fill' size={30} color={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  faceBox: {
    backgroundColor: 'transparent',
    borderColor: colors.white,
    borderWidth: 0.2,
    height: 200,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FaceBox;
