import { REACT_APP_API_SERVER } from '@env'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import MergeShoppingListItem from './MergeShoppingListItem'

export default function MergeShoppingList() {
  const navigation = useNavigation()
  const route = useRoute<any>()
  const isFocused = useIsFocused();
  const [anotherGroupShoppingItems, setAnotherGroupShoppingItems] = useState([])
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);


  console.log("###################################### route.params.currentGroupId: ", route.params.currentGroupId)
  console.log("###################################### route.params.items: ", route.params.items)
  // console.log("###################################### route.params.items.group_id: ", route.params.items.group_id)
  const currentGroupId = route.params.currentGroupId
  const groupIdMergeFrom = route.params.items.group_id

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


      setAnotherGroupShoppingItems(uniqueShoppingList)

    } catch (err) {
      console.log("err", err)
    }

  }

  const addToCurrentGroup = async () => {

    await fetch(`${REACT_APP_API_SERVER}/goods/assignToGroupFromAnother/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userIdInRedux,
        groupId: currentGroupId,
        productIds: anotherGroupShoppingItems
      }),
    });
    // showAlert()
  }





  const styles = StyleSheet.create({
    header: {
      height: "7%",
      alignItems: "center",
      marginBottom: "2%",
      marginRight: "2%",
      width: "100%",
      position: "relative",
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
    addItemRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: "5%",
      backgroundColor: "#FFFFFF",

    },
    addItemBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "#47b4b1",
      borderRadius: 100,
      height: "100%",
      backgroundColor: "#FFFFFF"
    },
    listWrapper: {
      backgroundColor: 'white',
      width: "100%",
      marginTop: '0%',
      height: "88%",
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

      <View style={styles.addItemRow}>
        <TouchableOpacity style={styles.addItemBtn} onPress={addToCurrentGroup}>

          <View style={{ width: "10%", alignItems: "center" }}>
            <FontAwesome name="plus" size={20} color={"#47b4b1"} />
          </View>

          <View>
            <Text>Add Items to Current Group</Text>
          </View>

        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listWrapper}>
        {anotherGroupShoppingItems.map((item: any, idx: number) => (
          <MergeShoppingListItem items={item} key={idx} currentGroupId={currentGroupId} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
