import { REACT_APP_API_SERVER } from "@env";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ReceiptRecordItem from "./ReceiptRecordItem";

export default function ReceiptRecord() {

    // const userIdInRedux = useSelector((state: RootState) => state.user.userId);
    const route = useRoute<any>()
    let groupId = route.params.groupId || ''
    let groupName = route.params.groupName || ''


    const [receiptsArray, setReceiptsArray] = useState([]);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadFriendList();
        }
    }, [isFocused]);

    const loadFriendList = async () => {
        try {
            console.log('loadReceiptsList...');

            const response = await fetch(`${REACT_APP_API_SERVER}/receipts/getAllReceipts/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    groupID: groupId,
                }),
            });
            let json = [];
            if (response) {
                json = await response.json();
            }
            setReceiptsArray(json);

        } catch (error) {
            console.log('error', error);
        }
    };




    const styles = StyleSheet.create({
        header: {
            height: "14%",
            alignItems: "center",
            width: "100%"
        },
        text: {
            borderRadius: 10,
            fontSize: 30,
            fontWeight: "bold",
        },
        backButton: {
            position: 'absolute',
            left: 0,
            paddingLeft: '20%',
            fontSize: 25,
        },
        groupNameWrapper: {
            position: "absolute",
            top: 120,
            padding: '1%'
        },
        addMoreText: {
            fontSize: 15,
            padding: 5,
            color: '#47b4b1',
        },

        totalText: {
            fontSize: 15,
            textAlign: 'right',
            padding: 20,
        },

        buttonText: {
            fontSize: 20,
            // fontWeight: '300',
            color: 'white',
        },
        scrollWrapper: {
            width: "98%",
            height: 500,
            paddingHorizontal: 5
        },
        receiptBtn: {
            backgroundColor: '#47b4b1',
            height: 60,
            width: 360,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: "3%",
            borderRadius: 15,
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'white',
            bottomTop: "20%"

        },
    })

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative", backgroundColor: "white" }}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome name='angle-left' size={35} />
                </TouchableOpacity>
                <Text style={styles.text}>Receipt Record</Text>
            </View>

            <View style={styles.groupNameWrapper}>
                <Text style={{ fontSize: 23, fontWeight: "300" }}>{groupName}</Text>
            </View>

            <ScrollView style={styles.scrollWrapper}>
                {receiptsArray.map((item: any, idx: number) => (
                    <ReceiptRecordItem items={item} key={idx} loadFriendList={loadFriendList} />
                ))}
            </ScrollView>

            <View >
                <TouchableOpacity
                    style={styles.receiptBtn}
                    onPress={() => {
                        navigation.navigate('UploadReceipt' as never, { groupId: groupId } as never)
                    }}>
                    <Text style={styles.buttonText}>Upload Receipt</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}