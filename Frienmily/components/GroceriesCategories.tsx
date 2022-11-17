import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function GroceriesCategories() {
    const styles = StyleSheet.create({
        text: {
            fontSize: 10,
            fontWeight: "bold",
        },
        container: {
            flexDirection: "column",
            width: "100%",
            padding: 10,
            paddingTop: 20,
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
            padding: 5,

        },
        categoriesPhotoContainer: {
            height: 80,
            width: "100%",

        },

        textContainer: {
            flexDirection: "column",
            maxWidth: 80,
            height: 25,
        },

    })



    return (
        <View style={styles.container}>

            <View style={styles.container1}>
                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer}>
                        <Image source={require('./img/bakery.png')}
                            style={{ width: 70, height: 70, borderRadius: 15}} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Bakery & Breakfast</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer}>
                        <Image source={require('./img/dairy.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Dairy Products</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer}>
                        <Image source={require('./img/snacks.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Snacks & Dessert</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer}>
                        <Image source={require('./img/stables.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Staples</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer}>
                        <Image source={require('./img/noodles.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Noodles</Text></View></View>
            </View>
            <View style={styles.container1}>
                    <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer}>
                            <Image source={require('./img/beverage.png')}
                                style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Beverages</Text></View></View>

                    <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer}>
                            <Image source={require('./img/alcohol.png')}
                                style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Alcohol</Text></View></View>

                    <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer}>
                            <Image source={require('./img/household.png')}
                                style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Household</Text></View></View>

                    <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer}>
                            <Image source={require('./img/personalcare.png')}
                                style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Personal Care</Text></View></View>

                    <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer}>
                            <Image source={require('./img/fronzen.png')}
                                style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Frozen Food</Text></View></View>
                </View>




        </View>

    )
}