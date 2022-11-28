import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { REACT_APP_API_SERVER } from '@env';
// import { json } from 'express';
interface FriendItemProps {
    items: any;
    key: number;
}

export default function FriendItem(props: FriendItemProps) {
    const navigation = useNavigation();
    // console.log("props.items :", props.items);


    const isFocused = useIsFocused();
    const [showResult, setShowResult] = useState(<Text></Text>);
    const [json, setJson] = useState();
    useEffect(() => {
        const loadFriendList = async () => {
            try {
                console.log('loadCalculation');
                console.log(
                    `user_id: ${props.items.user_id}, 
                    user_friend_id: ${props.items.user_friend_id}, 
                    profile picture: ${props.items.profile_picture}`,
                );
                const response = await fetch(
                    `${REACT_APP_API_SERVER}/friends/calculateMoney/`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_id: props.items.user_id,
                            user_friend_id: props.items.user_friend_id,
                        }),
                    },
                );
                let json;
                if (response) {
                    json = await response.json();
                }
                setJson(json)
                console.log("json :", json);
                if (json.case == 1) {
                    setShowResult(<Text><FontAwesome name="check" size={20} color="#47b4b1"/>  Settled</Text>);
                } else if (json.case == 2) {
                    setShowResult(
                        <Text style={styles.green}>
                            +${Math.round(json.amount * 10) / 10}
                        </Text>,
                    );
                } else if (json.case == 3) {
                    setShowResult(
                        <Text style={styles.red}>
                            -${Math.round(json.amount * 10) / 10}
                        </Text>,
                    );
                }
            } catch (error) {
                console.log('error', error);
            }
        };
        if (isFocused) {
            loadFriendList();
        }
    }, [isFocused]);

    const styles = StyleSheet.create({
        text: {
            fontSize: 20,
            marginRight: 20,
            color: '#47b4b1',
            fontWeight:"300",
        },
        friendName: {
            fontSize: 20,
            paddingLeft:"2%",
            fontWeight:"300",
            color:"gray",
            // paddingTop: "5%",
            // paddingBottom:"5%",
        },
        container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            margin: "1%",
            width: '98%',
            height: 80,
            padding: 20,
            paddingTop: "5%",
            paddingBottom:"5%",
            backgroundColor: 'white',
            //SHADOW
            borderRadius: 20,
            shadowOpacity: 0.1,
            shadowRadius: 1,
            shadowOffset: {
                height: 4,
                width: 2,
            },
            borderBottomColor: 'grey',
            borderBottomWidth: 0.2,
        },
        miniWrapper: {
            display: 'flex',
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            // padding:5
        },
        userImage: {
            width: 60,
            height: 60,
            borderRadius: 50,
            // backgroundColor: 'grey',
            marginRight: 10,
            borderColor: "#47b4b1",
            borderWidth: 3,
            postion: "absolute",


        },
        arrowIcon: {

        },
        green: {
            color: '#02CD9C',
        },
        red: {
            color: '#F84C27',
        },

    });

    // TODO: Show the user image of each friend

    return (
        <TouchableOpacity style={styles.container} onPress={() =>
            navigation.navigate(
                'MoneySettle' as never,
                { settleDetails: json, username: props.items.username, thisUserID: props.items.user_id, friendUserID: props.items.user_friend_id } as never,
            )
        }>
            <View style={styles.miniWrapper}>
                {/* <FontAwesome name="user-circle-o" size={30} /> */}
                <Image style={styles.userImage} source={{ uri: props.items.profile_picture }} ></Image>
                <View>
                    <Text style={styles.friendName}>{props.items.username}</Text>
                </View>
            </View>
            <View style={styles.miniWrapper}>
                <View>
                    <Text style={styles.text}>{showResult}</Text>
                </View>
                <FontAwesome name="angle-right" size={30} color={"#47b4b1"} style={styles.arrowIcon} />

            </View>
        </TouchableOpacity>
    );
}
