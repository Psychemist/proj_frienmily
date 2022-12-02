import React, { useState } from 'react';
import { View, Button, Image, SafeAreaView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const Photo = () => {
  const [imgs, setImgs]: any = useState([]);

  const addPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', // 'photo' or 'video' or 'mixed'
        selectionLimit: 1, // 1为一张，0不限制数量
        includeBase64: true,
      },
      res => {
        setImgs(res.assets);
      },
    );
  };

  const tackPhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      res => {
        console.log(res);
      },
    );
  };
  return (
    <SafeAreaView>
      <Button title="启动图库选择图像" onPress={() => addPhoto()}></Button>
      <Button title="启动相机拍摄图片" onPress={() => tackPhoto()}></Button>
      <Button
        title="check"
        onPress={async () => {
          const formData = new FormData();

          formData.append('image', imgs[0]);

          const res = await fetch(`${process.env.REACT_APP_API_SERVER}/file/`, {
            method: 'POST',
            body: formData,
          });

          // console.log(imgs[0].base64);
        }}></Button>
      {imgs.map((item: any, index: number) => {
        return (
          <View key={index}>
            <Image
              style={{ width: 300, height: 300 }}
              source={{ uri: item.uri }}></Image>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default Photo;
