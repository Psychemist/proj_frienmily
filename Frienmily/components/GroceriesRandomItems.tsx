import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface GroceriesRandomItemsProps {
    item: any,
}

export default function GroceriesRandomItems(props: GroceriesRandomItemsProps) {

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
            fontWeight: "500",
        },
        container: {
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "row",
            padding: 10,
            paddingTop: 10,
            paddingBottom: 20,
            flexWrap: 'wrap',


        },
        categoriesItemContainer: {
            alignContent: 'center',
            justifyContent: "space-between",
            flexDirection: "column",
            width: '33%',
            // maxWidth: 200,
        },
        categoriesPhotoContainer: {
            // height: 80,
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",

        },

        cardContainer: {
            justifyContent: "center",
            flexDirection: "column",
            maxWidth: 150,
            padding: 10,
            height: 80,
        },

        titleContainer: {
            justifyContent: "space-between",
            flexDirection: "column",
            maxWidth: 150,
            height: 50,
        },
        supermarketprice: {
            display: 'flex',
            alignContent: 'stretch',
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 0,
        },
    })


    return (
        <TouchableOpacity style={styles.categoriesItemContainer} onPress={() => navigation.navigate('GroceriesDetails' as never, { info: props.item } as never)}>
            <View style={styles.categoriesPhotoContainer}><Image source={{ uri: props.item.goods_picture }} style={{ width: 120, height: 120 }}></Image></View>
            <View style={styles.cardContainer}>
                <View style={styles.titleContainer}><Text style={styles.text}>{props.item.goods_name}</Text></View>
                <View style={styles.supermarketprice}>
                    <View><Text>百佳</Text></View>
                    <View><Text>$9</Text></View>
                </View>
            </View>
        </TouchableOpacity>
    );
}