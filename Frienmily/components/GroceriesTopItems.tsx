import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';


interface GroceriesTopItemsProps {
    item: any,
}
export default function GroceriesTopItems(props: GroceriesTopItemsProps) {
    const navigation = useNavigation();
    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
            fontWeight: "500",
        },
        categoriesItemContainer: {
            alignContent: 'center',
            justifyContent: "space-between",
            flexDirection: "column",
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
                    <Text>百佳</Text>
                    <Text>$9</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}


