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
import FriendItemInCreateGroup from './FriendItemInCreateGroup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { isAnyOf } from '@reduxjs/toolkit';
import { REACT_APP_API_SERVER } from '@env';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

export default function CreateGroup() {
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const [groupName, setGroupName] = React.useState('');
  const [isFamilyGroup, setIsFamilyGroup] = React.useState<boolean | null>(
    null,
  );
  const [friendSearchBar, setFriendSearchBar] = React.useState('');
  const [isFriendsButtonSelected, setIsFriendsButtonSelected] =
    React.useState(false);
  const [isFamilyButtonSelected, setIsFamilyButtonSelected] =
    React.useState(false);

  const navigation = useNavigation();

  const submitButton = async () => {
    if (groupName == '') {
      showAlert();
    } else if (isFamilyGroup == null) {
      showAlert1();
    } else {
      let tempArray: any = [...friendItemList];
      let idArray: any = [];
      for (let tempItem of tempArray) {
        if (tempItem['isSelected'] == true) {
          idArray.push(tempItem['id']);
        }
      }
      if (idArray.length == 0) {
        showAlert2();
        return;
      }
      console.log('groupName :', groupName);
      console.log('isFamilyGroup :', isFamilyGroup);
      console.log('groupIdArray :', idArray);

      const res = await fetch(`${REACT_APP_API_SERVER}/groups/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupName: groupName,
          is_family_group: isFamilyGroup,
          profile_picture: 'testing',
          groupMemberId: idArray,
          userID: userIdInRedux,
        }),
      });
      let result = await res.json();
      console.log(result);
      navigation.navigate('HomeTab' as never);
    }
  };
  const friendsButton = () => {
    setIsFamilyGroup(false);
    setIsFriendsButtonSelected(true);
    if (isFamilyButtonSelected == true) {
      setIsFamilyButtonSelected(false);
    }
  };
  const familyButton = () => {
    setIsFamilyGroup(true);
    setIsFamilyButtonSelected(true);
    if (isFriendsButtonSelected == true) {
      setIsFriendsButtonSelected(false);
    }
  };
  const showAlert2 = () => {
    Alert.alert('Please at least select one group member', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const showAlert1 = () => {
    Alert.alert('Please select a group type', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };
  const showAlert = () => {
    Alert.alert('Please enter a group name', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const itemPress = (num: number) => {
    let tempArray: any = [...friendItemList];
    tempArray[num]['isSelected'] = !tempArray[num]['isSelected'];
    console.log(tempArray[num]['isSelected']);
    setFriendItemList(tempArray);
  };

  const numOfMembers = () => {
    let counter = 1;
    for (let i = 0; i < friendItemList.length; i++) {
      if (friendItemList[i]['isSelected'] == true) {
        counter++;
      }
    }
    return counter;
  };

  const searchBarEnter = () => {
    console.log(`${friendSearchBar}`);
    let tempArray: any = [...friendItemList];
    for (let tempItem of tempArray) {
      tempItem['isShow'] = true;
      if (!tempItem.username.includes(`${friendSearchBar}`)) {
        tempItem['isShow'] = false;
      }
    }
    setFriendItemList(tempArray);
  };

  const clearSearchBar = () => {
    setFriendSearchBar('');
    let tempArray: any = [...friendItemList];
    for (let tempItem of tempArray) {
      tempItem['isShow'] = true;
    }
    setFriendItemList(tempArray);
  };

  // const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER
  let fetchResult: any;
  const [friendItemList, setFriendItemList]: any = useState([]);

  useEffect(() => {
    console.log('useEffect');

    const loadFriendList = async () => {
      try {
        console.log('load Friend List when creating group...');
        const response = await fetch(`${REACT_APP_API_SERVER}/friends/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userID: userIdInRedux,
          }),
        });

        let json = [];
        if (response) {
          json = await response.json();
        }
        console.log(json);

        for (let i = 0; i < json.length; i++) {
          json[i].isSelected = false;
          json[i].isShow = true;
        }
        setFriendItemList(json);
      } catch (error) {
        console.log('error', error);
      }
    };

    loadFriendList();
  }, []);

  const enlargeProfilePicture = () => {
    navigation.navigate('UserProfilePicuture' as never)
  }

  const styles = StyleSheet.create({
    input: {
      height: 55,
      margin: 12,
      borderWidth: 2.5,
      padding: 10,
      minWidth: "60%",
      maxWidth: "60%",
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
    searchUserNameTextBox: {
      height: 55,
      marginTop: 10,
      marginBottom: 5,
      borderWidth: 2.5,
      padding: 10,
      minWidth: "85%",
      maxWidth: "85%",
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
    createBtn: {
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
    },
    groupTypeButtonContainer: {
      // justifyContent: "center",
      flexDirection: 'row',
      width: '100%',
      // paddingTop: 10,
      paddingBottom: "2%",
      // alignItems: 'center',
      flexWrap: "wrap",
      // paddingRight: "5%"
    },
    friendButton: {
      margin: 5,
      fontSize: 20,
      backgroundColor: isFriendsButtonSelected ? "#47b4b1" : "lightgray",
      // borderColor: isFriendsButtonSelected ? 'black' : '',
      // borderWidth: isFriendsButtonSelected ? 3 : 0,
      width: '40%',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor:isFriendsButtonSelected? "lightgray": "lightgray",
      shadowOpacity: 1,
      shadowRadius: 1,
      shadowOffset: {
        height: isFriendsButtonSelected ? 4 : 0,
        width: isFriendsButtonSelected ? 4 : 0,
      },
    },
    familyButton: {
      margin: 5,
      fontSize: 20,
      backgroundColor: isFamilyButtonSelected ? "#47b4b1": "lightgray",
      // borderColor: isFamilyButtonSelected ? 'black' : '',
      // borderWidth: isFamilyButtonSelected ? 3 : 0,
      width: '40%',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor:isFamilyButtonSelected ?  "lightgray": "lightgray",
      shadowOpacity: 1,
      shadowRadius: 1,
      shadowOffset: {
        height: isFamilyButtonSelected ?  4 : 0,
        width: isFamilyButtonSelected ?  4 : 0,
      },
    },
    buttonFontSize: {
      fontSize: 20,
      color: "white"
    },
    resultContainer: {
      minHeight: "38%",
      maxHeight: "38%",
      width: '100%',
      flexGrow: 1,
      paddingLeft: "9%",
      // paddingRight: "20%",
    },
    header: {
      height: '14%',
      alignItems: 'center',
      paddingTop: '15%',
      // marginBottom: '10%',
      width: '100%',
    },
    text: {
      fontSize: 25,
    },
    searchButton: {
      
      margin: 5,
      fontSize: 20,
      backgroundColor: "#47b4b1",
      width: '40%',
      height: '32%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOpacity: 1,
      shadowColor:"#47b4b1",
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
      width: '40%',
      height: '32%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOpacity: 1,
      shadowColor:"lightgray",
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
    backButton: {
      position: 'absolute',
      left: 0,
      paddingTop: '65%',
      paddingLeft: '20%',
      fontSize: 25,
      // top: "110%",
    },
    userImage: {
      width: 100,
      height: 100,
      borderRadius: 150,
      borderColor: "#47b4b1",
      borderWidth: 4,
      postion: "absolute",
      right: "-20%",
      top: "-20%",
      shadowOpacity: 3,
      shadowColor:"lightgray",
      shadowRadius: 2,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    },
    groupNameAndPhotoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: '5%',
      // paddingBottom: '5%'
    },
    groupMemberContainer: {

      alignItems: 'flex-start',
      // paddingBottom: '5%'
      maxHeight: "30%"
    },
    stepsContainer:{
      position: 'relative',
      alignItems: 'center',
      // paddingLeft: "10%"

    },
    stepText: {
      fontSize: 25,
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
          onPress={() => navigation.navigate('HomeTab' as never)}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Create Group</Text>
      </View>
      <View style={styles.stepsContainer}>
      {/* <TouchableOpacity onPress={enlargeProfilePicture}>
        <Image style={styles.userImage} source={{ uri: "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/c3269ab8c2949b1e0614dad00" }} ></Image>
      </TouchableOpacity> */}
      {/* <Text style={styles.stepText}>1. Enter a group name and select a group photo:</Text> */}
      <View style={styles.groupNameAndPhotoContainer}>
        <TouchableOpacity onPress={enlargeProfilePicture}>
          <Image style={styles.userImage} source={{ uri: "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/c3269ab8c2949b1e0614dad00" }} ></Image>
        </TouchableOpacity>
        <TextInput
          placeholder="New Group Name"
          autoCapitalize="none"
          value={groupName}
          onChangeText={setGroupName}
          style={styles.input}
        />
      </View>

      {/* <Text style={styles.stepText}>2. Select a group type:</Text> */}
      <View style={styles.groupTypeButtonContainer}>
        <TouchableOpacity style={styles.friendButton} onPress={friendsButton}>
          <Text style={styles.buttonFontSize}>
            <FontAwesome name="group" size={15} /> Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.familyButton} onPress={familyButton}>
          <Text style={styles.buttonFontSize}>
            Family <FontAwesome name="home" size={20} />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.groupMemberContainer}>
      <Text style={styles.stepText}>Add Group Members </Text>
      <Text style={styles.memberNumText}>Current members number in group: {numOfMembers()}</Text>
      <View style={styles.groupTypeButtonContainer}>
        <TextInput
          placeholder="Search username..."
          maxLength={18}
          autoCapitalize="none"
          value={friendSearchBar}
          onChangeText={setFriendSearchBar}
          style={styles.searchUserNameTextBox}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={searchBarEnter}>
          <Text style={styles.searchAndClearText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearSearchBar}>
          <Text style={styles.searchAndClearText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
      <ScrollView style={styles.resultContainer}>
        {friendItemList.map((item: any, index: number) => (
          <FriendItemInCreateGroup
            key={index}
            items={item}
            arrayIndex={index}
            itemPress={itemPress}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.createBtn} onPress={submitButton}>
        <Text style={styles.buttonFontSize}>Create Group</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}
