import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
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
              { price: parseFloat(item.wellcome_price), shop: "惠康" },
              { price: parseFloat(item.parknshop_price), shop: "百佳" },
              { price: parseFloat(item.jasons_price), shop: "Jasons" },
              { price: parseFloat(item.watsons_price), shop: "屈臣氏" },
              { price: parseFloat(item.mannings_price), shop: "萬寧" },
              { price: parseFloat(item.aeon_price), shop: "AEON" },
              { price: parseFloat(item.dch_price), shop: "大昌食品" },
              { price: parseFloat(item.ztore_price), shop: "士多" }
            ]
            let filtered = allPriceArray.filter(function (e) {
              return e.price != NaN;
            });
            const lowest = filtered.reduce((previous, current) => {
              return current.price < previous.price ? current : previous;
            });
            return lowest
          }
          console.log(getLowest().price * item.quantity)
          total += getLowest().price * item.quantity
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





  const styles = StyleSheet.create({
    addMoreText: {
      fontSize: 15,
      padding: 5,
      color: '#384db7',
    },

    totalText: {
      fontSize: 15,
      textAlign: 'right',
      padding: 20,
    },

    buttonText: {
      fontSize: 20,
      fontWeight: '300',
      color: 'white',
    },

    assignGroupButton: {
      backgroundColor: '#47b4b1',
      height: 40,
      width: 360,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderRadius: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
    },
    header: {
      height: "14%",
      alignItems: "center",
      marginBottom: "10%",
      width: "100%"
    },
    text: {
      fontSize: 25,
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
      backgroundColor: "#f79f24",
    },
    circleUnfilled: {
      backgroundColor: "white",
      borderWidth: 6,
      borderStyle: "solid",
      borderColor: "#e1e0e1",
    },
    caption: {
      position: "absolute",
      fontWeight: "bold",
      color: "#939493",
      top: 21.5
    }

  });
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative", width: "100%" }}>

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
          <View style={[styles.circle, styles.circleUnfilled, { left: "45%", top: -21.5, borderColor: '#f79f24' }]}>
            <Text style={{ fontWeight: "bold", color: "#939493" }}>2</Text>
          </View>
          <View style={[styles.circle, styles.circleUnfilled, { right: 50, top: -21.5 }]}>
            <Text style={{ fontWeight: "bold", color: "#939493" }}>3</Text>
          </View>
          <Text style={[styles.caption, { left: 50 }]}>Menu</Text>
          <Text style={[styles.caption, { left: "46%" }]}>Cart</Text>
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
          <TouchableOpacity
            style={styles.addMoreText}
            onPress={() => {
              // navigation.navigate('Groceries' as never);
              navigation.navigate('HomeTab' as never);
            }}>
            <Text style={styles.addMoreText}>+ Add more items</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.totalText}>Estimated Total: HKD$ {addZeroes(estimatedTotal)}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.assignGroupButton}
          onPress={() => {
            navigation.navigate('AssignGroup' as never);
          }}>
          <Text style={styles.buttonText}>Assign Group</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

