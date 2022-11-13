import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FriendItem from "./FriendItem";
import dotenv from "dotenv";

export default function Friends() {
    const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER

    const [friendItemList, setFriendItemList] = useState([]);

    const styles = StyleSheet.create({
        floatButtonFontSize: {
            fontSize: 50,
        },
        circleButton: {
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: '#907651',
            position: 'absolute',
            right: 30,
            bottom: 30,
            opacity: 0.8

        },
    })
    const navigation = useNavigation()

    let fetchResult: any

    useEffect(() => {

        const loadFriendList = async () => {
            try {
                console.log("loadFriendList...")
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

                setFriendItemList(fetchResult)

            } catch (error) {
                console.log("error", error);
            }
        };

        loadFriendList();

    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 25, paddingBottom: "1%" }}>Friends</Text>
            </View>
            <ScrollView style={{ backgroundColor: 'white' }}>

                {friendItemList.map((item: any, idx: number) => (
                    <FriendItem items={item} key={idx} />
                ))}

            </ScrollView>
            <TouchableOpacity
                style={styles.circleButton}
                onPress={() => {
                    navigation.navigate('Add friends' as never)
                }}>
                <Text style={styles.floatButtonFontSize}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

