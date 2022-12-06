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
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const [anotherGroupShoppingItems, setAnotherGroupShoppingItems] = useState<any[]>([])
  const [productIds, setProductIds] = useState<any[]>([])


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



      let productIdsTemp: any[] = []
      for (let uniqueShopping of uniqueShoppingList) {
        productIdsTemp.push(
          uniqueShopping['goods_id']
        )
      }


      console.log(productIdsTemp);

      setProductIds(productIdsTemp)
      setAnotherGroupShoppingItems(uniqueShoppingList)

    } catch (err) {
      console.log("err", err)
    }

  }

  const addToCurrentGroup = async () => {
    console.log("################################### onPress addItemBtn")
    console.log("################################### userIdInRedux: ", userIdInRedux)
    console.log("################################### currentGroupId: ", currentGroupId)
    console.log("################################### productIds: ", productIds)
    await fetch(`${REACT_APP_API_SERVER}/goods/assignToGroupFromAnother/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userIdInRedux,
        groupId: currentGroupId,
        productIds: productIds
      }),
    });
    // showAlert()
  }





  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#FFFFFF",
   
    },
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
      marginBottom:"1%"

    },
    addItemBtn: {
      borderColor: "#47b4b1",
      borderWidth: 2,
      height: 40,
      width: 380,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginTop: "1%",
      marginbottom:"3%",
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
      paddingLeft: "2%",
      paddingRight: "2%",
      paddingBottom: "1%",
      backgroundColor: 'white',
    },
    listWrapper: {
      backgroundColor: 'white',
      width: "100%",
      marginTop: '0%',
      height: "88%",
    },
    mergeBtnText: {
      fontWeight: "300",
      color: "#606467",
      fontSize: 18,
      textAlign: "center",
    },

  })

  return (
    <SafeAreaView style={styles.page}>
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
          </View>
          <Text style={styles.mergeBtnText}> <FontAwesome name="plus" size={20} color={"#47b4b1"} />  Add All Items to Current Group</Text>
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
