import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface GroceriesCategoriesProps {
    fetchData: (array: any, page: number) => void,
    page: number
    // getCategoryArrayFromChild: (array: any) => void
}

export default function GroceriesCategories(props: GroceriesCategoriesProps) {
    const [button1, setButton1] = useState(false)
    const [button2, setButton2] = useState(false)
    const [button3, setButton3] = useState(false)
    const [button4, setButton4] = useState(false)
    const [button5, setButton5] = useState(false)
    const [button6, setButton6] = useState(false)
    const [button7, setButton7] = useState(false)
    const [button8, setButton8] = useState(false)
    const [button9, setButton9] = useState(false)
    const [button10, setButton10] = useState(false)
    const [page, setPage] = useState(props.page)

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
            shadowOpacity: button1 ? 1 : 0,
            shadowColor: button1 ? "#47b4b1" : "",
            shadowRadius: button1 ? 2 : 0,
            shadowOffset: {
                height: button1 ? 4 : 0,
                width: button1 ? 4 : 0
            }
        },
        categoriesPhotoContainer2: {
            height: 80,
            width: "100%",
            shadowOpacity: button2 ? 1 : 0,
            shadowColor: button2 ? "#47b4b1" : "",
            shadowRadius: button2 ? 2 : 0,
            shadowOffset: {
                height: button2 ? 4 : 0,
                width: button2 ? 4 : 0
            }
        },
        categoriesPhotoContainer3: {
            height: 80,
            width: "100%",
            shadowOpacity: button3 ? 1 : 0,
            shadowColor: button3 ? "#47b4b1" : "",
            shadowRadius: button3 ? 2 : 0,
            shadowOffset: {
                height: button3 ? 4 : 0,
                width: button3 ? 4 : 0
            }
        }, categoriesPhotoContainer4: {
            height: 80,
            width: "100%",
            shadowOpacity: button4 ? 1 : 0,
            shadowColor: button4 ? "#47b4b1" : "",
            shadowRadius: button4 ? 2 : 0,
            shadowOffset: {
                height: button4 ? 4 : 0,
                width: button4 ? 4 : 0
            }
        }, categoriesPhotoContainer5: {
            height: 80,
            width: "100%",
            shadowOpacity: button5 ? 1 : 0,
            shadowColor: button5 ? "#47b4b1" : "",
            shadowRadius: button5 ? 2 : 0,
            shadowOffset: {
                height: button5 ? 4 : 0,
                width: button5 ? 4 : 0
            }
        }, categoriesPhotoContainer6: {
            height: 80,
            width: "100%",
            shadowOpacity: button6 ? 1 : 0,
            shadowColor: button6 ? "#47b4b1" : "",
            shadowRadius: button6 ? 2 : 0,
            shadowOffset: {
                height: button6 ? 4 : 0,
                width: button6 ? 4 : 0
            }
        }, categoriesPhotoContainer7: {
            height: 80,
            width: "100%",
            shadowOpacity: button7 ? 1 : 0,
            shadowColor: button7 ? "#47b4b1" : "",
            shadowRadius: button7 ? 2 : 0,
            shadowOffset: {
                height: button7 ? 4 : 0,
                width: button7 ? 4 : 0
            }
        }, categoriesPhotoContainer8: {
            height: 80,
            width: "100%",
            shadowOpacity: button8 ? 1 : 0,
            shadowColor: button8 ? "#47b4b1" : "",
            shadowRadius: button8 ? 2 : 0,
            shadowOffset: {
                height: button8 ? 4 : 0,
                width: button8 ? 4 : 0
            }
        }, categoriesPhotoContainer9: {
            height: 80,
            width: "100%",
            shadowOpacity: button9 ? 1 : 0,
            shadowColor: button9 ? "#47b4b1" : "",
            shadowRadius: button9 ? 2 : 0,
            shadowOffset: {
                height: button9 ? 4 : 0,
                width: button9 ? 4 : 0
            }
        }, categoriesPhotoContainer10: {
            height: 80,
            width: "100%",
            shadowOpacity: button10 ? 1 : 0,
            shadowColor: button10 ? "#47b4b1" : "",
            shadowRadius: button10 ? 2 : 0,
            shadowOffset: {
                height: button10 ? 4 : 0,
                width: button10 ? 4 : 0
            }
        },

    })

    // if (finalSelectedCategoriesArray.length == 0 || finalSelectedCategoriesArray.length == 10) {
    //     // console.log("LOAD ALL CATTEGORIES!!!")
    //     // props.allCatFetch()
    // } else {
    //     // console.log(finalSelectedCategoriesArray);
    //     props.someCatFetch(finalSelectedCategoriesArray)
    // }
    useEffect(() => {
        const booleanArray = [{ isSelected: button1, id: 1 }, { isSelected: button2, id: 2 }, { isSelected: button3, id: 3 }, { isSelected: button4, id: 4 }, { isSelected: button5, id: 5 }, { isSelected: button6, id: 6 }, { isSelected: button7, id: 7 }, { isSelected: button8, id: 8 }, { isSelected: button9, id: 9 }, { isSelected: button10, id: 10 }]
        const finalSelectedCategoriesArray = []
        for (let item of booleanArray) {
            if (item.isSelected == true) {
                finalSelectedCategoriesArray.push(item.id)
            }
        }
        console.log("######## categoryArray: ", finalSelectedCategoriesArray)
        console.log("######## page: ", page)

        if (finalSelectedCategoriesArray.length == 0) {
            props.fetchData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], page)
            // props.getCategoryArrayFromChild([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        } else {
            props.fetchData(finalSelectedCategoriesArray, page)
            // props.getCategoryArrayFromChild(finalSelectedCategoriesArray)
        }
    }, [button1, button2, button3, button4, button5, button6, button7, button8, button9, button10, page]);






    return (
        <View style={styles.container}>

            <View style={styles.container1}>
                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer1} onPress={() => { setButton1(!button1) }}>
                        <Image source={require('./img/bakery.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Bakery & Breakfast</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer2} onPress={() => { setButton2(!button2) }}>
                        <Image source={require('./img/dairy.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Dairy Products</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer3} onPress={() => { setButton3(!button3) }}>
                        <Image source={require('./img/snacks.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Snacks & Dessert</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer4} onPress={() => { setButton4(!button4) }}>
                        <Image source={require('./img/stables.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Staples</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer5} onPress={() => { setButton5(!button5) }}>
                        <Image source={require('./img/noodles.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Noodles</Text></View></View>
            </View>
            <View style={styles.container1}>
                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer6} onPress={() => { setButton6(!button6) }}>
                        <Image source={require('./img/beverage.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Beverages</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer7} onPress={() => { setButton7(!button7) }}>
                        <Image source={require('./img/alcohol.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Alcohol</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer8} onPress={() => { setButton8(!button8) }}>
                        <Image source={require('./img/household.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Household</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer9} onPress={() => { setButton9(!button9) }}>
                        <Image source={require('./img/personalcare.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Personal Care</Text></View></View>

                <View style={styles.categoriesItemContainer}>
                    <TouchableOpacity style={styles.categoriesPhotoContainer10} onPress={() => { setButton10(!button10) }}>
                        <Image source={require('./img/fronzen.png')}
                            style={{ width: 70, height: 70, borderRadius: 15 }} /></TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Frozen Food</Text></View></View>
            </View>




        </View>

    )
}