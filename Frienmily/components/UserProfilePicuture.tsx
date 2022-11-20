import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { REACT_APP_API_SERVER } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';




export default function UserProfilePicuture() {
  const navigation = useNavigation();
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const [imgs, setImgs]: any = useState(null);

  // TODO: Add photo
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


  // TODO: Save changes
  const onSavePicture = async () => {
    if (imgs == undefined || imgs == null) {
      emptyImgAlert();
      return;
    }

    const formData = new FormData();
    formData.append('image', imgs[0]);
    formData.append('userID', userIdInRedux);

    const res = await fetch(`${REACT_APP_API_SERVER}/user/updateProfilePicture`, {
      method: 'POST',
      body: formData,
    });
    console.log('result : ', res.json());
  }

  const emptyImgAlert = () => {
    Alert.alert('Please upload image', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };


  const styles = StyleSheet.create({
    header: {
      height: "14%",
      alignItems: "center",
      marginBottom: "10%",
      width: "100%"
    },
    text: {
      fontSize: 30,
    },
    backButton: {
      position: 'absolute',
      left: 0,
      paddingLeft: '20%',
      fontSize: 25,
    },
    pictureContainer: {
      width: "90%",
      height: "50%",
      backgroundColor: "white",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      paddingTop: 20,
      paddingBottom: 20,
      borderRadius: 15,
      marginTop: 5,
      marginBottom: 5,
      position: "relative"
    },
    buttonText: {
      fontSize: 20,
      fontWeight: '300',
      color: 'white',
    },

    receiptBtn: {
      backgroundColor: '#47b4b1',
      height: 40,
      width: 360,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderRadius: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
    },
  })
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative" }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeTab' as never)}>
          <FontAwesome name='angle-left' size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Profile Picture</Text>
      </View>

      <View style={styles.pictureContainer}>
        <View>
          <Text >Profile Picuture</Text>
        </View>
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


      <TouchableOpacity
        style={styles.receiptBtn}
        onPress={addPhoto}>
        <Text style={styles.buttonText}>Edit Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.receiptBtn}
        onPress={onSavePicture}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}
