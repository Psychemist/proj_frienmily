import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';


interface GroceriesTopItemsProps {
    name: string;
    barcode: number;
    category_id: number;
    goods_picture: Text;
}
export default function GroceriesTopItems({ items, status }: { items: Array<GroceriesTopItemsProps>, status: string }) {
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
            // width: "100%",
            padding: 10,
            paddingTop: 10,
            paddingBottom: 20,
            // backgroundColor: "#E2D8CF",

        },
        categoriesItemContainer: {
            alignContent: 'center',
            justifyContent: "space-between",
            flexDirection: "column",
            // width: "100%",
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
        <View style={styles.categoriesItemContainer}>
            <View
                style={{ flexDirection: 'row' }}>
                {status === "error" && <Text>Error fetching data</Text>}
                {status === "loading" && <Text>Fetching data...</Text>}
                {status === 'success' && <View style={styles.container}>

                    {items.map((item: any) => {
                        return (
                            <TouchableOpacity style={styles.categoriesItemContainer} key={item.id}>
                                <View style={styles.categoriesPhotoContainer}><Image source={{ uri: item.goods_picture }} style={{ width: 120, height: 120 }}></Image></View>
                                <View style={styles.cardContainer}>
                                    <View style={styles.titleContainer}><Text style={styles.text}>{item.name}</Text></View>
                                    <View style={styles.supermarketprice}>
                                        <View><Text>百佳{item.supermarket}</Text></View>
                                        <View><Text>$9{item.price}</Text></View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                }
            </View>

        </View>

    );
}



