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
    const getLowest = () => {
        let allPriceArray = [
            { price: parseFloat(props.item.wellcome_price), shop: "惠康" },
            { price: parseFloat(props.item.parknshop_price), shop: "百佳" },
            { price: parseFloat(props.item.jasons_price), shop: "Jasons" },
            { price: parseFloat(props.item.watsons_price), shop: "屈臣氏" },
            { price: parseFloat(props.item.mannings_price), shop: "萬寧" },
            { price: parseFloat(props.item.aeon_price), shop: "AEON" },
            { price: parseFloat(props.item.dch_price), shop: "大昌食品" },
            { price: parseFloat(props.item.ztore_price), shop: "士多" }
        ]
        let filtered = allPriceArray.filter(function (e) {
            return e.price != NaN;
        });
        const lowest = filtered.reduce((previous, current) => {
            return current.price < previous.price ? current : previous;
        });
        return lowest
    }

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
            // maxWidth: 150,
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


    // console.log("props: ", props.item)
    return (
        <TouchableOpacity style={styles.categoriesItemContainer} onPress={() => navigation.navigate('GroceriesDetails' as never, { info: props.item } as never)}>
            <View style={styles.categoriesPhotoContainer}><Image source={{ uri: props.item.goods_picture }} style={{ width: 120, height: 120 }}></Image></View>
            <View style={styles.cardContainer}>
                <View style={styles.titleContainer}><Text style={styles.text}>{props.item.goods_name}</Text></View>
                <View style={styles.supermarketprice}>
                    <View><Text>{getLowest().shop}</Text></View>
                    <View><Text>${getLowest().price}</Text></View>
                </View>
            </View>
        </TouchableOpacity>
    );
}