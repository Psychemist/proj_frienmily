import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function GroceriesItems() {
    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
        },
        container: {
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            padding: 10,
            paddingTop: 30,
            paddingBottom: 30,
            // backgroundColor: "#E2D8CF",
            //SHADOW
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1
            }
        },
    })

    return (
        <View style={styles.container}>
            <View><Image source={{uri: 'https://reactjs.org/logo-og.png'}}
        style={{width: 120, height: 120}} /></View>
        <View ><Text style={styles.text}>Price</Text></View>
        <View ><Text style={styles.text}>Supermarket</Text></View>
        <View ><Text style={styles.text}>Groceries Details</Text></View>
        </View>
    )
}