import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface FriendItemInCreateGroupProps {
    items: any,
    arrayIndex: number,
    itemPress: (num: number) => void,
};

export default function FriendItemInCreateGroup(props: FriendItemInCreateGroupProps) {

    const styles = StyleSheet.create({
        itemContainer: {
            width: "100%",
            // height: "40%",
            backgroundColor: "white",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
            padding: 20,
            // paddingTop: 20,
            // paddingBottom: 20,
            borderRadius: 15,
            // marginTop: 5,
            marginBottom: 5,
            borderColor: props.items.isSelected ? "#47b4b1":"gray",
            borderWidth: 1,
            shadowColor: props.items.isSelected ? "#47b4b1":"gray",
            shadowOpacity: 10,
            shadowRadius: 1,
            shadowOffset: {
              height: 0,
              width: 0,
            },
        },
        userImage: {
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: 'grey',
            marginRight: 0
        },
        userNameText:{
            fontSize: 20,
            color: props.items.isSelected ? "#47b4b1":"gray",
            paddingRight:"10%",
            fontWeight:"300"
        },
        userNamePictureContainer:{
            justifyContent: "space-between",
            alignItems: 'center',
            flexDirection: 'row',
        }
    })
    const boo = true
    return (
        <View style={styles.userNamePictureContainer}>{props.items.isShow ? <TouchableOpacity style={styles.itemContainer} onPress={() => { props.itemPress(props.arrayIndex) }}>
            <View><Image style={styles.userImage} source={{ uri: props.items.profile_picture }} ></Image>
            </View>
            <View><Text style={styles.userNameText}>     {props.items.username}</Text>
            </View>
        </TouchableOpacity> : null}</View>

    )
}