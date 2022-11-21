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
    // let groupID = route.params.groupId || ''
    let groupName = route.params.groupName || ''


    // const [friendItemList, setFriendItemList] = useState([]);
    // const [totalAmount, setTotalAmount]: any = useState();

    const navigation = useNavigation();
    // const isFocused = useIsFocused();

    // useEffect(() => {
    //     const loadFriendList = async () => {
    //         try {
    //             console.log('loadGroupList...');
    //             console.log("groupID :", groupID);

    //             const response = await fetch(`${REACT_APP_API_SERVER}/groups/getGroupMembers/`, {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({
    //                     groupID: groupID,
    //                 }),
    //             });
    //             let json = [];
    //             if (response) {
    //                 json = await response.json();
    //             }
    //             console.log("json :", json);
    //             setFriendItemList(json);
    //             let count: number = 0
    //             for (let j of json) {
    //                 console.log(j.paid);
    //                 if (j.paid != null) {
    //                     count += parseInt(j.paid)
    //                 }
    //             }
    //             setTotalAmount(count)



    //         } catch (error) {
    //             console.log('error', error);
    //         }
    //     };
    //     if (isFocused) {
    //         loadFriendList();
    //     }
    // }, [isFocused]);




    const styles = StyleSheet.create({
        // container: {
        //     justifyContent: "space-between",
        //     alignItems: "center",
        //     flexDirection: "column",
        //     width: "100%",
        //     padding: 10,
        //     paddingTop: 10,
        //     paddingBottom: 20,
        //     backgroundColor: "#47b4b1",
        //     //SHADOW
        //     // shadowOpacity: 0.1,
        //     // shadowRadius: 2,
        //     // shadowOffset: {
        //     //     height: 1,
        //     //     width: 1
        //     // }
        //     fontSize: 20,
        //     fontWeight: '300',
        //     color: 'white',
        // },
        header: {
            height: "14%",
            alignItems: "center",
            width: "100%"
        },
        text: {
            fontSize: 30,
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
            fontWeight: '300',
            color: 'white',
        },
        scrollWrapper: {
            width: "98%",
            height: 500,
            paddingHorizontal: 5
        },
        receiptBtn: {
            backgroundColor: '#47b4b1',
            height: 40,
            width: 360,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            borderRadius: 15,
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'white',
        },
    })

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative" }}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeTab' as never)}>
                    <FontAwesome name='angle-left' size={35} />
                </TouchableOpacity>
                <Text style={styles.text}>Receipt Record</Text>
            </View>

            <View style={styles.groupNameWrapper}>
                <Text style={{ fontSize: 20 }}>{groupName}</Text>
            </View>

            <ScrollView style={styles.scrollWrapper}>
                <ReceiptRecordItem />
                <ReceiptRecordItem />
                <ReceiptRecordItem />
                <ReceiptRecordItem />
                <ReceiptRecordItem />
                <ReceiptRecordItem />
                <ReceiptRecordItem />
                <ReceiptRecordItem />
                <ReceiptRecordItem />
            </ScrollView>

            <View >
                <TouchableOpacity
                    style={styles.receiptBtn}
                    onPress={() => {
                        navigation.navigate('UploadReceipt' as never)
                    }}>
                    <Text style={styles.buttonText}>Upload Receipt</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}