import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Image } from "react-native";
import FriendItem from "./FriendItem";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import GroceriesCategories from "./GroceriesCategories";
import GroceriesDetailsItem from "./GroceriesDetailsItem";
import NumericInput from "react-native-numeric-input";

export default function GroceriesDetails() {
    const styles = StyleSheet.create({
        searchBarcontainer: {
            top: 0,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "90%",
            padding: 10,
            paddingTop: 2,
            paddingBottom: 2,
            backgroundColor: "#47b4b1",
            //SHADOW
            // shadowOpacity: 0.1,
            // shadowRadius: 2,
            // shadowOffset: {
            //     height: 1,
            //     width: 1
            // }
        },
        header: {
            height: "5%",
            alignItems: "center",
            width: "100%"
        },
        text: {
            fontSize: 25,
        },
        backButton: {
            left: 0,
            fontSize: 25,
        },
        cartQty: {
            justifyContent: "center",
            alignItems: "center",
            height: 20,
            width: 20,
            borderRadius: 100,
            backgroundColor: "#f79f24",
            position: "absolute",
            top: -10,
            right: -10
        },

        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            minWidth: 300,
            maxWidth: 300,
            borderRadius: 10,
            backgroundColor: "white",
        },
        searchButton: {
            margin: 5,
            fontSize: 20,
            backgroundColor: "white",
            width: 120,
            height: 45,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20
        },
        resultContainer: {
            // backgroundColor: "pink",
            minHeight: 450,
            maxHeight: 450,
            width: "100%",
            flexGrow: 1,
            paddingLeft: 40,
            paddingRight: 40,
        },

        topWrapper: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            padding: 10

        },
        imageWrapper: {
            width: 120,
            height: 120
        },
        nameWrapper: {
            justifyContent: "space-between",
            flexDirection: "column",
            width: "65%",
            height: 120,
            paddingLeft: 10,
        },
        contentContainer: {
            backgroundColor: 'white',
            flexDirection: "column",
            alignItems: "center",
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
        supermarketWrapper: {
            padding: 10,
            flexDirection: "column",
            alignItems: "center",
            width: "100%"
        },
        supermarket: {
            backgroundColor: "#f1f3f2",
            width: "99%",
            height: 41,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            margin: 5,
        },
        colorDot: {
            position: "absolute",
            left: 10,
            height: 7,
            width: 7,
            borderRadius: 5,
        },
        productImageBtn: {
            position: "absolute",
            right: 10,
        }

    });
    const navigation = useNavigation();
    // const [data, setData] = React.useState([]);
    const [groupName, setGroupName] = React.useState("");
    // const [FilterData, setFilterData] = React.useState([]);

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerLargerTitle: true,
    //         headerTitle: "Groceries",
    //         headerSearchBarOptions: {
    //             placeholder: "Search Groceries",
    //             onChangeText: (event: { nativeEvent: { text: any; }; }) => {
    //                 searchFilterFunction(event.nativeEvent.text);
    //             },
    //         }
    //     });
    // }, [navigation]);

    // const searchFilterFunction = (text: string) => {
    //     if(text){
    //         const newData = data.filter(item => {
    //             const itemData = item.name.first? item.name.first.toUpperCase() : ''.toUpperCase();
    //             const textData = text.toUpperCase();
    //             return itemData.indexOf(textData) > -1;
    //         })
    //         setFilterData(newData);
    //     } else {
    //         setFilterData(data);
    //     }
    // }

    return (

        <SafeAreaView style={{ flex: 1, position: "relative", backgroundColor: '#47b4b1' }}>

            <View style={styles.searchBarcontainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeTab' as never)} >
                    <FontAwesome name='angle-left' size={35} />
                </TouchableOpacity>
                <View>
                    <TextInput
                        placeholder="Search Products"
                        value={groupName}
                        onChangeText={setGroupName}
                        style={styles.input}
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)} style={{ position: "relative" }}>
                        <FontAwesome name="shopping-cart" size={30} />
                        <View style={styles.cartQty}>
                            <Text>0</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.topWrapper}>
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
                <View style={styles.supermarketWrapper}>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#7dbfe9" }]}></View>
                        <Text style={{ marginLeft: 12 }}>惠康</Text>
                        <Text style={{ marginRight: 50 }}>$9.00</Text>
                        <TouchableOpacity style={styles.productImageBtn}>
                            <FontAwesome name="image" style={{ fontSize: 20, color: "#47b4b1" }}></FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#fdbb1b" }]}></View>
                        <Text style={{ marginLeft: 12 }}>百佳</Text>
                        <Text style={{ marginRight: 50 }}>$9.00</Text>
                        <TouchableOpacity style={styles.productImageBtn}>
                            <FontAwesome name="image" style={{ fontSize: 20, color: "#47b4b1" }}></FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#035033" }]}></View>
                        <Text style={{ marginLeft: 12 }}>Market Place by Jasons</Text>
                        <Text style={{ marginRight: 50 }}>$9.00</Text>
                        <TouchableOpacity style={styles.productImageBtn}>
                            <FontAwesome name="image" style={{ fontSize: 20, color: "#47b4b1" }}></FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#fd3b02" }]}></View>
                        <Text style={{ marginLeft: 12 }}>屈臣氏</Text>
                        <Text style={{ marginRight: 50 }}>--</Text>
                        <TouchableOpacity style={styles.productImageBtn}>
                            <FontAwesome name="image" style={{ fontSize: 20, color: "#47b4b1" }}></FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#93bf03" }]}></View>
                        <Text style={{ marginLeft: 12 }}>萬寧</Text>
                        <Text style={{ marginRight: 50 }}>--</Text>
                        <TouchableOpacity style={styles.productImageBtn}>
                            <FontAwesome name="image" style={{ fontSize: 20, color: "#47b4b1" }}></FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#ff893d" }]}></View>
                        <Text style={{ marginLeft: 12 }}>AEON</Text>
                        <Text style={{ marginRight: 50 }}>$9.00</Text>
                        <TouchableOpacity style={styles.productImageBtn}>
                            <FontAwesome name="image" style={{ fontSize: 20, color: "#47b4b1" }}></FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#9772ef" }]}></View>
                        <Text style={{ marginLeft: 12 }}>大昌食品</Text>
                        <Text style={{ marginRight: 50 }}>--</Text>
                        <TouchableOpacity style={styles.productImageBtn}>
                            <FontAwesome name="image" style={{ fontSize: 20, color: "#47b4b1" }}></FontAwesome>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeTab' as never)} >
                    <FontAwesome name='angle-left' size={35} />
                </TouchableOpacity>
                <Text style={styles.text}>Product Details</Text>
            </View>
            <View style={styles.container}>
                <View><TextInput placeholder="Search Products" value={groupName} onChangeText={setGroupName} style={styles.input} /></View>
                <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)} style={{ position: "relative" }}>
                    <FontAwesome name='shopping-cart' size={30} />
                    <View style={styles.cartQty}>
                        <Text>0</Text>
                    </View>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>

    )
}
