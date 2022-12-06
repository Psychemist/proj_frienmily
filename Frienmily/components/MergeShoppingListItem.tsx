import { REACT_APP_API_SERVER } from '@env';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MONTHS_MMM } from '../utils/dates';

interface Props {
  items: any;
  currentGroupId: number,
  key: number;
}

export default function MergeShoppingListItem(props: Props) {
  const navigation = useNavigation()
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const [isShow, setIsShow] = useState(true)

  console.log(">>>>>>>>>>>>>>>>>>>>>>>> props.items: ", props.items)

  const addToCurrentGroup = async () => {
    setIsShow(false)


    // assign items to group
    await fetch(`${REACT_APP_API_SERVER}/goods/assignToGroup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userIdInRedux,
        groupId: props.currentGroupId,
        item_id: props.items.goods_id
      }),
    });
    // showAlert()

    // navigation.navigate('ShoppingList' as never, { groupId: group_id } as never)

  }


  const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: "white",
      width: "100%",
      height: 100,
      borderWidth: 1,
      borderColor: "#F5F5F5",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
      // margin: 5,
      shadowOpacity: 1,
      shadowColor: "lightgray",
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1,
      },
    },
    text: {
      fontSize: 16,
      color: "grey",
      fontWeight: "bold",
    },
    upperWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: "80%",
      width: "100%"
    },
    lowerWrapper: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      height: "20%",
      width: "100%"
    },
    dateText: {
      fontSize: 14,
      color: "#FFFFFF",
    },


  })


  return (
    <View style={styles.itemContainer}>
      <View style={styles.lowerWrapper}>
        <View style={{ width: "20%", alignItems: "center", backgroundColor: "#47b4b1" }}>
          <Text style={styles.dateText}>{props.items.day}-{MONTHS_MMM[props.items.month - 1]}-{props.items.year.slice(2)}</Text>
        </View>
      </View>

      <View style={styles.upperWrapper}>
        <View style={{ width: "20%", justifyContent: "center", alignItems: "center" }}>
          <View style={{ justifyContent: "center" }}>
            <Image source={{ uri: props.items.goods_picture }}
              style={{ width: 50, height: 50, marginRight: "2%" }} />
          </View>
        </View>
        <View style={{ width: "70%" }}>
          <View><Text style={styles.text}>{props.items.goods_name}</Text></View>
        </View>
        {isShow ?
          <TouchableOpacity style={{ width: "10%", alignItems: "center" }} onPress={addToCurrentGroup}>
            <FontAwesome name="plus" size={20} color={"#47b4b1"} />
          </TouchableOpacity>
          :
          <View style={{ width: "10%" }}></View>
        }
      </View>

    </View>
  )
}
