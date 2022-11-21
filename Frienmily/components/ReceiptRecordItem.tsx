import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'

export default function ReceiptRecordItem() {

    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
        },
        // container: {
        //     justifyContent: "space-between",
        //     alignItems: "center",
        //     flexDirection: "row",
        //     width: "100%",
        //     padding: 10,
        //     // paddingTop: 32,
        //     // paddingBottom: 32,
        //     // backgroundColor: "#E2D8CF",
        //     //SHADOW
        //     shadowOpacity: 0.2,
        //     shadowRadius: 3,
        //     shadowOffset: {
        //         height: 1,
        //         width: 1
        //     }
        // },
        itemContainer: {
            justifyContent: "space-between",
            width: "100%",
            height: 100,
            backgroundColor: "white",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 15,
            marginTop: 5,
            marginBottom: 5,
        },

    })

    const logPress = (pressType: string) => {
        console.log(pressType)
    }
    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Pressable onPress={() => navigation.navigate({ uri: 'https://reactjs.org/logo-og.png' } as never)}>
                    {/* change navigation to product details */}
                    <View><Image source={{ uri: 'https://reactjs.org/logo-og.png' }}
                        style={{ width: 70, height: 70, marginRight: 20 }} /></View>
                </Pressable>
                <View >
                    <View><Text style={styles.text}>Receipt Details</Text></View>
                </View>
            </View>


            <View >
                <Text style={styles.text}>HK$800</Text>
            </View>
        </View>
    )
}