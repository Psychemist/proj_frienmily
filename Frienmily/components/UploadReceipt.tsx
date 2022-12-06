import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Keyboard,
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
import { response } from 'express';

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
        maxWidth: 300,
        maxHeight: 300
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

    try {
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


      // console.log("HERERERERERERERERE");
      // console.log("imgs[0] :", imgs[0])

      const formData = new FormData();
      formData.append('image', imgs[0]);
      formData.append('amount', number);
      formData.append('userID', userIdInRedux);
      formData.append('groupID', groupId);
      formData.append('remarks', remarks);
      let res = await fetch(`${REACT_APP_API_SERVER}/receipts/`, {
        method: 'POST',
        body: formData,
      });
      console.log("fetch finish")
      let result = await res.json()
      // console.log("resultresultresultresultresult: ", result)
      showAlert3()
      navigation.goBack()
    } catch (error) {

      console.log("error!!!", error)
      showAlert4()
    }

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

  const showAlert4 = () => {
    Alert.alert('Wrong image format!', '', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const styles = StyleSheet.create({
    input: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 55,
      // margin: 12,
      // marginTop: "10%",
      marginBottom: "5%",
      borderWidth: 2.5,
      // padding: 10,
      minWidth: "50%",
      maxWidth: "60%",
      borderRadius: 15,
      backgroundColor: 'white',
      borderColor: "white",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1
      },
      margin: 5,
      fontSize: 20,
      // minWidth:"20%",

    },
    input2: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 55,
      // margin: 12,
      // marginTop: "10%",
      marginBottom: "5%",
      borderWidth: 2.5,
      // padding: 10,
      minWidth: "50%",
      maxWidth: "99%",
      borderRadius: 15,
      backgroundColor: 'white',
      borderColor: "white",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1
      },
      margin: 5,
      fontSize: 20,
    },
    searchButton: {
      backgroundColor: '#47b4b1',
      height: 60,
      width: 360,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: "3%",
      borderRadius: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
      bottomTop: "20%"
    },
    resultContainer: {
      // backgroundColor: "pink",
      width: '100%',
      flexGrow: 1,
      paddingLeft: 40,
      paddingRight: 40,
      marginBottom: 20
    },
    text: {
      borderRadius: 10,
      fontSize: 30,
      fontWeight: "bold",
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
    uploadText: {
      fontSize: 30,
      fontWeight: "300",
      color: "gray",
    },
    buttonText: {
      fontSize: 20,
      // fontWeight: '300',
      color: 'white',
    },
    inputFieldWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 55,
      // margin: 12,
      // marginTop: "10%",
      marginBottom: "5%",
      borderWidth: 2.5,
      // padding: 10,
      minWidth: "50%",
      maxWidth: "99%",
      borderRadius: 15,
      backgroundColor: 'white',
      borderColor: "white",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1
      }

    },
  });

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }} onTouchStart={() => { Keyboard.dismiss() }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Upload Receipt</Text>
      </View>

      {imgs == undefined || imgs == null ? (
        <TouchableOpacity onPress={() => addPhoto()}>
          <View style={styles.square}>
            <FontAwesome name="plus" size={30} />
            <Text> </Text>
            <Text style={styles.uploadText}>Click Here to Upload</Text>
          </View>
        </TouchableOpacity>
      ) : (
        imgs.map((item: any, index: number) => {
          return (
            <TouchableOpacity key={index} onPress={() => addPhoto()}>
              <Image
                style={{ width: 270, height: 270, borderRadius: 18, marginBottom: "5%" }}
                source={{ uri: item.uri }}></Image>
            </TouchableOpacity>
          );
        })
      )}

      <View style={styles.inputFieldWrapper}>
        <TextInput
          keyboardType="numeric"
          placeholder="Receipt Amount"
          style={{
            margin: 5,
            fontSize: 20,
            minWidth: "5%",
            maxWidth: "60%"
          }}
          value={number}
          onChangeText={setNumber}
          placeholderTextColor='grey'
          maxLength={8}

        />
      </View>
      <View style={styles.inputFieldWrapper}>
        <TextInput
          placeholder="Remarks (Optional)"
          style={{
            margin: 5,
            fontSize: 20,
            minWidth: "5%",
            maxWidth: "60%"
          }}
          value={remarks}
          onChangeText={setRemarks}
          placeholderTextColor='grey'
          maxLength={28}
        />
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={submitButton}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
