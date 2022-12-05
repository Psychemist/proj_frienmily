import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MergeShoppingListItem from './MergeShoppingListItem'

export default function MergeShoppingList() {
  const navigation = useNavigation()
  const route = useRoute<any>()
  let shoppingListItems = route.params.products
  console.log("###################################### shoppingListItems: ", shoppingListItems)



  const styles = StyleSheet.create({
    header: {
      height: "7%",
      alignItems: "center",
      marginBottom: "2%",
      marginRight: "2%",
      width: "100%",
      position: "relative"
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
    listWrapper: {
      backgroundColor: 'white',
      width: "100%",
      marginTop: '0%',
      height: "93%",
    },
  })

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>
        <Text style={styles.text}>Choose items to add...</Text>
      </View>

      <ScrollView style={styles.listWrapper}>
        {shoppingListItems.map((item: any, idx: number) => (
          <MergeShoppingListItem items={item} key={idx} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
