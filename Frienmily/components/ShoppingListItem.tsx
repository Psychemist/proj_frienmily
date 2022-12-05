import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable, Alert } from "react-native";
import React, { useEffect } from 'react';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'
import { REACT_APP_API_SERVER } from '@env';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


interface ShoppingListItemProps {
    items: any;
    key: number;
    reloadPage: () => void;
    groupId: number
}

export default function ShoppingListItem(props: ShoppingListItemProps) {
    const userIdInRedux = useSelector((state: RootState) => state.user.userId);
    const [isSelected, setIsSelected] = React.useState(props.items.is_completed);
    const [assigneeName, setAssigneeName] = React.useState('');
    const [buyerName, setBuyerName] = React.useState('');
    const isFocused = useIsFocused();

    console.log("cart_id :", props.items.cart_id)
    console.log("isSelected :", isSelected)
    // console.log("props.items.is_completed:", props.items.is_completed)

    const selectButton = async () => {
        const response = await fetch(`${REACT_APP_API_SERVER}/goods/changeIsCompleted/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cart_id: props.items.cart_id,
                user_id: userIdInRedux
            }),
        });
        let result;
        if (response) {
            result = await response.json();
        }

        if (result.isChanged == true) {
            setIsSelected(!isSelected)
            if (result.userID != null) {
                // update buyer
                const res = await fetch(`${REACT_APP_API_SERVER}/user/getUserName/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: result.userID,
                    }),
                });
                let results: any;
                if (res) {
                    results = await res.json();
                }
                setBuyerName(results.username)
            }
            if (result.userID == null) {
                setBuyerName('')
            }


        }
        props.reloadPage()
    }

    useEffect(() => {
        try {
            const getAssigneeName = async () => {
                const response = await fetch(`${REACT_APP_API_SERVER}/user/getUserName/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: props.items.assignee_id,
                    }),
                });
                let result;
                if (response) {
                    result = await response.json();
                }
                setAssigneeName(result.username)
            }
            const getBuyerName = async () => {
                if (props.items.buyer_id == null) {
                    return
                }


                const newResponse = await fetch(`${REACT_APP_API_SERVER}/user/getUserName/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: props.items.buyer_id,
                    }),
                });

                let newResult
                if (newResponse) {
                    newResult = await newResponse.json();
                }
                if (isSelected == true) {
                    setBuyerName(newResult.username)
                }
            }
            const initBuyerName = async () => {
                if (isSelected == false) {
                    setBuyerName('')
                }
            }
            const initSelectedButton = async () => {
                // console.log("result :", result);
                // console.log("props.items========== :", props.items)
                // console.log("props.items.is_completed@@@@@@@@@@@@ :", props.items.is_completed)
                // console.log("props.items.cart_id@@@@@@@@@@@@ :", props.items.cart_id)
                // setIsSelected(props.items.is_completed)
            }
            if (isFocused) {
                getAssigneeName()
                getBuyerName()
                initBuyerName()
                initSelectedButton()
            }

        } catch (error) {
            console.log('error', error);
        }

    }, [isFocused]);

    const getLowest = () => {

        let wellcome_price
        if (props.items.wellcome_price == null || props.items.wellcome_price == "0") {
            wellcome_price = null
        } else {
            wellcome_price = parseFloat(props.items.wellcome_price)
        }
        let parknshop_price
        if (props.items.parknshop_price == null || props.items.parknshop_price == "0") {
            parknshop_price = null
        } else {
            parknshop_price = parseFloat(props.items.parknshop_price)
        }
        let jasons_price
        if (props.items.jasons_price == null || props.items.jasons_price == "0") {
            jasons_price = null
        } else {
            jasons_price = parseFloat(props.items.jasons_price)
        }
        let watsons_price
        if (props.items.watsons_price == null || props.items.watsons_price == "0") {
            watsons_price = null
        } else {
            watsons_price = parseFloat(props.items.watsons_price)
        }
        let mannings_price
        if (props.items.mannings_price == null || props.items.mannings_price == "0") {
            mannings_price = null
        } else {
            mannings_price = parseFloat(props.items.mannings_price)
        }
        let aeon_price
        if (props.items.aeon_price == null || props.items.aeon_price == "0") {
            aeon_price = null
        } else {
            aeon_price = parseFloat(props.items.aeon_price)
        }
        let dch_price
        if (props.items.dch_price == null || props.items.dch_price == "0") {
            dch_price = null
        } else {
            dch_price = parseFloat(props.items.dch_price)
        }
        let ztore_price
        if (props.items.ztore_price == null || props.items.ztore_price == "0") {
            ztore_price = null
        } else {
            ztore_price = parseFloat(props.items.ztore_price)
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

        let filtered = allPriceArray.filter(function (e) {
            return e.price != null;
        });

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
            return { "price": lowest.price, "shop": "多間同價" }
        }
        // console.log("lowest :", lowest)
        return lowest

    }
    function addZeroes(num: number) {
        return (Math.round(num * 100) / 100).toFixed(1)
    }

    const deleteItem = async () => {
        let result = await fetch(`${REACT_APP_API_SERVER}/groups/deleteItemInShoppingList/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cart_id: props.items.cart_id,
            }),
        });
        let res = await result.json()
        // console.log(res)

        props.reloadPage()

    }

    const showAlert = () => {
        if (isSelected == true) {
            Alert.alert('Someone bought already, cannot delete this item.', '', [
                {
                    text: 'OK', onPress: () => console.log("OK!")
                },
            ]);
            return
        }



        Alert.alert('Are you sure to delete', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => deleteItem() },
        ]);
    };

    const itemInfo = () => {
        navigation.navigate('GroceriesDetailsInstant' as never, { info: props.items, groupId: props.groupId } as never)

    }



    const styles = StyleSheet.create({

        itemContainer: {
            backgroundColor: "white",
            width: "100%",
            height: 150,
            borderWidth: 1,
            borderColor: "#F5F5F5",
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            // margin: 5,
            shadowOpacity: 1,
            shadowColor: "lightgray",
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1,
            },
        },
        selectButton: {
            // margin: 5,
            borderColor: isSelected ? "lightseagreen" : "",
            borderWidth: isSelected ? 10 : 0,
            width: 20,
            height: 20,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonFontSize: {
            fontSize: 25,

        },
        text: {
            fontSize: 16,
            color: "grey",
            fontWeight: "bold",
        },
        shopText: {
            fontSize: 15,
            color: "darkgrey",
            // paddingTop:"5%"
        },
        price: {
            fontSize: 15,
            // color: "black",
            width: 80,
            textAlign: 'left',
            fontWeight: "bold",
            color: "#47b4b1",
            // marginLeft:"10%"
        },
    })

    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.selectButton} onPress={selectButton}>
                <Text style={styles.buttonFontSize}><FontAwesome name='circle-o' size={20} /></Text>
            </TouchableOpacity>
            <View ><Text style={styles.shopText}>x{props.items.quantity}</Text></View>
            <TouchableOpacity onPress={() => {
                navigation.navigate('ImagePreview' as never, { image: props.items.goods_picture } as never)
            }}>
                <View><Image source={{ uri: props.items.goods_picture }}
                    style={{ width: 50, height: 50, marginRight: "2%" }} /></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 150 }} onPress={itemInfo}>
                <View><Text style={styles.text}>{props.items.name}</Text></View>
                <View><Text style={styles.shopText}>{getLowest().shop}</Text></View>
                <View><Text style={styles.shopText}>Item added by {assigneeName}</Text></View>
                <View><Text style={styles.shopText}>Bought by {buyerName}</Text></View>
            </TouchableOpacity>
            <View ><Text style={styles.price}>${addZeroes(getLowest().price! * props.items.quantity)}</Text></View>
            <TouchableOpacity onPress={showAlert}><FontAwesome name="trash-o" size={20} color={"#47b4b1"} /></TouchableOpacity>
        </View >
    )
}