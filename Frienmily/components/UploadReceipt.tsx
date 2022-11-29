import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { REACT_APP_API_SERVER } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function UploadReceipt() {
  const route = useRoute<any>()
  let groupId = route.params.groupId || ''
  console.log('groupIdgroupId', groupId);

  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const navigation = useNavigation();
  const [imgs, setImgs]: any = useState(null);
  const [number, setNumber]: any = useState('');
  const [remarks, setRemarks]: any = useState();


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

    function containsOnlyNumbers(str: any) {
      return /^[0-9]+$/.test(str);
    }
    console.log(number)

    if (!containsOnlyNumbers(number)) {
      // showAlert2()
      // return
    }
    navigation.goBack()




    showAlert3()
    const formData = new FormData();
    formData.append('image', imgs[0]);
    formData.append('amount', number);
    formData.append('userID', userIdInRedux);
    formData.append('groupID', groupId);
    formData.append('remarks', remarks);
    await fetch(`${REACT_APP_API_SERVER}/receipts/`, {
      method: 'POST',
      body: formData,
    });

  };

  const showAlert = () => {
    Alert.alert('Please upload receipt', '', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const showAlert1 = () => {
    Alert.alert('How much you paid?', '', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const showAlert2 = () => {
    Alert.alert('Integer only', '', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const showAlert3 = () => {
    Alert.alert('Receipt uploaded', '', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
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
    input2: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: '60%',
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
      fontSize: 25,
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
    <View style={{ alignItems: 'center', backgroundColor: '#F4E9DF', flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
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
                style={{ width: 270, height: 270, borderRadius: 18 }}
                source={{ uri: item.uri }}></Image>
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
        maxLength={8}
      />
      <TextInput
        placeholder="remarks (optional)"
        style={styles.input2}
        value={remarks}
        onChangeText={setRemarks}
        maxLength={28}
      />

      <TouchableOpacity style={styles.searchButton} onPress={submitButton}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
