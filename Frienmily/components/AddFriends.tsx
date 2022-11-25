import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// import AddFriendSearchResult from './AddFriendSearchResult';
import GroupItem from './GroupItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { REACT_APP_API_SERVER } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function AddFriends() {
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const [searchBar, setSearchBar] = React.useState('');
  const [isShow, setIsShow] = React.useState(false);

  const navigation = useNavigation();
  const [addFriendStatus, setAddFriendStatus] = React.useState(0);
  const [userDetail, setUserDetail]: any = React.useState();
  //   let userDetail: any;

  const submitButton = async () => {
    if (searchBar == '') {
      showAlert();
    } else {
      setButtonIsClick(false);
      let res = await fetch(`${REACT_APP_API_SERVER}/friends/newFriend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchBar: searchBar,
          userID: userIdInRedux,
        }),
      });
      setIsShow(true)

      let result = await res.json();
      setAddFriendStatus(result.type);
      console.log('targetUserDetails :', result.userDetails);
      setUserDetail(result.userDetails);

      //   userDetail = result.userDetails;
      //   console.log('userDetails :', userDetail.id);

      // navigation.navigate('Friends' as never)
    }
  };

  const clearSearchBar = () => {
    setSearchBar('');
    setIsShow(false)
  };

  const showAlert = () => {
    Alert.alert('Please enter something to search', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };
  const [buttonIsClicked, setButtonIsClick] = useState(false);

  const addFriendButton = async () => {
    setSearchBar('');
    setButtonIsClick(true);
    await fetch(`${REACT_APP_API_SERVER}/friends/addFriend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetID: userDetail.id,
        userID: userIdInRedux,
      }),
    });
  };

  const styles = StyleSheet.create({
    input: {
      height: 55,
      // margin: 12,
      marginTop: "10%",
      marginBottom: "10%",
      borderWidth: 2.5,
      padding: 10,
      minWidth: "95%",
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
    groupTypeButtonContainer: {
      height: "50%",
      justifyContent: "flex-start",
      flexDirection: 'row',
      width: '100%',
      padding: "10%",
      // marginBottom: "10%",
      // paddingTop: 10,
      // paddingBottom: "2%",
      // alignItems: 'center',
      flexWrap: "wrap",
      // paddingRight: "5%"
    },
    searchClearContainer: {
      justifyContent: "center",
      alignItems: 'center',
    },
    searchButton: {

      margin: 5,
      fontSize: 20,
      backgroundColor: "#47b4b1",
      width: '47%',
      height: '12%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOpacity: 1,
      shadowColor: "#47b4b1",
      shadowRadius: 2,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    },
    clearButton: {

      margin: 5,
      fontSize: 20,
      backgroundColor: "lightgray",
      width: '47%',
      height: '12%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOpacity: 1,
      shadowColor: "lightgray",
      shadowRadius: 2,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    },
    searchAndClearText: {
      fontSize: 20,
      color: "white"
    },

    resultContainer: {
      // backgroundColor: "pink",
      width: '100%',
      flexGrow: 1,
      // paddingLeft: 40,
      // paddingRight: 40,
      height: "80%",
      marginTop: "10%"
    },
    text: {
      fontSize: 25,
    },
    header: {
      height: '14%',
      alignItems: 'center',
      paddingTop: '15%',
      // marginBottom: '35%',
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

    messageText: {
      fontSize: 20,
      color: "gray",
      padding: "2%"
    },
    nameText: {
      fontSize: 20,
      color: "gray",
      // padding: "2%"
    },
    mobileText: {
      fontSize: 15,
      color: "gray",
      // padding: "2%"
    },
    alertBox: {
      display: "flex",
      width: "100%",
      height: "53%",
      backgroundColor: "white",
      shadowOffset: {
        height: 1,
        width: 1,
      },
      shadowOpacity: 0.8,
      shadowRadius: 3,
      elevation: 9,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      paddingTop: 20,
      paddingBottom: 20,
      borderRadius: 15,
      marginTop: 5,
      marginBottom: 5,

    },
    container2: {
      justifyContent: "space-around",
      alignItems: 'center',
      flexDirection: 'row',
      width: "100%",
      height: "53%",
      borderRadius: 25,
      padding: 10,
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: 'white',
      //SHADOW
      shadowOpacity: 0.8,
      shadowRadius: 3,
      shadowOffset: {
        height: 1,
        width: 1,
      },
    },
    nameMobileContainer:{
      paddingRight:"20%"
    },
    userImage: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: 'grey',
      marginRight: 20
    },
    groupMemberContainer: {
      display: "flex",
      alignItems: 'flex-start',
      // paddingBottom: '5%'
      maxHeight: "30%",
      justifyContent: "flex-start",
    },
    stepText: {
      fontSize: 30,
      fontWeight: "bold"

    },
    memberNumText: {
      fontSize: 15,
      // fontWeight: "bold"

    },
  });

  return (
    <View style={{ alignItems: 'center', backgroundColor: '#F5F5F5', flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Friends' as never)}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Add Friends</Text>
      </View>




      <View style={styles.groupTypeButtonContainer}>
        <View style={styles.groupMemberContainer}>
          <Text style={styles.stepText}>Add Users </Text>
          <Text style={styles.memberNumText}>
            Add a new contact to Frienmily
          </Text>
        </View>

        <TextInput
          autoCapitalize="none"
          placeholder="Search by mobile number or email "
          value={searchBar}
          onChangeText={setSearchBar}
          style={styles.input}
        />
        <View style={styles.searchClearContainer}></View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={submitButton}>
          <Text style={styles.searchAndClearText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearSearchBar}>
          <Text style={styles.searchAndClearText}>Clear</Text>
        </TouchableOpacity>

        {isShow ? (<View style={styles.resultContainer}>
          {addFriendStatus == 1 ? (
            <View style={styles.alertBox}>
              <View>
                <FontAwesome
                  name="exclamation-triangle"
                  size={30}
                  style={{ color: '#47b4b1', marginRight: '2%' }}
                />
              </View>
              <Text style={styles.messageText}>No user found</Text>
            </View>
          ) : addFriendStatus == 2 ? (
            <View style={styles.alertBox}>
              <View>
                <FontAwesome
                  name="exclamation-triangle"
                  size={30}
                  style={{ color: '#47b4b1', marginRight: '2%' }}
                />
              </View>
              <Text style={styles.messageText}>Cannot add yourself</Text>
            </View>
          ) : addFriendStatus == 3 ? (
            <View style={styles.alertBox}>
              <View>
                <FontAwesome
                  name="exclamation-triangle"
                  size={30}
                  style={{ color: '#47b4b1', marginRight: '2%' }}
                />
              </View>
              <Text style={styles.messageText}>User is your friend already!</Text>
            </View>
          ) : addFriendStatus == 4 ? (
            <View>
              {userDetail ? (
                <View style={styles.container2}>
                  <View>
                    <Image style={styles.userImage} source={{ uri: userDetail.profile_picture }} ></Image>
                  </View>

                  <View style={styles.nameMobileContainer}>
                    <Text style={styles.nameText}>
                      {userDetail.username}
                    </Text>
                    <Text style={styles.mobileText}>
                      {userDetail.mobile}
                    </Text>
                  </View>
                  
                  <TouchableOpacity onPress={addFriendButton}>
                    {buttonIsClicked ? (
                      <FontAwesome name="check-square-o" size={25} />
                    ) : (
                      <FontAwesome name="plus-square-o" size={25} />
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <Text></Text>
              )}
            </View>
          ) : (
            <Text></Text>
          )}
        </View>) : (<View></View>)}




      </View>
    </View>
  );
}
