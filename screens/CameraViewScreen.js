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
import DebugSwitch from '../components/DebugSwitch';

/**
 * Facial detection interval
 */
const detectionInterval = 100;

/**
 * The amount of reps counted. Resets upon the app reloading.
 */
let repCount = 0;

/**
 * Criteria for counting the first half of a rep (going down).
 */
function countRepDown(width) {
  return width > 450;
}

/**
 * Criteria for counting the second half of a rep (going back up).
 */
function countRepUp(width) {
  return width < 200;
}

function CameraViewScreen(props) {
  const [faceData, setFaceData] = useState([]);
  const [isCollecting, setIsCollecting] = useState(false);

  const [buttonTitle, setButtonTitle] = useState('Start');
  const [buttonColor, setButtonColor] = useState('secondary');

  const [isCheckingDownRep, setIsCheckingDownRep] = useState(true);
  const [isCheckingUpRep, setIsCheckingUpRep] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  /**
   *  Display face data on the screen
   * @returns Width of face, position of face in X, Y coords
   */
  function getFaceDataView() {
    if (!isEnabled) return;
    if (faceData.length === 0) {
      return (
        <View style={styles.face}>
          <Text style={styles.faceDebugInfo}>No faces detected</Text>
        </View>
      );
    } else {
      return faceData.map((face, index) => {
        const width = face.bounds.size.width;
        const originX = face.bounds.origin.x;
        const originY = face.bounds.origin.y;
        return (
          <View style={styles.face} key={index}>
            <Text style={styles.faceDebugInfo}>Width: {width.toString()}</Text>
            <Text style={styles.faceDebugInfo}>
              OriginX: {originX.toString()}
            </Text>
            <Text style={styles.faceDebugInfo}>
              OriginY: {originY.toString()}
            </Text>
          </View>
        );
      });
    }
  }

  /**
   *
   * Handle what happens each instance that a face is detected. Called repeatedly based on minDetectionInterval.
   */
  const handleFacesDetected = ({ faces }) => {
    if (isCollecting === true) {
      setFaceData(faces);
      countReps(faces);
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

  /**
   *
   * Functionality for counting reps.
   */
  function countReps(faces) {
    try {
      const width = faces[0].bounds.size.width;
      if (isCheckingDownRep) {
        if (countRepDown(width)) {
          setIsCheckingDownRep(false);
          setIsCheckingUpRep(true);
        }
      }
      if (isCheckingUpRep) {
        if (countRepUp(width)) {
          repCount += 1;
          setIsCheckingUpRep(false);
          setIsCheckingDownRep(true);
        }
      }
    } catch (error) {
      console.log('No face detected');
      setIsCheckingUpRep(false);
      setIsCheckingDownRep(true);
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
        <FaceBox style={styles.faceBox} />
      </Camera>
      <View style={styles.counterContainer}>
        <Button title={buttonTitle} color={buttonColor} onPress={handlePress} />
        <Counter title='Reps:' count={repCount} />
        <DebugSwitch
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ bottom: -200 }}
        />
      </View>
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
    flex: 1,
  },
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  face: {
    backgroundColor: colors.white,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  faceBox: {
    top: 100,
    position: 'absolute',
  },
  faceDebugInfo: {
    fontSize: 20,
  },
});

export default CameraViewScreen;
