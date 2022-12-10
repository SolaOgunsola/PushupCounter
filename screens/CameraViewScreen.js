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
import FaceBox from '../components/FaceBox';
import Counter from '../components/Counter';

const detectionInterval = 100;
var count = 0;

function countRepDown(width) {
  return width > 450;
}

function countRepUp(width) {
  return width < 200;
}

function CameraViewScreen(props) {
  const [faceData, setFaceData] = useState([]);
  const [isCollecting, setIsCollecting] = useState(false);

  const [buttonTitle, setButtonTitle] = useState('Start');
  const [buttonColor, setButtonColor] = useState('secondary');

  //State's for rep counting
  const [isCheckingDownRep, setIsCheckingDownRep] = useState(true);
  const [isCheckingUpRep, setIsCheckingUpRep] = useState(false);

  /**
   *  Display face data on the screen
   * @returns Width of face, position of face in X, Y coords
   */
  function getFaceDataView() {
    if (faceData.length === 0) {
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDesc}>No faces detected</Text>
        </View>
      );
    } else {
      return faceData.map((face, index) => {
        const width = face.bounds.size.width;
        const originX = face.bounds.origin.x;
        const originY = face.bounds.origin.y;
        return (
          <View style={styles.faces} key={index}>
            <Text style={styles.faceDesc}>Width: {width.toString()}</Text>
            <Text style={styles.faceDesc}>OriginX: {originX.toString()}</Text>
            <Text style={styles.faceDesc}>OriginY: {originY.toString()}</Text>
          </View>
        );
      });
    }
  }

  const handleFacesDetected = ({ faces }) => {
    if (isCollecting === true) {
      setFaceData(faces);

      const width = faces[0].bounds.size.width;
      if (isCheckingDownRep) {
        if (countRepDown(width)) {
          setIsCheckingDownRep(false);
          setIsCheckingUpRep(true);
        }
      }
      if (isCheckingUpRep) {
        if (countRepUp(width)) {
          count += 1;
          setIsCheckingUpRep(false);
          setIsCheckingDownRep(true);
        }
      }
    }
  };

  /**
   * Function to manage the button handling.
   */
  function handlePress() {
    if (buttonTitle === 'Start') {
      setButtonTitle('Stop');
      setButtonColor('primary');
      setIsCollecting(true);
    } else {
      setButtonTitle('Start');
      setButtonColor('secondary');
      setIsCollecting('False');
    }
  }

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
          minDetectionInterval: detectionInterval,
          tracking: true,
        }}
      >
        {getFaceDataView()}
        <FaceBox />
      </Camera>
      <Button title={buttonTitle} color={buttonColor} onPress={handlePress} />
      <Counter title='Reps:' count={count} />
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
