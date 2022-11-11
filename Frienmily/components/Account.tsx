import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Account() {
    const styles = StyleSheet.create({
        mainPage: {
            flex: 1
        },
        title: {
            // height: 40,
            // margin: 12,
            padding: 5,
            // minWidth: 300,
            // maxWidth: 300,
            borderRadius: 10,
            fontSize: 30
        },
        itemContainer: {
            width: "100%",
            backgroundColor: "pink",
            // justifyContent: "space-around",
            // alignItems: "center",
            // flexDirection: "row",
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 15,
            marginTop: 5,
            marginBottom: 5,
            height: 120,
            alignItems: "center",
            // justifyContent: "space-between",
            // alignItems:"space-around",

        },
        innerContainer: {
            justifyContent: "space-between",
        },
    });
    return (
        <SafeAreaView style={styles.mainPage}>
            <View style={{alignItems: "center"}}>
                <Text style={{fontSize: 25, paddingBottom: "1%"}}>Account</Text> 
            </View>
            <Text style={styles.title}>Personal Details</Text>
            {/* <View style={styles.itemContainer}>
                <View>
                    <Text>Name</Text>
                    <Text>Chan Tai Man</Text>
                </View>
                <View>
                    <Text><FontAwesome name='pencil' size={40}/></Text>
                </View>

            </View>
            <View style={styles.itemContainer}>
                <Text>Mobile Number (For adding friends)</Text>
                <Text>1234 5678</Text>
            </View> */}
            <View style={styles.itemContainer}>
                <Text>Email</Text>
                <Text>frienmily@gmail.com</Text>
            </View>
            <Text style={styles.title}>Connected Account</Text>
        </SafeAreaView>
    )
}