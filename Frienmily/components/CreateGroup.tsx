import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AddFriendSearchResult from './AddFriendSearchResult';
import FriendItemInCreateGroup from './FriendItemInCreateGroup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CreateGroup() {



    const [groupName, setGroupName] = React.useState("");
    const [groupType, setGroupType] = React.useState(null);
    const [friendSearchBar, setFriendSearchBar] = React.useState("");
    const [isFriendsButtonSelected, setIsFriendsButtonSelected] = React.useState(false);
    const [isFamilyButtonSelected, setIsFamilyButtonSelected] = React.useState(false);

    const navigation = useNavigation();

    const submitButton = () => {
        console.log(groupName)
        console.log(groupType)
        if (groupType == null) {
            showAlert()
        } else if (groupName == "") {
            showAlert1()
        } else {
            navigation.navigate('Groups' as never)
        }

    }
    const friendsButton = () => {
        setGroupType("friend" as never)
        setIsFriendsButtonSelected(true)
        if (isFamilyButtonSelected == true) {
            setIsFamilyButtonSelected(false)
        }
    }
    const familyButton = () => {
        setGroupType("family" as never)
        setIsFamilyButtonSelected(true)
        if (isFriendsButtonSelected == true) {
            setIsFriendsButtonSelected(false)
        }
    }


    const showAlert = () => {
        Alert.alert(
            'Please select a group type',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]
        );
    }
    const showAlert1 = () => {
        Alert.alert(
            'Please enter a group name',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]
        );
    }

    const itemPress = (num: number) => {

        let tempArray: any = [...friendItemList]
        tempArray[num]['isSelected'] = !tempArray[num]['isSelected']
        console.log(tempArray[num]['isSelected']);
        



        setFriendItemList(tempArray)




    }

    const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER
    let fetchResult: any
    const [friendItemList, setFriendItemList] = useState([]);

    useEffect(() => {
        console.log("useEffect")

        const loadFriendList = async () => {
            try {
                console.log("load Friend List when creating group...")
                // console.log("cp2");
                // console.log(`${REACT_APP_API_SERVER}/friends/`);

                // console.log("cp3");
                // const response = await fetch(`localhost:8000/friends/`);
                // console.log("cp4");

                // const json = await response.json();
                // console.log(json);

                fetchResult = [
                    {
                        "id": 2,
                        "user_id": 1,
                        "user_friend_id": 2,
                        "created_at": "2022-11-11T08:20:32.326Z",
                        "updated_at": "2022-11-11T08:20:32.326Z",
                        "username": "222",
                        "is_male": false,
                        "email": "222",
                        "mobile": "222",
                        "password": "222",
                        "profile_picture": "222"
                    },
                    {
                        "id": 3,
                        "user_id": 1,
                        "user_friend_id": 3,
                        "created_at": "2022-11-11T08:20:32.326Z",
                        "updated_at": "2022-11-11T08:20:32.326Z",
                        "username": "333",
                        "is_male": true,
                        "email": "333",
                        "mobile": "333",
                        "password": "333",
                        "profile_picture": "333"
                    },
                    {
                        "id": 4,
                        "user_id": 1,
                        "user_friend_id": 4,
                        "created_at": "2022-11-11T08:20:32.326Z",
                        "updated_at": "2022-11-11T08:20:32.326Z",
                        "username": "444",
                        "is_male": false,
                        "email": "444",
                        "mobile": "444",
                        "password": "444",
                        "profile_picture": "444"
                    },
                    {
                        "id": 5,
                        "user_id": 1,
                        "user_friend_id": 5,
                        "created_at": "2022-11-11T08:20:32.326Z",
                        "updated_at": "2022-11-11T08:20:32.326Z",
                        "username": "555",
                        "is_male": true,
                        "email": "555",
                        "mobile": "555",
                        "password": "555",
                        "profile_picture": "555"
                    },
                    {
                        "id": 6,
                        "user_id": 1,
                        "user_friend_id": 6,
                        "created_at": "2022-11-11T08:20:32.326Z",
                        "updated_at": "2022-11-11T08:20:32.326Z",
                        "username": "666",
                        "is_male": false,
                        "email": "666",
                        "mobile": "666",
                        "password": "666",
                        "profile_picture": "666"
                    },
                    {
                        "id": 7,
                        "user_id": 1,
                        "user_friend_id": 7,
                        "created_at": "2022-11-11T08:20:32.326Z",
                        "updated_at": "2022-11-11T08:20:32.326Z",
                        "username": "777",
                        "is_male": true,
                        "email": "777",
                        "mobile": "777",
                        "password": "777",
                        "profile_picture": "777"
                    }
                ]
                for (let i = 0; i < fetchResult.length; i++) {
                    fetchResult[i].isSelected = false
                }
                setFriendItemList(fetchResult)

            } catch (error) {
                console.log("error", error);
            }
        };

        loadFriendList();

    }, [])

    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            minWidth: 300,
            maxWidth: 300,
            borderRadius: 10
        },
        createButton: {
            margin: 5,
            fontSize: 20,
            backgroundColor: "#907651",
            width: 70,
            height: 70,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
        },
        groupTypeButtonContainer: {
            justifyContent: "space-around",
            flexDirection: "row",
            width: "100%",
            paddingTop: 20,
            paddingBottom: 22,
            alignItems: "center",
        },
        friendButton: {
            margin: 5,
            fontSize: 20,
            backgroundColor: "#907651",
            borderColor: isFriendsButtonSelected ? "black" : "",
            borderWidth: isFriendsButtonSelected ? 3 : 0,
            width: "40%",
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        familyButton: {
            margin: 5,
            fontSize: 20,
            backgroundColor: "#907651",
            borderColor: isFamilyButtonSelected ? "black" : "",
            borderWidth: isFamilyButtonSelected ? 3 : 0,
            width: "40%",
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
            width: "100%",
            flexGrow: 1,
            paddingLeft: 40,
            paddingRight: 40,
        },
        header: {
            height: "14%",
            alignItems: "center",
            paddingTop: "15%",
            marginBottom: "10%"
        },
        text: {

            fontSize: 30,
        }
    });

    return (
        <View style={{ alignItems: 'center', backgroundColor: "#F4E9DF", flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.text}>Groups</Text>
            </View>
            <Text>1. Enter a group name:</Text>
            <TextInput placeholder="New Group Name" value={groupName} onChangeText={setGroupName} style={styles.input} />
            <Text>2. Select a group type:</Text>
            <View style={styles.groupTypeButtonContainer}>

                <TouchableOpacity style={styles.friendButton} onPress={friendsButton}>
                    <Text style={styles.buttonFontSize}><FontAwesome name='group' size={35} />  Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.familyButton} onPress={familyButton}>
                    <Text style={styles.buttonFontSize}>Family  <FontAwesome name='home' size={40} /></Text>
                </TouchableOpacity>
            </View>
            <Text>3. Invite group members: (members: 1)</Text>
            <TextInput placeholder="Search..." value={friendSearchBar} onChangeText={setFriendSearchBar} style={styles.input} />
            <ScrollView style={styles.resultContainer}>
                {friendItemList.map((item: any, index: number) => (
                    <FriendItemInCreateGroup key={index} items={item} arrayIndex={index} itemPress={itemPress} />
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.createButton} onPress={submitButton}>
                <Text>Create Group</Text>
            </TouchableOpacity>

        </View >
    )
}