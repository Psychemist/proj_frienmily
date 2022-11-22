import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'

interface ReceiptRecordItemProps {
    items: any;
    key: number;
}

export default function ReceiptRecordItem(props: ReceiptRecordItemProps) {

    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
        },
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
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ReceiptImage' as never, { image: props.items.receipt_image } as never)
                }}>
                    {/* change navigation to product details */}
                    <View><Image source={{ uri: props.items.receipt_image }}
                        style={{ width: 70, height: 70, marginRight: 20 }} /></View>
                </TouchableOpacity>
                <View >
                    <View><Text style={styles.text}>Payer: {props.items.userName}</Text></View>
                    <View><Text style={styles.text}>Remarks: {props.items.remarks}</Text></View>
                </View>
            </View>


            <View >
                <Text style={styles.text}>HK${props.items.amount}</Text>
            </View>
        </View>
    )
}