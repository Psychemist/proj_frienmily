import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MONTHS_MMM } from '../utils/dates'

export interface Props {
  items: any
}

export default function PurchasedProductsItems(props: Props) {
  const navigation = useNavigation()
  const { day, month, year, goods_name, quantity, minPrice } = props.items
  console.log("################## props.items: ", props.items)
  console.log({ day, month, year, goods_name, quantity, minPrice })

  const styles = StyleSheet.create({
    productContainer: {
      backgroundColor: "white",
      width: "100%",
      height: 80,
      borderWidth: 1,
      borderColor: "#F5F5F5",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
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
  })

  return (
    <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate('GroceriesDetails' as never, { info: props.items } as never)}>
      <View style={{ alignItems: 'flex-start', padding: 2, width: "22%" }}>
        <Text>{day}-{MONTHS_MMM[month - 1]}-{year.slice(2)}</Text>
      </View>
      <View style={{ alignItems: 'flex-start', padding: 2, width: "53%", }}>
        <Text>{goods_name}</Text>
      </View>

      <View style={{ alignItems: 'flex-end', padding: 2, width: "8%" }}>
        <Text>{quantity}</Text>
      </View>
      <View style={{ alignItems: 'flex-end', padding: 2, width: "17%", }}>
        <Text>${(minPrice * quantity).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  )
}
