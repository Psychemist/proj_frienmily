import React, { useEffect, useState } from "react";
import { StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Image } from "react-native";
import FriendItem from "./FriendItem";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import GroceriesCategories from "./GroceriesCategories";
import GroceriesDetailsItem from "./GroceriesDetailsItem";
import NumericInput from "react-native-numeric-input";
import { REACT_APP_API_SERVER } from '@env';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useDebounce from './useDebounce';
import SearchBarItem from './SearchBarItem';

export default function GroceriesDetails() {
    const route = useRoute<any>()
    let info = route.params.info || ''
    const navigation = useNavigation();
    const [groupName, setGroupName] = React.useState("");
    const [initNum, setInitNum] = React.useState<number>(0);
    const [shoppingCartNum, setShoppingCartNum] = React.useState<number>(0);
    function addZeroes(num: number) {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    const userIdInRedux = useSelector((state: RootState) => state.user.userId);
    const isFocused = useIsFocused();
    //---------------SEARCH BAR--------------------//
    const [searchKeyword, setSearchKeyword] = useState<string>('')
    const [isShow, setIsShow] = useState<boolean>(false)
    const [searchResult, setSearchResult] = useState([])
    const debouncedSearchKeyword = useDebounce<string>(searchKeyword, 500)
    const textChange = () => {
        // console.log("value: ", debouncedSearchKeyword)
        if (debouncedSearchKeyword && debouncedSearchKeyword.length >= 2) {
            console.log('i am now searching :', debouncedSearchKeyword)

            const loadSearchResult = async () => {
                try {
                    console.log('Seraching Result...');
                    const response = await fetch(
                        `${REACT_APP_API_SERVER}/goods/searchKeyword/`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: debouncedSearchKeyword,
                            }),
                        },
                    );

                    let json = [];
                    if (response) {
                        json = await response.json();
                    }
                    // console.log("json :", json.searchResult);
                    setSearchResult(json.searchResult);
                    setIsShow(true)

                } catch (error) {
                    console.log('error', error);
                    setIsShow(false)

                }
            };
            if (isFocused) {
                loadSearchResult();
            }
        } else {
            setIsShow(false)

        }

        // console.log(searchKeyword);

        // if (searchKeyword == '') {
        //   setIsShow(false)
        // } else {
        //   setIsShow(true)
        // }
    }
    useEffect(() => {
        textChange()
    }, [debouncedSearchKeyword])
    //---------------SEARCH BAR--------------------//


    useEffect(() => {
        try {
            const insertUserLiked = async () => {
                console.log("Insert User Liked...");
                await fetch(`${REACT_APP_API_SERVER}/goods/userLiked/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: userIdInRedux,
                        goods_id: info.id,
                        category_id: info.category_id
                    }),
                });
            };

            const getInitNum = async () => {
                const response = await fetch(`${REACT_APP_API_SERVER}/goods/getInitNum/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: userIdInRedux,
                        goods_id: info.id
                    }),
                });
                let json;
                if (response) {
                    json = await response.json();
                }
                console.log("quantity :", json.quantity);

                setInitNum(json.quantity)

            };

            const shoppingCartInitNum = async () => {
                const quantity = await fetch(`${REACT_APP_API_SERVER}/goods/getShoppingCartInitNum/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: userIdInRedux
                    }),
                });
                let json = await quantity.json()
                console.log("shoppingCart :", json.shoppingCartInit)
                if (json.shoppingCartInit == null) {
                    setShoppingCartNum(0)
                } else {
                    setShoppingCartNum(json.shoppingCartInit)
                }

            };



            if (isFocused) {
                insertUserLiked()
                getInitNum()
                shoppingCartInitNum()
            }

        } catch (error) {
            console.log('error', error);
        }

    }, [isFocused]);

    async function updateCounter(initNum: number) {
        console.log(initNum);

        await fetch(`${REACT_APP_API_SERVER}/goods/addToCart/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userIdInRedux,
                goods_id: info.id,
                quantity: initNum
            }),
        })
    }

    const addOneToCounter = () => {


        setShoppingCartNum((e) => +e + 1)
        setInitNum((e) => {
            updateCounter(+e + 1)
            return e + 1
        })

    }
    const minusOneToCounter = () => {
        if (initNum - 1 < 0) {
            return
        }
        setShoppingCartNum((e) => +e - 1)
        setInitNum((e) => {
            updateCounter(+e - 1)
            return e - 1
        })
    }

    const styles = StyleSheet.create({
        dropDown: {
            position: "absolute",
            left: "6%",
            maxHeight: "50%",
            minHeight: "50%",
            width: "88%",
            top: "15.2%",
            zIndex: 9,
            padding: 10,
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1
            }

        },
        searchBarcontainer: {
            // top: 0, 
            // right: 12,
            height: '8.5%',
            position: "relative",
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            padding: 20,
            paddingTop: 2,
            paddingBottom: 2,
            backgroundColor: "#47b4b1",
        },
        header: {
            height: "5%",
            alignItems: "center",
            width: "100%"
        },
        text: {
            fontSize: 22,
            marginRight: 20
        },
        backButton: {
            left: 5,
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
            right: 0,
            shadowOpacity: 0.3,
            shadowRadius: 1,
            shadowOffset: {
                height: 1,
                width: 1
            }
        },

        input: {
            height: 45,
            margin: 12,
            borderWidth: 2.5,
            padding: 10,
            minWidth: 300,
            maxWidth: 300,
            borderRadius: 15,
            backgroundColor: 'white',
            borderColor: "white",
            shadowOpacity: 0.2,
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1
            }
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
            width: 150,
            height: 150
        },
        nameWrapper: {
            justifyContent: "space-between",
            flexDirection: "column",
            width: "65%",
            height: 120,
            paddingLeft: 20,
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
            marginTop: "5%",
            flexDirection: "column",
            alignItems: "center",
            width: "100%"
        },
        supermarket: {
            backgroundColor: "white",
            width: "95%",
            height: "8.5%",
            borderRadius: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            margin: 5,
            shadowOpacity: 1,
            shadowColor: "lightgray",
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1,
            },
        },
        supermarketNameText: {
            fontSize: 17,
            // fontWeight:"300",
            paddingLeft: "10%",
            color: "gray"
        },
        supermarketNamePrice: {
            fontSize: 17,
            fontWeight: "500",
            marginRight: 12,
            color: "#47b4b1"
        },

        colorDot: {
            position: "absolute",
            left: 10,
            height: 7,
            width: 7,
            borderRadius: 5,
            padding: 5,
            marginLeft: 10
        },
        counter: {
            flexDirection: "row",
            marginTop: "5%",
            fontSize: 20,
            backgroundColor: "white",
            width: '70%',
            height: '37%',
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
            padding: 10,
            backgroundColor: "white",
            borderColor: 'grey',
            borderRadius: 30,
        },
        counterNumber: {
            padding: 0,
            width: '20%',
            justifyContent: 'center',
            alignItems: "center",
            borderRadius: 0,
            // borderWidth: 1,
            // borderColor: 'gray',
            backgroundColor: "white"
        },
        counterNumberFont: {
            fontSize: 20,
            fontWeight: "300"
        },
        cartNumText: {
            fontSize: 9,

        },
        shoppingCartIcon: {
            color: "white",
            shadowOpacity: 0.2,
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1
            },
            marginRight: "2%"
            // paddingRight:"1%"
        },

        minusAndPlusIcon: {
            color: "#47b4b1",
        },
    }
    );


    return (


        //---------------SEARCH BAR--------------------//
        <SafeAreaView style={{ flex: 1, backgroundColor: '#47b4b1', position: "relative" }}>
            <StatusBar barStyle="light-content" />
            {isShow ? <ScrollView style={styles.dropDown}>
                {searchResult.map((item: any, idx: number) => (
                    <SearchBarItem item={item} key={idx} />
                ))}
            </ScrollView> : (null)}
            <View style={styles.searchBarcontainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome name='angle-left' size={35} style={styles.shoppingCartIcon} />
                </TouchableOpacity>
                {/* //---------------SEARCH BAR--------------------// */}
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)} style={{ position: "relative" }}>
                        <FontAwesome name="shopping-cart" size={26} style={styles.shoppingCartIcon} />
                        <View style={styles.cartQty}>
                            <Text style={styles.cartNumText}>{shoppingCartNum}</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>

            <View style={styles.contentContainer}>
                <View style={styles.topWrapper}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ImagePreview' as never, { image: info.goods_picture } as never)
                    }}>
                        <View><Image source={{ uri: info.goods_picture }}
                            style={styles.imageWrapper} /></View>
                    </TouchableOpacity>
                    <View style={styles.nameWrapper}>
                        <View >
                            <Text style={styles.text}>{info.goods_name}</Text>
                        </View>
                        <View style={styles.counter}>
                            <TouchableOpacity style={styles.minusAndPlusBox} onPress={minusOneToCounter}>
                                <FontAwesome name="minus" size={20} style={styles.minusAndPlusIcon} />
                            </TouchableOpacity>
                            <View style={styles.counterNumber}>
                                <Text style={styles.counterNumberFont}>{initNum}</Text>
                            </View>

                            <TouchableOpacity style={styles.minusAndPlusBox} onPress={addOneToCounter}>
                                <FontAwesome name="plus" size={20} style={styles.minusAndPlusIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={styles.supermarketWrapper}>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#7dbfe9" }]}></View>
                        <Text style={styles.supermarketNameText}>惠康</Text>
                        <Text style={styles.supermarketNamePrice}>{info.wellcome_price == null ? <Text>--</Text> : <Text>${addZeroes(info.wellcome_price)}</Text>}</Text>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#fdbb1b" }]}></View>
                        <Text style={styles.supermarketNameText}>百佳</Text>
                        <Text style={styles.supermarketNamePrice}>{info.parknshop_price == null ? <Text>--</Text> : <Text>${addZeroes(info.parknshop_price)}</Text>}</Text>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#9772ef" }]}></View>
                        <Text style={styles.supermarketNameText}>Market Place by Jasons</Text>
                        <Text style={styles.supermarketNamePrice}>{info.jasons_price == null ? <Text>--</Text> : <Text>${addZeroes(info.jasons_price)}</Text>}</Text>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#fd3b02" }]}></View>
                        <Text style={styles.supermarketNameText}>屈臣氏</Text>
                        <Text style={styles.supermarketNamePrice}>{info.watsons_price == null ? <Text>--</Text> : <Text>${addZeroes(info.watsons_price)}</Text>}</Text>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#93bf03" }]}></View>
                        <Text style={styles.supermarketNameText}>萬寧</Text>
                        <Text style={styles.supermarketNamePrice}>{info.mannings_price == null ? <Text>--</Text> : <Text>${addZeroes(info.mannings_price)}</Text>}</Text>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#ff893d" }]}></View>
                        <Text style={styles.supermarketNameText}>AEON</Text>
                        <Text style={styles.supermarketNamePrice}>{info.aeon_price == null ? <Text>--</Text> : <Text>${addZeroes(info.aeon_price)}</Text>}</Text>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "#035033" }]}></View>
                        <Text style={styles.supermarketNameText}>大昌食品</Text>
                        <Text style={styles.supermarketNamePrice}>{info.dch_price == null ? <Text>--</Text> : <Text>${addZeroes(info.dch_price)}</Text>}</Text>
                    </View>
                    <View style={styles.supermarket}>
                        <View style={[styles.colorDot, { backgroundColor: "grey" }]}></View>
                        <Text style={styles.supermarketNameText}>士多</Text>
                        <Text style={styles.supermarketNamePrice}>{info.ztore_price == null ? <Text>--</Text> : <Text>${addZeroes(info.ztore_price)}</Text>}</Text>
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
