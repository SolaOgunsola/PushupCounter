import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import {
  FaceDetectorClassifications,
  FaceDetectorLandmarks,
  FaceDetectorMode,
} from 'expo-face-detector';

import Screen from '../components/Screen';
import Button from '../components/Button';
import colors from '../config/colors';

function CameraViewScreen(props) {
  const [faceData, setFaceData] = useState([]);

  function getFaceDataView() {
    if (faceData.length === 0) {
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDesc}>No faces detected</Text>
        </View>
      );
    } else {
      return faceData.map((face, index) => {
        const eyesShut =
          face.rightEyeOpenProbability < 0.4 &&
          face.leftEyeOpenProbability < 0.4;
        const winking =
          !eyesShut &&
          (face.rightEyeOpenProbability < 0.4 ||
            face.leftEyeOpenProbability < 0.4);
        const smiling = face.smilingProbability > 0.7;
        return (
          <View style={styles.faces} key={index}>
            <Text style={styles.faceDesc}>
              Eyes shut: {eyesShut.toString()}
            </Text>
            <Text style={styles.faceDesc}>Winking: {winking.toString()}</Text>
            <Text style={styles.faceDesc}>Smiling: {smiling.toString()}</Text>
          </View>
        );
      });
    }
  }

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
    console.log(faces);
  };

  return (
    <Screen style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetectorMode.accurate,
          detectLandmarks: FaceDetectorLandmarks.none,
          runClassifications: FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        {getFaceDataView()}
      </Camera>
      <Button title='Start' onPress={null} />
      <Button title='Stop' onPress={null} color='secondary' />
    </Screen>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: '50%',
    width: '100%',
  },
  container: {
    backgroundColor: '#2b2a2a',
  },
  faces: {
    backgroundColor: colors.white,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  faceDesc: {
    fontSize: 20,
  },
});

export default CameraViewScreen;
