import { REACT_APP_API_SERVER } from '@env'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MergeShoppingListItem from './MergeShoppingListItem'

export default function MergeShoppingList() {
  const navigation = useNavigation()
  const route = useRoute<any>()
  const isFocused = useIsFocused();
  const [anotherGroupShoppingItems, setAnotherGroupShoppingItems] = useState([])

  console.log("###################################### route.params: ", route.params)
  console.log("###################################### route.params.items: ", route.params.items)
  // console.log("###################################### route.params.items.group_id: ", route.params.items.group_id)
  const groupIdMergeFrom = route.params.items.group_id
  const currentGroupId = route.params.currentGroupId

  console.log("currentGroupId: ", currentGroupId)
  console.log("groupIdMergeFrom: ", groupIdMergeFrom)

  useEffect(() => {
    const goToMergingScreen = async () => {
      await getAnotherGroupShoppingList()
    }
    if (isFocused && groupIdMergeFrom) {
      goToMergingScreen()
    }
  }, [isFocused])


  const getAnotherGroupShoppingList = async () => {
    try {
      console.log("Group Id to merge from = ", groupIdMergeFrom)
      const response = await fetch(`${REACT_APP_API_SERVER}/groups/anotherGroupShoppingList/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId: groupIdMergeFrom,
        }),
      });
      let result;
      if (response) {
        result = await response.json();
      }

      const uniqueShoppingList = result.filter((thing: any, index: any, self: any) =>
        index === self.findIndex((t: any) => (
          JSON.stringify(t) === JSON.stringify(thing)
        ))
      )
      console.log(result)
      console.log(uniqueShoppingList);

      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ unique Shopping List Items:", uniqueShoppingList)

      setAnotherGroupShoppingItems(uniqueShoppingList)

    } catch (err) {
      console.log("err", err)
    }

  }

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
        {anotherGroupShoppingItems.map((item: any, idx: number) => (
          <MergeShoppingListItem items={item} key={idx} currentGroupId={currentGroupId} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
