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
            fontSize: 16,
        },
        friendName: {
            fontSize: 20,
        },
        container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            height: 100,
            padding: 10,
            paddingTop: 32,
            paddingBottom: 32,
            // backgroundColor: '#E2D8CF',
            // //SHADOW
            // shadowOpacity: 0.8,
            // shadowRadius: 3,
            // shadowOffset: {
            //     height: 1,
            //     width: 1,
            // },
            borderBottomColor: 'grey',
            borderBottomWidth: 0.2,
        },
        miniWrapper: {
            display: 'flex',
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center'
        },
        userImage: {
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: 'grey',
            marginRight: 20
        },
        arrowIcon: {
            position: 'absolute',
            right: 0,
            top: -7
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
                    {props.items.paid ? (<Text style={styles.text}>${props.items.paid}</Text>) : (<Text>$0</Text>)}

                </View>

            </View>
        </View>
    );
}
