import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CartItem from './CartItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { REACT_APP_API_SERVER } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';



export default function Cart() {

  const isFocused = useIsFocused();
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const [shoppingListArray, setShoppingListArray] = useState([])
  const [estimatedTotal, setEstimatedTotal] = useState(0)

  const reCalculateAmount = (value: number) => {
    setEstimatedTotal((amount) => amount + value)
  }

  useEffect(() => {
    try {
      const shoppingList = async () => {
        console.log("Load shoppingList...");
        const response = await fetch(`${REACT_APP_API_SERVER}/goods/getShoppingListItems/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userIdInRedux
          }),
        });
        let json;
        if (response) {
          json = await response.json();
        }
        setShoppingListArray(json.shoppingList)
        console.log("json.shoppingList :", json.shoppingList)
        let total = 0
        for (let item of json.shoppingList) {
          const getLowest = () => {
            let allPriceArray = [
              { price: +(item.wellcome_price) || 999, shop: "惠康" },
              { price: +(item.parknshop_price) || 999, shop: "百佳" },
              { price: +(item.jasons_price) || 999, shop: "Jasons" },
              { price: +(item.watsons_price) || 999, shop: "屈臣氏" },
              { price: +(item.mannings_price) || 999, shop: "萬寧" },
              { price: +(item.aeon_price) || 999, shop: "AEON" },
              { price: +(item.dch_price) || 999, shop: "大昌食品" },
              { price: +(item.ztore_price) || 999, shop: "士多" }
            ]
            let filtered = allPriceArray.filter(function (e) {
              return e.price;
            });
            const lowest = filtered.reduce<any>((previous, current) => {
              console.log('checking', { previous, current })
              if (!Object.keys(previous).length) {
                return current
              }
              return current.price < previous.price ? current : previous;
            }, []);

            return lowest
          }
          console.log('-'.repeat(80), getLowest())
          total += Number(getLowest().price) * Number(item.quantity) || 99
        }
        setEstimatedTotal(total)
      };


      if (isFocused) {
        shoppingList()
      }

    } catch (error) {
      console.log('error', error);
    }

  }, [isFocused]);


  function addZeroes(num: number) {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const assignToGroup = () => {
    if (shoppingListArray.length == 0) {
      showAlert()
      return
    }
    navigation.navigate('AssignGroup' as never)
  }

  const showAlert = () => {
    Alert.alert('Please at least grab something to your cart', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const clearCart = async () => {
    console.log("clearCart");
    setShoppingListArray([])
    setEstimatedTotal(0)
    await fetch(`${REACT_APP_API_SERVER}/goods/clearCart/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userIdInRedux
      }),
    });
  }





  const styles = StyleSheet.create({
    addMoreText: {
      fontSize: 16,
      padding: 5,
      color: '#47b4b1',
      fontWeight: "300",
      marginRight: '7%'
    },
    clearCartText: {
      fontSize: 16,
      padding: 5,
      color: '#47b4b1',
      fontWeight: "300",
      marginLeft: '4%'
    },
    totalText: {
      fontSize: 18,
      textAlign: 'right',
      padding: 10,
      fontWeight: "bold",
      color: "gray",
      marginRight:"5%"

    },

    buttonText: {
      fontSize: 20,
      // fontWeight: '300',
      color: 'white',
    },

    assignGroupButton: {
      backgroundColor: '#47b4b1',
      height: 60,
      width: 360,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: "3%",
      borderRadius: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
      bottomTop: "20%"

    },
    header: {
      height: "14%",
      alignItems: "center",
      marginBottom: "10%",
      width: "100%",
      backgroundColor: "white"
    },
    text: {
      // padding: 20,
      borderRadius: 10,
      fontSize: 30,
      fontWeight: "bold",
      // marginLeft: 20
    },
    backButton: {
      position: 'absolute',
      left: 0,
      paddingLeft: '20%',
      fontSize: 25,
    },
    progressBar: {
      position: "absolute",
      marginTop: 130

    },
    line1: {
      height: 5,
      width: 68
    },
    line2: {
      height: 5,
      width: 132
    },
    line3: {
      height: 5,
      width: 132
    },
    line4: {
      height: 5,
      width: 68
    },
    circleWrapper: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    circle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      width: 40,
      borderRadius: 20,
      position: "absolute",

    },
    circleFilled: {
      backgroundColor: "#47b4b1",
    },
    circleUnfilled: {
      backgroundColor: "white",
      borderWidth: 6,
      borderStyle: "solid",
      borderColor: "#e1e0e1",
    },
    caption: {
      position: "absolute",
      fontWeight: "300",
      color: "gray",
      top: 21.5
    },
    clearCartContainer:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width:200,
      marginLeft: "3%",
      marginBottom:"10%"
    }

  });
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative", width: "100%", backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeTab' as never)}>
          <FontAwesome name='angle-left' size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Cart</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={[styles.line1, { backgroundColor: '#47b4b1' }]}></View>
          <View style={[styles.line2, { backgroundColor: '#47b4b1' }]}></View>
          <View style={[styles.line3, { backgroundColor: '#e1e0e1' }]}></View>
          <View style={[styles.line4, { backgroundColor: '#e1e0e1' }]}></View>
        </View>
        <View style={styles.circleWrapper}>
          <View style={[styles.circle, styles.circleFilled, { left: 50, top: -21.5 }]}>
            <Text style={{ fontWeight: "bold", color: "white" }}>1</Text>
          </View>
          <View style={[styles.circle, styles.circleUnfilled, { left: "45%", top: -21.5, borderColor: '#47b4b1' }]}>
            <Text style={{ fontWeight: "bold", color: "#939493" }}>2</Text>
          </View>
          <View style={[styles.circle, styles.circleUnfilled, { right: 52, top: -21.5 }]}>
            <Text style={{ fontWeight: "bold", color: "#939493" }}>3</Text>
          </View>
          <Text style={[styles.caption, { left: 51 }]}>Menu</Text>
          <Text style={[styles.caption, { left: "46.5%" }]}>Cart</Text>
          <Text style={[styles.caption, { right: 25 }]}>Assign Group</Text>
        </View>

      </View>

      <ScrollView style={{ backgroundColor: 'white', width: "100%" }}>
        {shoppingListArray.map((item: any, idx: number) => (
          <CartItem items={item} reCalculateAmount={reCalculateAmount} key={idx} />
        ))}
        {/* <Text>
          <CartItem />
        </Text> */}
      </ScrollView>
      <View style={{ width: "100%" }}>
        <View>
          <View style={styles.clearCartContainer}>
            <TouchableOpacity>
              <Text onPress={clearCart} style={styles.clearCartText}><FontAwesome name="trash-o" size={15} color={"#47b4b1"}/>  Clear Cart</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ alignItems: 'flex-end'}}
            onPress={() => {
              // navigation.navigate('Groceries' as never);
              navigation.navigate('HomeTab' as never);
            }}>
            <Text style={styles.addMoreText}>+ Add more items</Text>
          </TouchableOpacity>

        </View>
        <View>
          <Text style={styles.totalText}>Estimated Total: ${addZeroes(estimatedTotal)}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.assignGroupButton}
          onPress={() => {
            assignToGroup();
          }}>
          <Text style={styles.buttonText}>Assign Group</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

