import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'

export default function ShoppingListItem() {
    const [SelectBuy, setSelectBuy] = React.useState(null);
    const [isSelected, setIsSelected] = React.useState(false);

    const selectButton = () => {
        setSelectBuy("buy" as never)
        setIsSelected(true)
        if (isSelected == true) {
            setIsSelected(false)
        }
    }
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
            paddingTop: 32,
            paddingBottom: 32,
            // backgroundColor: "#E2D8CF",
            //SHADOW
            shadowOpacity: 0.2,
            shadowRadius: 3,
            shadowOffset: {
                height: 1,
                width: 1
            }
        },
        selectButton: {
            // margin: 5,
            borderColor: isSelected ? "lightseagreen" : "",
            borderWidth: isSelected ? 10 : 0,
            width: 20,
            height: 20,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonFontSize: {
            fontSize: 25,

        },
    })

    const logPress = (pressType: string) => {
        console.log(pressType)
    }
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={selectButton}>
                <Text style={styles.buttonFontSize}><FontAwesome name='circle-o' size={20} /></Text>
            </TouchableOpacity>
            <View ><Text style={styles.text}>x2</Text></View>
            <Pressable onPress={()=> navigation.navigate('Groceries' as never)}> 
            {/* change navigation to product details */}
            <View><Image source={{uri: 'https://reactjs.org/logo-og.png'}}
             style={{width: 50, height: 50}} /></View>
             </Pressable>
            <View >
                <View><Text style={styles.text}>Groceries Details</Text></View>
                <View><Text style={styles.text}>Supermarket</Text></View>
            </View>
            <View ><Text style={styles.text}>HK$80</Text></View>
        </View>
    )
}