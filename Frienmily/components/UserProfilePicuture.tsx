import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// @ts-ignore
import { REACT_APP_API_SERVER } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchUpdateProfilePicture } from '../redux/user/thunk';




export default function UserProfilePicuture() {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const profilePictureInRedux = useSelector((state: RootState) => state.user.profilePicture)
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);

  const [imgs, setImgs]: any = useState(null);
  const [profilePicture, __] = useState(profilePictureInRedux)
  const userId = userIdInRedux

  console.log("profilePicture in Redux:", profilePicture)

  // Add photo
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


  const onSavePicture = async () => {
    if (imgs == undefined || imgs == null) {
      emptyImgAlert();
      return;
    }

    Alert.alert(
      'Your profile page has been updated',
      '',
      [
        {
          text: 'OK',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        }
      ]
    );

    let updateProfileResult = await dispatch(fetchUpdateProfilePicture({ userId, imgs })).unwrap()
    console.log('fetchUpdateGender from unwrap = ', updateProfileResult)




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
      fontSize: 25,
    },
    backButton: {
      position: 'absolute',
      left: 0,
      paddingLeft: '20%',
      fontSize: 25,
    },
    pictureContainer: {
      width: 270,
      height: 270,
      backgroundColor: "white",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      paddingTop: 20,
      paddingBottom: 20,
      borderRadius: 200,
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




      {imgs == undefined || imgs == null ?
        (
          <View style={styles.pictureContainer}>
            <Image
              style={{ width: 270, height: 270, borderRadius: 200 }}
              source={{ uri: profilePicture! }} />
          </View>

        )
        :
        (
          imgs.map((item: any, index: number) => {
            return (
              <View key={index}>
                <Image
                  style={{ width: 270, height: 270, borderRadius: 200 }}
                  source={{ uri: item.uri }} />
              </View>
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
        <Text style={styles.buttonText} >Save</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}
