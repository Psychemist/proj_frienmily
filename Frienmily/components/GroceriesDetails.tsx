import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from "react-native";
import FriendItem from "./FriendItem";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import GroceriesCategories from "./GroceriesCategories";
import GroceriesDetailsItem from "./GroceriesDetailsItem";

export default function GroceriesDetails() {
    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
        },
        container: {
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            padding: 10,
            paddingTop: 2,
            paddingBottom: 2,
            backgroundColor: "#47b4b1",
            //SHADOW
            // shadowOpacity: 0.1,
            // shadowRadius: 2,
            // shadowOffset: {
            //     height: 1,
            //     width: 1
            // }
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            minWidth: 300,
            maxWidth: 300,
            borderRadius: 10,
            backgroundColor: "white",
        },
        searchButton: {
            margin: 5,
            fontSize: 20,
            backgroundColor: "white",
            width: 120,
            height: 45,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20
        },
        resultContainer: {
            // backgroundColor: "pink",
            minHeight: 450,
            maxHeight: 450,
            width: "100%",
            flexGrow: 1,
            paddingLeft: 40,
            paddingRight: 40,
        },
    });
    const navigation = useNavigation();
    // const [data, setData] = React.useState([]);
    const [groupName, setGroupName] = React.useState("");
    // const [FilterData, setFilterData] = React.useState([]);

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerLargerTitle: true,
    //         headerTitle: "Groceries",
    //         headerSearchBarOptions: {
    //             placeholder: "Search Groceries",
    //             onChangeText: (event: { nativeEvent: { text: any; }; }) => {
    //                 searchFilterFunction(event.nativeEvent.text);
    //             },
    //         }
    //     });
    // }, [navigation]);

    // const searchFilterFunction = (text: string) => {
    //     if(text){
    //         const newData = data.filter(item => {
    //             const itemData = item.name.first? item.name.first.toUpperCase() : ''.toUpperCase();
    //             const textData = text.toUpperCase();
    //             return itemData.indexOf(textData) > -1;
    //         })
    //         setFilterData(newData);
    //     } else {
    //         setFilterData(data);
    //     }
    // }

    return (
 
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={{fontSize: 25, paddingBottom: "1%"}}>Groceries</Text> 
            </View>
            <View style={styles.container}>
                <View><TextInput placeholder="Search Products" value={groupName} onChangeText={setGroupName} style={styles.input} /></View>
                <Pressable onPress={()=> navigation.navigate('Cart' as never)}> 
                <FontAwesome name='shopping-cart' size={30}/>
                </Pressable>
            <TouchableOpacity 
            onPress={() => navigation.navigate()}>
            </TouchableOpacity>
            </View>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Text><GroceriesDetailsItem/></Text>
            </ScrollView>
        </SafeAreaView>
 
    )
}
