import React from 'react';
import { StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

import Screen from '../components/Screen';

function CameraViewScreen(props) {
  return (
    <Screen style={styles.container}>
      <Camera style={styles.camera} type={CameraType.front} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  camera: {
    alignSelf: 'center',
    height: 300,
    width: 300,
  },
  container: {
    backgroundColor: '#2b2a2a',
  },
});

export default CameraViewScreen;
