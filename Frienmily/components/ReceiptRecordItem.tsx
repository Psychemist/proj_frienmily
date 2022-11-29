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
            marginTop: "2%",
            marginLeft: "1%",
            backgroundColor: "white",
            width: "98%",
            height: 120,
            borderWidth: 1,
            borderColor: "#F5F5F5",
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            // margin: 5,
            shadowOpacity: 1,
            shadowColor: "lightgray",
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1,
            },
            paddingRight:"5%"
        },

    })

    const remarks = () => {
        if (props.items.remarks == "undefined") {
            return "N/A"
        }
        return props.items.remarks
    }
    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ImagePreview' as never, { image: props.items.receipt_image } as never)
                }}>
                    {/* change navigation to product details */}
                    <View><Image source={{ uri: props.items.receipt_image }}
                        style={{ width: 70, height: 70, marginRight: 20 }} /></View>
                </TouchableOpacity>
                <View >
                    <View><Text style={styles.text}>Payer: {props.items.userName}</Text></View>
                    <View><Text style={styles.text}>Remarks: {remarks()}</Text></View>
                </View>
            </View>


            <View >
                <Text style={styles.text}>HK${props.items.amount}</Text>
            </View>
        </View>
    )
}