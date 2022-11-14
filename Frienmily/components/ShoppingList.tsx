import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ShoppingListItem from "./ShoppingListItem";

export default function ShoppingList() {
    const styles = StyleSheet.create({
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
        header: {
            height: "14%",
            alignItems: "center",
            // paddingTop: "1%",
            marginBottom: "10%",
            width: "100%"
        },
        backButton: {
            position: 'absolute',
            left: 0,
            paddingLeft: "20%",
            fontSize: 25
        },
        text: {
            fontSize: 30,
        },
    })
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 , alignItems: 'center'}}>
            {/* <View style={{alignItems: "center"}}>
                <Text style={{fontSize: 25, paddingBottom: "1%"}}>Shopping List</Text> 
            </View> */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={()=> navigation.navigate('HomeTab' as never)}>
                    <FontAwesome name='angle-left' size={35} />
                </TouchableOpacity>

                <Text style={styles.text}>Shopping List</Text>
            </View>
            <View style={{alignItems: "center"}}><Text style={{fontSize: 20, padding: "1%"}}>GROUP NAME</Text></View>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Text><ShoppingListItem/></Text>
                <Text><ShoppingListItem/></Text>
                <Text><ShoppingListItem/></Text>
                <Text><ShoppingListItem/></Text>
                <Text><ShoppingListItem/></Text>
                <Text><ShoppingListItem/></Text>
                <Text><ShoppingListItem/></Text>
                <Text><ShoppingListItem/></Text>
                <Text><ShoppingListItem/></Text>
             

            </ScrollView>
            <View >
                <View>
                    <TouchableOpacity
                        style={styles.addMoreText}
                        onPress={() => {
                            navigation.navigate('Groceries' as never)
                        }}>
                        <Text style={styles.addMoreText}>+ Add more items</Text>
                    </TouchableOpacity>
                </View>
                <View><Text style={styles.totalText}>Estimate Total: HKD$ 800</Text></View>
                <View>
                    <TouchableOpacity
                    style={styles.assignGroupButton}
                        onPress={() => {
                        navigation.navigate('UploadReceipt' as never)
                    }}>
                    <Text style={styles.buttonText}>Upload Receipt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.assignGroupButton}
                        onPress={() => {
                        navigation.navigate('ReceiptRecord' as never)
                    }}>
                    <Text style={styles.buttonText}>Receipt Record</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </SafeAreaView>
    )
}