import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AddFriendSearchResult() {
    const styles = StyleSheet.create({
        itemContainer: {
            width: "100%",
            backgroundColor: "pink",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
            paddingTop: 35,
            paddingBottom: 32,
            borderRadius: 15,
            marginTop: 5,
            marginBottom: 5,

        },
    })
    return (
        <View style={styles.itemContainer}>
            <Text>This is AddFriendSearchResult page</Text>
        </View>
    )
}