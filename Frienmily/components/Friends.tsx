import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FriendItem from "./FriendItem";

export default function Friends() {
    const styles = StyleSheet.create({
        floatButtonFontSize: {
            fontSize: 50,
        },
        circleButton: {
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: '#907651',
            position: 'absolute',
            right: 30,
            bottom: 30,
            opacity: 0.8

        },
    })
    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{alignItems: "center"}}>
                <Text style={{fontSize: 25, paddingBottom: "1%"}}>Friends</Text> 
            </View>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
                <Text><FriendItem /></Text>
            </ScrollView>
            {/* <View style={styles.circleButton}><Text style={styles.floatButtonFontSize} onPress={() => console.log("pressed in friends") }> + </Text></View> */}
            <TouchableOpacity
                style={styles.circleButton}
                onPress={() => {
                    navigation.navigate('Add friends' as never)
                }}>
                <Text style={styles.floatButtonFontSize}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

