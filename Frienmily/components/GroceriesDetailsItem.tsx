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
            backgroundColor: "blue",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: 10,
            paddingTop: 10,
            paddingBottom: 20,
            //SHADOW
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1
            }
        },
        topWrapper: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
            width: "100%",
            padding: 10

        },
        imageWrapper: {
            width: 120,
            height: 120
        },
        nameWrapper: {
            backgroundColor: "yellow",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "60%",
            height: "50%",
            paddingLeft: 10,
        },
    })
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* <View style={styles.topWrapper}>
                <Image source={{ uri: 'https://reactjs.org/logo-og.png' }}
                    style={styles.imageWrapper} />
                <View style={styles.nameWrapper}>
                    <View >
                        <Text style={styles.text}>Product Name</Text>
                    </View>
                    <View>
                        <NumericInput onChange={value => console.log(value)}
                            totalWidth={100}
                            totalHeight={30}
                            iconSize={25} />
                    </View>
                </View>

            </View>
            <View>
                <View><Text>惠康</Text></View>
                <View><Text>百佳</Text></View>
                <View><Text>Market Place by Jasons</Text></View>
                <View><Text>屈臣氏</Text></View>
                <View><Text>萬寧</Text></View>
                <View><Text>AEON</Text></View>
                <View><Text>大昌食品</Text></View>
            </View> */}
        </View>

    )
}