import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { REACT_APP_API_SERVER } from "@env";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ReceiptRecordItemProps {
    items: any;
    key: number;
    loadFriendList: () => void;
}

export default function ReceiptRecordItem(props: ReceiptRecordItemProps) {
    const userIdInRedux = useSelector((state: RootState) => state.user.userId);



    const remarks = () => {
        if (props.items.remarks == "undefined") {
            return "N/A"
        }
        return props.items.remarks
    }
    const navigation = useNavigation()

    const showAlert = () => {
        if (userIdInRedux != props.items.user_id) {
            console.log("userIdInRedux :", userIdInRedux);

            Alert.alert('Only the receipt owner can delete', '', [
                {
                    text: 'OK', onPress: () => console.log("ok")
                },
            ]);
            return
        } else {

            Alert.alert('Are you sure to delete', '', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => deleteItem() },
            ]);
        }
    };

    const deleteItem = async () => {

        console.log("DELETE ITEM :", props.items.id)
        await fetch(`${REACT_APP_API_SERVER}/receipts/deleteReceipt/`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                receipt_id: props.items.id,
            }),
        });

        props.loadFriendList()

    }

    const styles = StyleSheet.create({
        text: {
            fontSize: 17,
            fontWeight: "300",
            marginRight: 15
        },
        remarkField: {
            flexDirection: "row",
            flexWrap: "wrap"
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
            paddingRight: "5%"
        },

    })

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "60%", backgroundColor: "cyan" }}
                onPress={() => {
                    navigation.navigate('ReceiptPreview' as never, { image: props.items.receipt_image, remarks: props.items.remarks } as never)
                }}>
                <TouchableOpacity >
                    {/* change navigation to product details */}
                    <View><Image source={{ uri: props.items.receipt_image }}
                        style={{ width: 70, height: 70, marginRight: 20 }} /></View>
                </TouchableOpacity>
                <View>
                    <View><Text style={styles.text}>Payer: {props.items.userName}</Text></View>
                    <View style={styles.remarkField}><Text style={styles.text}>Remarks: {remarks()}</Text></View>
                </View>
            </TouchableOpacity>


            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", width: "40%", backgroundColor: "pink" }}>
                <Text style={styles.text}>${props.items.amount}</Text>
                <TouchableOpacity onPress={showAlert}><FontAwesome name="trash-o" size={20} color={"#47b4b1"} /></TouchableOpacity>
            </View>
            {/* <View></View> */}
        </View>
    )
}