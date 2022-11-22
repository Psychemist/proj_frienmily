import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'

export default function CartItem() {
    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
            color: "#384db7"
        },
        price: {
            fontSize: 15,
            color: "black"
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
            // shadowOpacity: 0.8,
            // shadowRadius: 3,
            // shadowOffset: {
            //     height: 1,
            //     width: 1
            // }
        },
    })

    const logPress = (pressType: string) => {
        console.log(pressType)
    }
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <NumericInput onChange={value => console.log(value)}
                totalWidth={80}
                totalHeight={30}
                iconSize={25} />
            {/* value={this.state.value} 
            onChange={value => this.setState({value})} 
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={1.5}
            valueType='real'
            rounded 
            textColor='#B0228C' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'/> */}
            <Pressable onPress={() => navigation.navigate('Groceries' as never)}>
                {/* change navigation to product details */}
                <View><Image source={{ uri: 'https://reactjs.org/logo-og.png' }}
                    style={{ width: 50, height: 50 }} /></View>
            </Pressable>
            <View >
                <View><Text style={styles.text}>Groceries Details</Text></View>
                <View><Text style={styles.text}>Supermarket</Text></View>
            </View>
            <View ><Text style={styles.price}>HK$80</Text></View>
        </View>
    )
}