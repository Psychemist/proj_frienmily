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
interface FriendItemProps {
    items: any;
    key: number;
}

export default function GroupMemberItem(props: FriendItemProps) {
    const navigation = useNavigation();
    // console.log("props.items :", props.items);


    const isFocused = useIsFocused();


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
            width:"100%",
            // paddingTop: "5%",
            // paddingBottom:"5%",
        },
        container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            margin: "1%",

            width: "81%",
            height: 100,
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
            // right: "-20%",
            // top: "-20%",
            shadowOpacity: 0.8,
            shadowColor: "#47b4b1",
            shadowRadius: 2,
            shadowOffset: {
              height: 10,
              width: 10,
            },

        },
        arrowIcon: {

        },
        green: {
            color: 'green',
        },
        red: {
            color: 'red',
        },

    });

    return (
        <View style={styles.container}>
            <View style={styles.miniWrapper}>
                {/* <FontAwesome name="user-circle-o" size={30} /> */}
                <Image style={styles.userImage} source={{ uri: props.items.profile_picture }} ></Image>
                <View>
                    <Text style={styles.friendName}>{props.items.username}</Text>
                </View>
            </View>
            <View style={styles.miniWrapper}>
                <View>
                    {props.items.paid ? (<Text style={styles.text}>${props.items.paid}</Text>) : (<Text style={styles.text}>$0</Text>)}

                </View>

            </View>
        </View>
    );
}
