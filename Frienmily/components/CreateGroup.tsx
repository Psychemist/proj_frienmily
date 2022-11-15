import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FriendItemInCreateGroup from './FriendItemInCreateGroup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {isAnyOf} from '@reduxjs/toolkit';
import {REACT_APP_API_SERVER} from '@env';

export default function CreateGroup() {
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
    console.log(groupName);
    console.log(isFamilyGroup);
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
      console.log(idArray);
      if (idArray.length == 0) {
        showAlert2();
        return;
      }

      const res = await fetch(`${REACT_APP_API_SERVER}/groups/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          groupName: groupName,
          is_family_group: isFamilyGroup,
          profile_picture: 'testing',
          groupMemberId: idArray,
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
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const showAlert1 = () => {
    Alert.alert('Please select a group type', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };
  const showAlert = () => {
    Alert.alert('Please enter a group name', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
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
        const response = await fetch(`${REACT_APP_API_SERVER}/friends/`);
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

  const styles = StyleSheet.create({
    input: {
      height: '5%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      minWidth: 300,
      maxWidth: 300,
      borderRadius: 10,
    },
    input2: {
      height: '60%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      minWidth: 200,
      maxWidth: 200,
      borderRadius: 10,
    },
    createButton: {
      margin: 5,
      fontSize: 20,
      backgroundColor: '#907651',
      width: 70,
      height: 70,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    groupTypeButtonContainer: {
      justifyContent: 'center',
      flexDirection: 'row',
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center',
    },
    friendButton: {
      margin: 5,
      fontSize: 20,
      backgroundColor: '#907651',
      borderColor: isFriendsButtonSelected ? 'black' : '',
      borderWidth: isFriendsButtonSelected ? 3 : 0,
      width: '40%',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    familyButton: {
      margin: 5,
      fontSize: 20,
      backgroundColor: '#907651',
      borderColor: isFamilyButtonSelected ? 'black' : '',
      borderWidth: isFamilyButtonSelected ? 3 : 0,
      width: '40%',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonFontSize: {
      fontSize: 25,
    },
    resultContainer: {
      minHeight: 300,
      maxHeight: 300,
      width: '100%',
      flexGrow: 1,
      paddingLeft: 40,
      paddingRight: 40,
    },
    header: {
      height: '14%',
      alignItems: 'center',
      paddingTop: '15%',
      marginBottom: '10%',
      width: '100%',
    },
    text: {
      fontSize: 30,
    },
    searchAndClearButton: {
      margin: 5,
      fontSize: 20,
      backgroundColor: '#907651',
      width: '12%',
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchAndClearText: {
      fontSize: 12,
    },
    backButton: {
      position: 'absolute',
      left: 0,
      paddingTop: '65%',
      paddingLeft: '20%',
      fontSize: 25,
      // top: "110%",
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

        <Text style={styles.text}>Create Group</Text>
      </View>
      <Text>1. Enter a group name:</Text>
      <TextInput
        placeholder="New Group Name"
        autoCapitalize="none"
        value={groupName}
        onChangeText={setGroupName}
        style={styles.input}
      />
      <Text>2. Select a group type:</Text>
      <View style={styles.groupTypeButtonContainer}>
        <TouchableOpacity style={styles.friendButton} onPress={friendsButton}>
          <Text style={styles.buttonFontSize}>
            <FontAwesome name="group" size={35} /> Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.familyButton} onPress={familyButton}>
          <Text style={styles.buttonFontSize}>
            Family <FontAwesome name="home" size={40} />
          </Text>
        </TouchableOpacity>
      </View>
      <Text>3. Invite group members: (members: {numOfMembers()})</Text>
      <View style={styles.groupTypeButtonContainer}>
        <TextInput
          placeholder="Search username..."
          maxLength={18}
          autoCapitalize="none"
          value={friendSearchBar}
          onChangeText={setFriendSearchBar}
          style={styles.input2}
        />
        <TouchableOpacity
          style={styles.searchAndClearButton}
          onPress={searchBarEnter}>
          <Text style={styles.searchAndClearText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchAndClearButton}
          onPress={clearSearchBar}>
          <Text style={styles.searchAndClearText}>Clear</Text>
        </TouchableOpacity>
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

      <TouchableOpacity style={styles.createButton} onPress={submitButton}>
        <Text>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
}
