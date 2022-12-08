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

        interface IPrice {
            price: number | null
            shop: string
        }
        const iPrices: IPrice = { price: 1.7976931348623157e+308, shop: "Dummy Max" }

        let filtered = allPriceArray.filter(function (e) {
            return e.price != null;
        });
        // console.log("filtered :", filtered)
        const lowest = filtered.reduce((previous: IPrice, current: IPrice) => {
            return current.price! < previous.price! ? current : previous;
        }, iPrices);
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

    const itemInfo = () => {
        navigation.navigate('GroceriesDetails' as never, { info: props.items } as never)

    }

    const addOneToCounter = () => {
        console.log("getLowest :", getLowest().price!)
        props.reCalculateAmount(getLowest().price!)
        setInitNum((e) => {
            updateCounter(+e + 1)
            return e + 1
        })

    }
    const minusOneToCounter = () => {
        console.log("getLowest :", getLowest().price!)

        props.reCalculateAmount(0 - (getLowest().price!))
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

    const deleteThisItem = () => {
        console.log("deleteThisItem");

        console.log("getLowest :", getLowest().price!)
        console.log("initNum :", initNum);
        console.log("getLowest().price!*initNum :", getLowest().price! * initNum);



        props.reCalculateAmount(0 - (getLowest().price! * initNum))
        if (initNum - 1 < 0) {

            return
        }
        // if (initNum - 1 == 0) {
        setIsShow(false)
        // }
        setInitNum(() => {
            updateCounter(0)
            return 0
        })
    }

    function addZeroes(num: number) {
        return (Math.round(num * 100) / 100).toFixed(2)
    }


    // console.log(getLowest())


    const styles = StyleSheet.create({
        text: {
            fontSize: 15,
            color: "grey",
            fontWeight: "bold",
        },
        shopText: {
            fontSize: 14,
            color: "darkgrey",
            paddingTop: "5%"
        },
        price: {
            fontSize: 15,
            // color: "black",
            width: 80,
            textAlign: 'left',
            fontWeight: "bold",
            color: "#47b4b1",
            marginLeft: "10%"

        },
        container: {
            marginTop: "2%",
            // marginLeft: "1%",
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
            // paddingRight: "3%"
        },
        counter: {
            flexDirection: "row",
            marginRight: "5%",
            padding: 5,
            fontSize: 20,
            backgroundColor: "white",
            width: '18%',
            height: 30,
            borderWidth: 0.4,
            borderColor: "lightgray",
            borderRadius: 30,
            justifyContent: 'space-around',
            alignItems: 'center',
            shadowOpacity: 1,
            shadowColor: "#47b4b1",
            shadowRadius: 2,
            shadowOffset: {
                height: 4,
                width: 4,
            },
        },
        minusAndPlusBox: {
            paddingLeft: 2,
            paddingRight: 2,
            backgroundColor: "white",
            borderColor: 'grey',
            borderRadius: 30,
        },
        counterNumber: {
            padding: 0,
            width: '31%',
            justifyContent: 'center',
            alignItems: "center",
            borderRadius: 0,
            // borderWidth: 1,
            // borderColor: 'gray',
            backgroundColor: "white"
        },
        minusAndPlusIcon: {
            color: "#47b4b1",
        },
        counterNumberFont: {
            fontSize: 15,
            fontWeight: "300"
        },
        binWrapper: {
            flexDirection: "row",
            justifyContent: 'space-around',
            alignContent: "center",
            alignItems: "center",
            height: 40,
            width: 80,
            paddingRight: "1%"
        }
    })

    const navigation = useNavigation()

    return (
        <View>
            {isShow ?
                (<View style={styles.container}>
                    <View style={styles.counter}>
                        <TouchableOpacity style={styles.minusAndPlusBox} onPress={minusOneToCounter}>
                            <FontAwesome name="minus" size={18} style={styles.minusAndPlusIcon} />
                        </TouchableOpacity>
                        <View style={styles.counterNumber}>
                            <Text style={styles.counterNumberFont}>{initNum}</Text>
                        </View>

                        <TouchableOpacity style={styles.minusAndPlusBox} onPress={addOneToCounter}>
                            <FontAwesome name="plus" size={18} style={styles.minusAndPlusIcon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('ImagePreview' as never, { image: props.items.goods_picture } as never)
                        }}>
                            <View><Image source={{ uri: props.items.goods_picture }}
                                style={{ width: 50, height: 50, marginRight: "3%" }} /></View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: "39%", paddingRight: "3%" }} onPress={itemInfo}>
                        <View><Text style={styles.text}>{props.items.name}</Text></View>
                        <View><Text style={styles.shopText}>{getLowest().shop}</Text></View>
                    </TouchableOpacity>
                    <View style={styles.binWrapper}><Text style={styles.price}>${addZeroes(getLowest().price! * initNum)}</Text>
                        <TouchableOpacity onPress={deleteThisItem}><FontAwesome name="trash-o" size={20} color={"#47b4b1"} /></TouchableOpacity>
                    </View>

                </View>) :
                (null)}

        </View>

    )
}