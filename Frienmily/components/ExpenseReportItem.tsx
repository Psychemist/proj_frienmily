import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { categoryIcons } from "../utils/categoryIcons"

export interface Props {
  items: any;
  key: number;
}

export default function ExpenseReportItem(props: Props) {

  console.log("props at ExpenseReportItem: ", props.items)
  const categoryIcon = props.items.categoryIcon

  // TODO: 每條紀錄都計算最高價格和最低價格
  // see if the key matches "_price"
  let priceObj = {
    "aeon_price": "4.5",
    "dch_price": "6.9",
    "jasons_price": "8",
    "parknshop_price": "7.8",
    "wellcome_price": "9",
    "mannings_price": null,
    "watsons_price": null,
    "ztore_price": null,
    "report_lower_price": null
  }

  const floatPrices = []
  const stringPrices: Array<string | null> = Object.values(priceObj);


  for (let stringPrice of stringPrices) {
    if (stringPrice != null) {
      floatPrices.push(parseFloat(stringPrice))
    }
  }
  console.log("floatPrices: ", floatPrices)











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

  })
  return (
    <View>
      <View style={styles.category}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={require(`./img/bakery.png`)} style={styles.catIcon} />
          <Text>{props.items.categoryName}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>$100</Text>
          <Text>$20</Text>

        </View>
      </View>
    </View>
  )
}
