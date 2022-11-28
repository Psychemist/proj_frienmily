import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { categoryIcons } from "../utils/categoryIcons"

export interface Props {
  items: any;
  key: number;

}

export default function ExpenseReportItem(props: Props) {
  const categoryIcon = props.items.categoryIcon
  const categoryExpense = props.items.categoryExpense
  const categorySavedMoney = props.items.categorySavedMoney
  console.log("items received at son: ", props.items)



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
      width: "55%"
    },
    rightWrapper: {
      flexDirection: 'row',
      position: 'relative',
      alignItems: "center",
      justifyContent: "space-between",
      width: "45%",
      padding: 5
    },
    amountWrapper: {
      width: "50%",
      alignItems: "stretch",
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
            <Text style={styles.totalExpense}>${categoryExpense}</Text>
          </View>
          <View style={styles.amountWrapper}>
            <Text style={styles.totalSavedMoney}>${categorySavedMoney}</Text>
          </View>

        </View>
      </View>
    </View>
  )
}
