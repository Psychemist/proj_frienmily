import { iteratorSymbol } from 'immer/dist/internal'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export interface Props {
  items: any,
  key: number
}

export default function ExpenseReportSectorItem(props: Props) {


  const styles = StyleSheet.create({
    itemContainer: {
      // backgroundColor: "grey",
      width: "45%",
      margin: 5,
      flexDirection: "column",
      padding: 5,
      borderWidth: 1,
      borderColor: "#47b4b1",
      backgroundColor: "#FFFFFF"

    },
    topWrapper: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5
    },
    bottomWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end"
    },
    colorSquare: {
      height: 16,
      width: 16,
      borderRadius: 20,
      backgroundColor: props.items.pieSectorColor,
      marginRight: 5
    },

    percentText: {
      color: props.items.pieSectorColor,
      fontWeight: "bold",
      shadowOpacity: 0.2,
      shadowColor: "#47b4b1",
      shadowRadius: 1,
      shadowOffset: {
        height: 1,
        width: 1
      }
    }
  })
  return (
    <View style={styles.itemContainer}>
      <View style={styles.topWrapper}>
        <View style={styles.colorSquare}></View>
        <Text>{props.items.categoryName}</Text>
      </View>
      <View style={styles.bottomWrapper}>

        <Text style={styles.percentText}>{(props.items.percentage * 100).toFixed(2)}%</Text>

      </View>

    </View>
  )
}
