import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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

        let wellcome_price
        if (props.item.wellcome_price == null) {
            wellcome_price = null
        } else {
            wellcome_price = parseFloat(props.item.wellcome_price)
        }
        let parknshop_price
        if (props.item.parknshop_price == null) {
            parknshop_price = null
        } else {
            parknshop_price = parseFloat(props.item.parknshop_price)
        }
        let jasons_price
        if (props.item.jasons_price == null) {
            jasons_price = null
        } else {
            jasons_price = parseFloat(props.item.jasons_price)
        }
        let watsons_price
        if (props.item.watsons_price == null) {
            watsons_price = null
        } else {
            watsons_price = parseFloat(props.item.watsons_price)
        }
        let mannings_price
        if (props.item.mannings_price == null) {
            mannings_price = null
        } else {
            mannings_price = parseFloat(props.item.mannings_price)
        }
        let aeon_price
        if (props.item.aeon_price == null) {
            aeon_price = null
        } else {
            aeon_price = parseFloat(props.item.aeon_price)
        }
        let dch_price
        if (props.item.dch_price == null) {
            dch_price = null
        } else {
            dch_price = parseFloat(props.item.dch_price)
        }
        let ztore_price
        if (props.item.ztore_price == null) {
            ztore_price = null
        } else {
            ztore_price = parseFloat(props.item.ztore_price)
        }

        let allPriceArray = [
            { price: wellcome_price, shop: "惠康" },
            { price: parknshop_price, shop: "百佳" },
            { price: jasons_price, shop: "Jasons" },
            { price: watsons_price, shop: "屈臣氏" },
            { price: mannings_price, shop: "萬寧" },
            { price: aeon_price, shop: "AEON" },
            { price: dch_price, shop: "大昌食品" },
            { price: ztore_price, shop: "士多" }
        ]

        // console.log("props.item :", props.item)



        let filtered = allPriceArray.filter(function (e) {
            return e.price != null;
        });
        // console.log("filtered :", filtered)

        const lowest = filtered.reduce((previous, current) => {
            return current.price! < previous.price! ? current : previous;
        });
        let tempArray = []
        for (let item of filtered) {
            if (item.price == lowest.price) {
                tempArray.push(item)
            }
        }
        // console.log(tempArray)
        if (tempArray.length > 1) {
            // console.log({ "price": lowest.price, "shop": "多間同價" })
            return { "price": lowest.price, "shop": "多間同價" }
        }
        // console.log("lowest :", lowest)
        return lowest

    }

    const styles = StyleSheet.create({
        text: {
            fontSize: 16,
            color: "grey",
            fontWeight: "bold",
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
        shopText: {
            fontSize: 15,
            color: "darkgrey",
        },
        price: {
            fontSize: 15,
            fontWeight: "bold",
            color: "#47b4b1",
        },
    })


    // console.log("props: ", props.item)
    return (
        <TouchableOpacity style={styles.categoriesItemContainer} onPress={() => navigation.navigate('GroceriesDetails' as never, { info: props.item } as never)}>
            <StatusBar barStyle="light-content" />
            <View style={styles.categoriesPhotoContainer}><Image source={{ uri: props.item.goods_picture }} style={{ width: 120, height: 120 }}></Image></View>
            <View style={styles.cardContainer}>
                <View style={styles.titleContainer}><Text style={styles.text}>{props.item.goods_name}</Text></View>
                <View style={styles.supermarketprice}>
                    <View><Text style={styles.shopText}>{getLowest().shop}</Text></View>
                    <View><Text style={styles.price}>${getLowest().price}</Text></View>
                </View>
            </View>
        </TouchableOpacity>
    );
}