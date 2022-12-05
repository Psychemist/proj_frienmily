import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface GroceriesCategoriesProps {
    setButton1: Function
    setButton2: Function
    setButton3: Function
    setButton4: Function
    setButton5: Function
    setButton6: Function
    setButton7: Function
    setButton8: Function
    setButton9: Function
    setButton10: Function
    button1: boolean
    button2: boolean
    button3: boolean
    button4: boolean
    button5: boolean
    button6: boolean
    button7: boolean
    button8: boolean
    button9: boolean
    button10: boolean


    // getCategoryArrayFromChild: (array: any) => void
}

export default function GroceriesCategories(props: GroceriesCategoriesProps) {


    const styles = StyleSheet.create({
        text: {
            fontSize: 10,
            fontWeight: "bold",
            color: "#606467",
        },
        container: {
            flexDirection: "column",
            width: "100%",
            padding: 10,
            // paddingTop: 20,
            paddingBottom: 5,
            // backgroundColor: "#E2D8CF",
            //SHADOW
            shadowOpacity: 0.2,
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1
            }
        },
        container1: {
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
        },
        categoriesItemContainer: {
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
            width: "20%",
            paddingBottom: 5,
            //SHADOW
            // shadowOpacity: 1,
            // shadowColor: "#47b4b1",
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1
            }

        },
        textContainer: {
            flexDirection: "column",
            maxWidth: 80,
            height: 25,
        },
        categoriesPhotoContainer1: {
            height: 80,
            width: "100%",
            shadowOpacity: props.button1 ? 1 : 0,
            shadowColor: props.button1 ? "#47b4b1" : "",
            shadowRadius: props.button1 ? 2 : 0,
            shadowOffset: {
                height: props.button1 ? 4 : 0,
                width: props.button1 ? 4 : 0
            }
        },
        categoriesPhotoContainer2: {
            height: 80,
            width: "100%",
            shadowOpacity: props.button2 ? 1 : 0,
            shadowColor: props.button2 ? "#47b4b1" : "",
            shadowRadius: props.button2 ? 2 : 0,
            shadowOffset: {
                height: props.button2 ? 4 : 0,
                width: props.button2 ? 4 : 0
            }
        },
        categoriesPhotoContainer3: {
            height: 80,
            width: "100%",
            shadowOpacity: props.button3 ? 1 : 0,
            shadowColor: props.button3 ? "#47b4b1" : "",
            shadowRadius: props.button3 ? 2 : 0,
            shadowOffset: {
                height: props.button3 ? 4 : 0,
                width: props.button3 ? 4 : 0
            }
        }, categoriesPhotoContainer4: {
            height: 80,
            width: "100%",
            shadowOpacity: props.button4 ? 1 : 0,
            shadowColor: props.button4 ? "#47b4b1" : "",
            shadowRadius: props.button4 ? 2 : 0,
            shadowOffset: {
                height: props.button4 ? 4 : 0,
                width: props.button4 ? 4 : 0
            }
        }, categoriesPhotoContainer5: {
            height: 80,
            width: "100%",
            shadowOpacity: props.button5 ? 1 : 0,
            shadowColor: props.button5 ? "#47b4b1" : "",
            shadowRadius: props.button5 ? 2 : 0,
            shadowOffset: {
                height: props.button5 ? 4 : 0,
                width: props.button5 ? 4 : 0
            }
        }, categoriesPhotoContainer6: {
            height: 80,
            width: "100%",
            shadowOpacity: props.button6 ? 1 : 0,
            shadowColor: props.button6 ? "#47b4b1" : "",
            shadowRadius: props.button6 ? 2 : 0,
            shadowOffset: {
                height: props.button6 ? 4 : 0,
                width: props.button6 ? 4 : 0
            }
        }, categoriesPhotoContainer7: {
            height: 80,
            width: "100%",
            shadowOpacity: props.button7 ? 1 : 0,
            shadowColor: props.button7 ? "#47b4b1" : "",
            shadowRadius: props.button7 ? 2 : 0,
            shadowOffset: {
                height: props.button7 ? 4 : 0,
                width: props.button7 ? 4 : 0
            }
        }, categoriesPhotoContainer8: {
            height: 80,
            width: "100%",
            shadowOpacity: props.button8 ? 1 : 0,
            shadowColor: props.button8 ? "#47b4b1" : "",
            shadowRadius: props.button8 ? 2 : 0,
            shadowOffset: {
                height: props.button8 ? 4 : 0,
                width: props.button8 ? 4 : 0
            }
        }, categoriesPhotoContainer9: {
            height: 80,
            width: "100%",
            shadowOpacity: props.button9 ? 1 : 0,
            shadowColor: props.button9 ? "#47b4b1" : "",
            shadowRadius: props.button9 ? 2 : 0,
            shadowOffset: {
                height: props.button9 ? 4 : 0,
                width: props.button9 ? 4 : 0
            }
        }, categoriesPhotoContainer10: {
            height: 80,
            width: "100%",
            shadowOpacity: props.button10 ? 1 : 0,
            shadowColor: props.button10 ? "#47b4b1" : "",
            shadowRadius: props.button10 ? 2 : 0,
            shadowOffset: {
                height: props.button10 ? 4 : 0,
                width: props.button10 ? 4 : 0
            }
        },
        catBtn: {
            width: 70,
            height: 70,
            borderRadius: 15
        }
    })



    return (

        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container1}>
                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer1} onPress={() => { props.setButton1(!props.button1) }}>
                        <Image source={require('./img/bakery.png')}
                            style={{ width: 64, height: 64, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Bakery & Breakfast</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer2} onPress={() => { props.setButton2(!props.button2) }}>
                        <Image source={require('./img/dairy.png')}
                            style={{ width: 64, height: 64, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Dairy Products</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer3} onPress={() => { props.setButton3(!props.button3) }}>
                        <Image source={require('./img/snacks.png')}
                            style={{ width: 64, height: 64, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Snacks & Dessert</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer4} onPress={() => { props.setButton4(!props.button4) }}>
                        <Image source={require('./img/staples.png')}
                            style={{ width: 64, height: 64, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Staples</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer5} onPress={() => { props.setButton5(!props.button5) }}>
                        <Image source={require('./img/noodles.png')}
                            style={{ width: 64, height: 64, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Noodles</Text></View></View>
            </View>
            <View style={styles.container1}>
                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer6} onPress={() => { props.setButton6(!props.button6) }}>
                        <Image source={require('./img/beverage.png')}
                            style={{ width: 64, height: 64, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Beverages</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer7} onPress={() => { props.setButton7(!props.button7) }}>
                        <Image source={require('./img/alcohol.png')}
                            style={{ width: 64, height: 64, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Alcohol</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer8} onPress={() => { props.setButton8(!props.button8) }}>
                        <Image source={require('./img/household.png')}
                            style={{ width: 64, height: 64, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Household</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer9} onPress={() => { props.setButton9(!props.button9) }}>
                        <Image source={require('./img/personalcare.png')}
                            style={{ width: 64, height: 64, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Personal Care</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer10} onPress={() => { props.setButton10(!props.button10) }}>
                        <Image source={require('./img/fronzen.png')}
                            style={{ width: 64, height: 64, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Frozen Food</Text></View></View>
            </View>




        </View>

    )
}