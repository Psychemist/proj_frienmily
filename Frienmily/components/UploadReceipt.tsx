import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  _View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {REACT_APP_API_SERVER} from '@env';

export default function UploadReceipt() {
  const navigation = useNavigation();
  const [imgs, setImgs]: any = useState(null);
  const [number, setNumber]: any = useState('');

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
    console.log('imgs :', imgs);
    console.log(imgs == undefined);
  };

  //   const takePhoto = () => {
  //     launchCamera(
  //       {
  //         mediaType: 'photo',
  //         cameraType: 'back',
  //       },
  //       res => {
  //         console.log(res);
  //       },
  //     );
  //   };

  const submitButton = async () => {
    if (imgs == undefined || imgs == null) {
      showAlert();
      return;
    }

    if (number == '') {
      showAlert1();
      return;
    }

    const formData = new FormData();
    formData.append('image', imgs[0]);
    const res = await fetch(`${REACT_APP_API_SERVER}/file/`, {
      method: 'POST',
      body: formData,
    });
  };

  const showAlert = () => {
    Alert.alert('Please upload receipt', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const showAlert1 = () => {
    Alert.alert('Please enter how much you paid', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: '30%',
      //   minWidth: 300,
      //   maxWidth: 300,
      borderRadius: 10,
    },
    searchButton: {
      margin: 5,
      fontSize: 20,
      backgroundColor: '#907651',
      width: 120,
      height: 45,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    resultContainer: {
      // backgroundColor: "pink",
      width: '100%',
      flexGrow: 1,
      paddingLeft: 40,
      paddingRight: 40,
    },
    text: {
      fontSize: 30,
    },
    header: {
      height: '14%',
      alignItems: 'center',
      paddingTop: '15%',
      marginBottom: '35%',
      width: '100%',
    },
    backButton: {
      position: 'absolute',
      left: 0,
      paddingTop: '65%',
      paddingLeft: '20%',
      fontSize: 25,
      // top: "110%",
    },
    itemContainer: {
      width: '100%',
      backgroundColor: 'pink',
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 10,
      paddingTop: 35,
      paddingBottom: 32,
      borderRadius: 15,
      marginTop: 5,
      marginBottom: 5,
    },
    messageText: {
      fontSize: 18,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: 320,
      height: 100,
      borderRadius: 25,
      padding: 10,
      paddingTop: 32,
      paddingBottom: 32,
      backgroundColor: '#E2D8CF',
      //SHADOW
      shadowOpacity: 0.8,
      shadowRadius: 3,
      shadowOffset: {
        height: 1,
        width: 1,
      },
    },
    container2: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: 320,
      height: 100,
      borderRadius: 25,
      padding: 10,
      paddingTop: 32,
      paddingBottom: 32,
      backgroundColor: '#E2D8CF',
      //SHADOW
      shadowOpacity: 0.8,
      shadowRadius: 3,
      shadowOffset: {
        height: 1,
        width: 1,
      },
    },
    square: {
      width: 270,
      height: 270,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 18,
    },
  });

  return (
    <View style={{alignItems: 'center', backgroundColor: '#F4E9DF', flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('HomeTab' as never)}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Receipt</Text>
      </View>

      {imgs == undefined || imgs == null ? (
        <TouchableOpacity onPress={() => addPhoto()}>
          <View style={styles.square}>
            <FontAwesome name="plus" size={25} />
            <Text> </Text>
            <Text>CLICK HERE TO UPLOAD</Text>
          </View>
        </TouchableOpacity>
      ) : (
        imgs.map((item: any, index: number) => {
          return (
            <TouchableOpacity key={index} onPress={() => addPhoto()}>
              <Image
                style={{width: 270, height: 270, borderRadius: 18}}
                source={{uri: item.uri}}></Image>
            </TouchableOpacity>
          );
        })
      )}

      {/* <Button title="启动相机拍摄图片" onPress={() => takePhoto()}></Button> */}
      <Text>
        <FontAwesome name="money" size={30} /> Enter how much you paid:
      </Text>
      <TextInput
        keyboardType="numeric"
        placeholder="$$$"
        style={styles.input}
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.searchButton} onPress={submitButton}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
