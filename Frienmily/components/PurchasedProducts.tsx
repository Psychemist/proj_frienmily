import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PurchasedProductsItems from './PurchasedProductsItems'

export default function PurchasedProducts() {
  const navigation = useNavigation()
  const route = useRoute<any>()
  console.log("route.params:", route.params)
  const categoryName = route.params.categoryPurchasedDetails.categoryName
  const categoryExpense = route.params.categoryPurchasedDetails.categoryExpense
  const purchasedProducts = route.params.categoryPurchasedDetails.result
  console.log("purchasedProducts: ", purchasedProducts)


  const styles = StyleSheet.create({
    header: {
      position: 'relative',
      height: '5%',
      alignItems: 'center',
      marginBottom: 10,
      width: '100%',

    },
    backButton: {
      position: 'absolute',
      left: 0,
      paddingLeft: '20%',
      fontSize: 25,
    },
    text: {
      borderRadius: 10,
      fontSize: 30,
      fontWeight: "bold",
    },
    tableHeader: {
      flexDirection: "row",
      width: "92%",
      justifyContent: "space-between",
      padding: 10
    },
    tableHeaderText: {
      fontWeight: "bold",
      fontSize: 14,
      color: "#47b4b1"
    },
    tableContainer: {
      width: "92%"
    },
    tableFooter: {
      height: "8%",
      width: "92%",
      alignItems: "flex-end",
      marginTop: 10,
      padding: 5
    },
  })

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative", backgroundColor: 'white' }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>
        <Text style={styles.text}>{categoryName}</Text>
      </View>
      <View style={{ alignItems: 'center', position: "relative", width: "100%", height: "87%" }}>
        <View style={styles.tableHeader}>
          <View style={{ alignItems: 'flex-start', padding: 2, height: 25, width: "22%" }}><Text style={styles.tableHeaderText}>Date</Text></View>
          <View style={{ alignItems: 'flex-start', padding: 2, height: 25, width: "53%" }}><Text style={styles.tableHeaderText}>Purchased Items</Text></View>
          <View style={{ alignItems: 'flex-end', padding: 2, height: 25, width: "8%" }}><Text style={styles.tableHeaderText}>Qty</Text></View>
          <View style={{ alignItems: 'flex-end', padding: 2, height: 25, width: "17%" }}><Text style={styles.tableHeaderText}>Price</Text></View>
        </View>
        <ScrollView style={styles.tableContainer}>
          {purchasedProducts.map((item: any) => (
            <PurchasedProductsItems items={item} key={item.goods_id} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.tableFooter}>
        <Text style={{
          color: "#47b4b1",
          fontWeight: "bold",
          textAlign: "right",
          fontSize: 18
        }}>
          Expensed: ${categoryExpense}</Text>
      </View>
    </SafeAreaView>
  )
}
