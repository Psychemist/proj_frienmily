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
            width: "90%",
            // height: "40%",
            backgroundColor: props.items.isSelected ? "#47b4b1" : "white",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 20,
            // paddingTop: 20,
            // paddingBottom: 20,
            borderRadius: 15,
            // marginTop: 5,
            marginBottom: 5,
            borderColor: props.items.isSelected ? "#47b4b1" : "white",
            borderWidth: 3,
            shadowColor: props.items.isSelected ? "lightgray": "lightgray",
            shadowOpacity: 3,
            shadowRadius: 3,
            shadowOffset: {
              height: props.items.isSelected ? 4 : 0,
              width: props.items.isSelected ? 4 : 0,
            },
        },
        userImage: {
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: 'grey',
            // marginRight: 20
        },
        userNameText:{
            fontSize: 17,
            color: props.items.isSelected ? "white" : "gray",
    
        }
    })
    const boo = true
    return (
        <View>{props.items.isShow ? <TouchableOpacity style={styles.itemContainer} onPress={() => { props.itemPress(props.arrayIndex) }}>
            <Image style={styles.userImage} source={{ uri: props.items.profile_picture }} ></Image>

            <Text style={styles.userNameText}>     {props.items.username}</Text>
        </TouchableOpacity> : null}</View>

    )
}