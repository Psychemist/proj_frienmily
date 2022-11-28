import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { categoryIcons } from "../utils/categoryIcons"

export interface Props {
  items: any;
  key: number;
}

export default function ExpenseReportItem(props: Props) {
  const categoryIcon = props.items.categoryIcon

  const results: any[] = props.items.result
  console.log("@@@@@@@@@@@@@@@ props at ExpenseReportItem: ", results)
  let totalSavedMoney: number = 0
  let totalExpense: number = 0


  if (results.length == 0) {
    console.log("no items bought for this category")

  } else if (results.length >= 1) {
    console.log("results with length more than or equal to 1", results)
    for (let result of results) {
      const floatPrices: number[] = []
      for (let [key, value] of Object.entries(result)) {
        if (key.includes("_price") && value != null && typeof value == "string") {
          floatPrices.push(parseFloat(value))
        }
      }

      console.log("floatPrices:", floatPrices)
      let maxPrice = Math.max(...floatPrices)
      let minPrice = Math.min(...floatPrices)
      let moneysaved: number = parseFloat((maxPrice - minPrice).toFixed(2))
      console.log({ maxPrice, minPrice, moneysaved })
      totalSavedMoney = totalSavedMoney + moneysaved
      totalExpense = totalExpense + minPrice
    }
  }

  console.log(`The total amount spent for "${props.items.categoryName}" is $${totalExpense}`)
  console.log(`The total amount saved for "${props.items.categoryName}" is $${totalSavedMoney}`)





  const styles = StyleSheet.create({
    category: {
      width: 360,
      height: 50,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderTopColor: 'grey',
      borderBottomColor: 'grey',
      borderTopWidth: 0.2,
      borderBottomWidth: 0.2,
      margin: 2,
      padding: 5
    },
    catIcon: {
      height: 40,
      width: 40,
      marginRight: 10
    },
    leftWrapper: {
      flexDirection: "row",
      alignItems: "center",
      width: "60%"
    },
    rightWrapper: {
      flexDirection: 'row',
      position: 'relative',
      alignItems: "center",
      justifyContent: "space-between",
      width: "40%",
      padding: 5
    },

    totalExpense: {
      color: "#47b4b1",
      fontWeight: "bold",
      textAlign: "right"
    },
    totalSavedMoney: {
      color: "#f79f24",
      fontWeight: "bold",
      textAlign: "right"


    },
    amountWrapper: {
      width: "50%",
      alignItems: "center"
    }


  })
  return (
    <View>


      <View style={styles.category}>

        <View style={styles.leftWrapper}>
          {/* FIXME: 在require內用 string concatenation會出錯*/}
          <Image source={require(`./img/bakery.png`)} style={styles.catIcon} />
          <Text>{props.items.categoryName}</Text>
        </View>

        <View style={styles.rightWrapper}>
          <View style={styles.amountWrapper}>
            <Text style={styles.totalExpense}>${totalExpense}</Text>
          </View>
          <View style={styles.amountWrapper}>
            <Text style={styles.totalSavedMoney}>${totalSavedMoney}</Text>
          </View>

        </View>
      </View>
    </View>
  )
}
