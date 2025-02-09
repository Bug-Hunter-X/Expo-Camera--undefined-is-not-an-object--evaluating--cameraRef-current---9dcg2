import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        console.log('Photo taken:', photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View>Requesting Permissions</View>;
  }
  if (hasPermission === false) {
    return <View>No access to camera</View>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
          <TouchableOpacity style={{ backgroundColor: 'grey', padding: 10 }} onPress={() => {setType(type === CameraType.back ? CameraType.front : CameraType.back)}}>Switch Camera</TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'green', padding: 10 }} onPress={takePicture}>Take Picture</TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraComponent;