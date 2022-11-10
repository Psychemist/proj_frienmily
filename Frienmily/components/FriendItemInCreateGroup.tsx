import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function FriendItemInCreateGroup() {
    const styles = StyleSheet.create({
        itemContainer: {
            width: "100%",
            backgroundColor: "pink",
            // justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 15,
            marginTop: 5,
            marginBottom: 5,

        },
    })
    return (
        <View style={styles.itemContainer}>
            <FontAwesome name='user' size={30}/>
            <Text>   Username...</Text>
        </View>
    )
}