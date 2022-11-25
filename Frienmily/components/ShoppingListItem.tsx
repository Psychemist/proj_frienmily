import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import React, { useEffect } from 'react';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'
import { REACT_APP_API_SERVER } from '@env';


interface ShoppingListItemProps {
    items: any;
    key: number;
}

export default function ShoppingListItem(props: ShoppingListItemProps) {
    const [isSelected, setIsSelected] = React.useState(false);
    const [assigneeName, setAssigneeName] = React.useState('');
    const isFocused = useIsFocused();


    const selectButton = async () => {
        setIsSelected(!isSelected)
        console.log(props.items.cart_id);
        // console.log(props.items)

        await fetch(`${REACT_APP_API_SERVER}/goods/changeIsCompleted/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cart_id: props.items.cart_id,
            }),
        });



    }

    useEffect(() => {
        try {
            const getIsCompleted = async () => {
                console.log(props.items.is_completed);
                setIsSelected(props.items.is_completed)
            }
            const getAssigneeName = async () => {
                console.log("props.items.assignee_id :", props.items.assignee_id);

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


            if (isFocused) {
                getIsCompleted()
                getAssigneeName()
            }

        } catch (error) {
            console.log('error', error);
        }

    }, [isFocused]);

    const getLowest = () => {
        let allPriceArray = [
            { price: parseFloat(props.items.wellcome_price), shop: "惠康" },
            { price: parseFloat(props.items.parknshop_price), shop: "百佳" },
            { price: parseFloat(props.items.jasons_price), shop: "Jasons" },
            { price: parseFloat(props.items.watsons_price), shop: "屈臣氏" },
            { price: parseFloat(props.items.mannings_price), shop: "萬寧" },
            { price: parseFloat(props.items.aeon_price), shop: "AEON" },
            { price: parseFloat(props.items.dch_price), shop: "大昌食品" },
            { price: parseFloat(props.items.ztore_price), shop: "士多" }
        ]
        let filtered = allPriceArray.filter(function (e) {
            return e.price != NaN;
        });
        const lowest = filtered.reduce((previous, current) => {
            return current.price < previous.price ? current : previous;
        });
        return lowest
    }
    function addZeroes(num: number) {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
        },
        itemContainer: {
            width: "100%",
            height: 100,
            backgroundColor: "white",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 15,
            marginTop: 5,
            marginBottom: 5,

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
    })

    const logPress = (pressType: string) => {
        console.log(pressType)
    }
    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.selectButton} onPress={selectButton}>
                <Text style={styles.buttonFontSize}><FontAwesome name='circle-o' size={20} /></Text>
            </TouchableOpacity>
            <View ><Text style={styles.text}>x{props.items.quantity}</Text></View>
            <TouchableOpacity onPress={() => navigation.navigate('Groceries' as never)}>
                {/* change navigation to product details */}
                <View><Image source={{ uri: props.items.goods_picture }}
                    style={{ width: 50, height: 50 }} /></View>
            </TouchableOpacity>
            <View style={{ width: 200 }}>
                <View><Text style={styles.text}>{props.items.name}</Text></View>
                <View><Text style={styles.text}>{getLowest().shop}</Text></View>
                <View><Text style={styles.text}>added by {assigneeName}</Text></View>
            </View>
            <View ><Text style={styles.text}>HK${addZeroes(getLowest().price * props.items.quantity)}</Text></View>
        </View>
    )
}