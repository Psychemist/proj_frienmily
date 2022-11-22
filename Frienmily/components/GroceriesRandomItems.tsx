import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function GroceriesRandomItems() {
    // const styles = StyleSheet.create({
    //     text: {
    //         fontSize: 15,
    //     },
    //     container: {
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         flexDirection: "column",
    //         width: "100%",
    //         padding: 10,
    //         paddingTop: 10,
    //         paddingBottom: 20,
    //         // backgroundColor: "#E2D8CF",
    //         //SHADOW
    //         shadowOpacity: 0.1,
    //         shadowRadius: 2,
    //         shadowOffset: {
    //             height: 1,
    //             width: 1
    //         }
    //     },
    // })
    // const navigation = useNavigation();
    // return (
    //     <View style={styles.container}>
    //         <TouchableOpacity
    //             onPress={() => {
    //                 navigation.navigate('GroceriesDetails' as never)
    //                 }}>
    //             <View><Image source={{uri: 'https://reactjs.org/logo-og.png'}}
    //         style={{width: 120, height: 120}} /></View>
    //         <View ><Text style={styles.text}>Price</Text></View>
    //         <View ><Text style={styles.text}>Supermarket</Text></View>
    //         <View ><Text style={styles.text}>Groceries Details</Text></View>
    //     </TouchableOpacity>

    //     </View>
    // )


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