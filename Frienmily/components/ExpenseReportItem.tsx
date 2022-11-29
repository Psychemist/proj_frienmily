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


  const styles = StyleSheet.create({
    category: {
      backgroundColor: "white",
      width: "98%",
      height: 55,
      borderWidth: 1,
      borderColor: "#F5F5F5",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      margin: 1,
      marginLeft: "1%",
      shadowOpacity: 1,
      shadowColor: "lightgray",
      shadowRadius: 2,
      shadowOffset: {
          height: 1,
          width: 1,
      },
      
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
          <Image source={{ uri: props.items.categoryIcon }} style={styles.catIcon} />
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
