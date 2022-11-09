import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function FriendItem() {
    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
        },
        container: {
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            padding: 10,
            paddingTop: 40,
            paddingBottom: 32,
            backgroundColor: "#E2D8CF",
            //SHADOW
            shadowOpacity: 0.8,
            shadowRadius: 3,
            shadowOffset: {
                height: 1,
                width: 1
            }
        },
    })


    return (
        <View style={styles.container}>
            <View ><Text style={styles.text}>USER NAME</Text></View>
            <View><Text style={styles.text}>owns you HKD $200.00</Text></View>
        </View>
    )
}