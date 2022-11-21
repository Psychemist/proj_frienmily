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

      let result = await res.json();
      setAddFriendStatus(result.type);
      console.log('targetUserDetails :', result.userDetails);
      setUserDetail(result.userDetails);

      //   userDetail = result.userDetails;
      //   console.log('userDetails :', userDetail.id);

      // navigation.navigate('Friends' as never)
    }
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
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      minWidth: 300,
      maxWidth: 300,
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
    userImage: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: 'grey',
      marginRight: 20
    },
  });

  return (
    <View style={{ alignItems: 'center', backgroundColor: '#F4E9DF', flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Friends' as never)}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Add Friends</Text>
      </View>
      <Text>
        <FontAwesome name="mobile" size={50} /> Enter your friend's phone
        number:
      </Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Phone number or Email"
        value={searchBar}
        onChangeText={setSearchBar}
        style={styles.input}
      />

      <TouchableOpacity style={styles.searchButton} onPress={submitButton}>
        <Text>Search</Text>
      </TouchableOpacity>

      {addFriendStatus == 1 ? (
        <View style={styles.container}>
          <View>
            <FontAwesome
              name="exclamation-triangle"
              size={30}
              style={{ color: 'red', marginRight: '2%' }}
            />
          </View>
          <Text style={styles.messageText}>No such user!</Text>
        </View>
      ) : addFriendStatus == 2 ? (
        <View style={styles.container}>
          <View>
            <FontAwesome
              name="exclamation-triangle"
              size={30}
              style={{ color: 'red', marginRight: '2%' }}
            />
          </View>
          <Text style={styles.messageText}>Cannot add yourself!</Text>
        </View>
      ) : addFriendStatus == 3 ? (
        <View style={styles.container}>
          <View>
            <FontAwesome
              name="exclamation-triangle"
              size={30}
              style={{ color: 'red', marginRight: '2%' }}
            />
          </View>
          <Text style={styles.messageText}>He/She is your friend already!</Text>
        </View>
      ) : addFriendStatus == 4 ? (
        <View>
          {userDetail ? (
            <View style={styles.container2}>
              <View>
                <Image style={styles.userImage} source={{ uri: userDetail.profile_picture }} ></Image>
              </View>
              <View>
                <Text style={styles.messageText}>
                  mobile: {userDetail.mobile}
                </Text>
                <Text style={styles.messageText}>
                  username: {userDetail.username}
                </Text>
              </View>

              <TouchableOpacity onPress={addFriendButton}>
                {buttonIsClicked ? (
                  <FontAwesome name="check-square-o" size={30} />
                ) : (
                  <FontAwesome name="plus-square-o" size={30} />
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
    </View>
  );
}
