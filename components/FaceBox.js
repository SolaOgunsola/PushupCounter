import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function FaceBox(props) {
  return (
    <View style={styles.faceBox}>
      <MaterialCommunityIcons
        name='dots-circle'
        size={40}
        color={colors.white}
      />
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
