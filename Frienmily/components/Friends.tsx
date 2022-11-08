import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FriendItem from "./FriendItem";

export default function Friends() {
    const styles = StyleSheet.create({
        floatButtonFontSize: {
            fontSize:50,
        },
        circleButton: {
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: '#59a758',
            position: 'absolute',
            right: 30,
            bottom: 30,
            
        }
    })

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Text><FriendItem/></Text>
            </ScrollView>
            <View style={styles.circleButton}><Text style={styles.floatButtonFontSize} onPress={() => console.log("pressed") }> + </Text></View>
        </View>
    )
}

