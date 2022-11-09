import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AddFriendSearchResult() {
    const styles = StyleSheet.create({
        itemContainer: {
            width: "90%",
            backgroundColor: "blue",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
            paddingTop: 40,
            paddingBottom: 32,
            borderRadius: 15,

        },
    })
    return (
        <View style={styles.itemContainer}>
            <Text>This is AddFriendSearchResult page</Text>
        </View>
    )
}