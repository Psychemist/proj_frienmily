import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReceiptRecordItem from "./ReceiptRecordItem";

export default function ReceiptRecord() {
    const styles = StyleSheet.create({
        container: {
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            padding: 10,
            paddingTop: 10,
            paddingBottom: 20,
            backgroundColor: "#47b4b1",
            //SHADOW
            // shadowOpacity: 0.1,
            // shadowRadius: 2,
            // shadowOffset: {
            //     height: 1,
            //     width: 1
            // }
            fontSize: 20,
            fontWeight: '300',
            color: 'white',
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
        
        assignGroupButton: {
            backgroundColor: '#47b4b1',
            height: 40,
            width: 400,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            borderRadius: 15,
            marginLeft:'auto',
            marginRight:'auto',
            color: 'white',
        },
    })
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={{fontSize: 30,fontWeight: '300', color: 'white',}}>Receipt Record</Text> 
            </View>
             <View style={styles.container}>
                   <Text style={{fontSize: 20,fontWeight: '300', color: 'white',}}>GROUP NAME</Text>
            </View>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Text><ReceiptRecordItem/></Text>
                <Text><ReceiptRecordItem/></Text>
                <Text><ReceiptRecordItem/></Text>
                <Text><ReceiptRecordItem/></Text>
                <Text><ReceiptRecordItem/></Text>
                <Text><ReceiptRecordItem/></Text>
                <Text><ReceiptRecordItem/></Text>
                <Text><ReceiptRecordItem/></Text>
                <Text><ReceiptRecordItem/></Text>
              

            </ScrollView>
            <View >
                <View>
                    <TouchableOpacity
                    style={styles.assignGroupButton}
                        onPress={() => {
                        navigation.navigate('UploadReceipt' as never)
                    }}>
                    <Text style={styles.buttonText}>Upload Receipt</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </SafeAreaView>
    )
}