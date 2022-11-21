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
            backgroundColor: "pink",
            alignItems: "center",
            flexDirection: "row",
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 15,
            marginTop: 5,
            marginBottom: 5,
            borderColor: props.items.isSelected ? "black" : "pink",
            borderWidth: 3,
        },
        userImage: {
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: 'grey',
            marginRight: 20
        },
    })
    const boo = true
    return (
        <View>{props.items.isShow ? <TouchableOpacity style={styles.itemContainer} onPress={() => { props.itemPress(props.arrayIndex) }}>
            <Image style={styles.userImage} source={{ uri: props.items.profile_picture }} ></Image>

            <Text>     {props.items.username}</Text>
        </TouchableOpacity> : null}</View>

    )
}