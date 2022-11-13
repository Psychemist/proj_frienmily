import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'

export default function GroceriesDetailsItem() {
    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
        },
        container: {
            // justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            padding: 10,
            paddingTop: 10,
            paddingBottom: 20,
            // backgroundColor: "#E2D8CF",
            //SHADOW
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1
            }
        },
        nameContainer: {
            // justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
            width: "100%",
            padding: 10,
            paddingTop: 10,
            paddingBottom: 20,
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
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View><Image source={{uri: 'https://reactjs.org/logo-og.png'}}
            style={{width: 120, height: 120}} /></View>
            
            <View style={styles.nameContainer}>
                <View ><Text style={styles.text}>Groceries Details</Text></View>
                    <View style={styles.nameContainer}>
                        <NumericInput onChange={value => console.log(value)} 
                        totalWidth={80} 
                        totalHeight={30} 
                        iconSize={25}/> 
                        </View>
                    </View>

        </View>   
  
    )
}