import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'
import { REACT_APP_API_SERVER } from '@env';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface CartItemProps {
    items: any;
    key: number;
    reCalculateAmount: (amount: number) => void
}

export default function CartItem(props: CartItemProps) {
    const [initNum, setInitNum] = React.useState<number>(props.items.quantity);
    const userIdInRedux = useSelector((state: RootState) => state.user.userId);
    const [isShow, setIsShow] = React.useState<boolean>(true);


    async function updateCounter(initNum: number) {
        console.log(initNum);

        await fetch(`${REACT_APP_API_SERVER}/goods/addToCart/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userIdInRedux,
                goods_id: props.items.goods_id,
                quantity: initNum
            }),
        })
    }


    const addOneToCounter = () => {
        props.reCalculateAmount(getLowest().price)
        setInitNum((e) => {
            updateCounter(+e + 1)
            return e + 1
        })

    }
    const minusOneToCounter = () => {
        props.reCalculateAmount(0 - (getLowest().price))
        if (initNum - 1 < 0) {

            return
        }
        if (initNum - 1 == 0) {
            setIsShow(false)
        }
        setInitNum((e) => {
            updateCounter(+e - 1)
            return e - 1
        })
    }
    function addZeroes(num: number) {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

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
    console.log(getLowest())


    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
            color: "#384db7"
        },
        shopText: {
            fontSize: 15,
            color: "grey"
        },
        price: {
            fontSize: 13,
            color: "black",
            width: 70,
            textAlign: 'right'
        },
        container: {
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            padding: 10,
            paddingTop: 15,
            paddingBottom: 15,

        },
        counter: {
            flexDirection: "row",
        },
        minusAndPlusBox: {
            padding: 10,
            borderRadius: 0,
            borderWidth: 1,
            borderColor: 'grey',
        },
        counterNumber: {
            padding: 0,
            fontSize: 15,
            width: 30,
            justifyContent: 'center',
            alignItems: "center",
            borderRadius: 0,
            borderWidth: 1,
            borderColor: 'grey',
        }
    })

    const navigation = useNavigation()

    return (
        <View>
            {isShow ?
                (<View style={styles.container}>
                    <View style={styles.counter}>
                        <TouchableOpacity style={styles.minusAndPlusBox} onPress={minusOneToCounter}>
                            <FontAwesome name="minus" size={10} />
                        </TouchableOpacity>
                        <View style={styles.counterNumber}>
                            <Text>{initNum}</Text>
                        </View>

                        <TouchableOpacity style={styles.minusAndPlusBox} onPress={addOneToCounter}>
                            <FontAwesome name="plus" size={10} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Groceries' as never)}>
                        {/* change navigation to product details */}
                        <View><Image source={{ uri: props.items.goods_picture }}
                            style={{ width: 50, height: 50 }} /></View>
                    </TouchableOpacity>
                    <View style={{ width: 150 }}>
                        <View><Text style={styles.text}>{props.items.name}</Text></View>
                        <View><Text style={styles.shopText}>{getLowest().shop}</Text></View>
                    </View>
                    <View><Text style={styles.price}>HK${addZeroes(getLowest().price * initNum)}</Text></View>
                </View>) :
                (null)}

        </View>

    )
}