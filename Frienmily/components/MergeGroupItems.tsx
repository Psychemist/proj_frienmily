import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

interface Props {
  items: any;
  key: number;
}

export default function MergeGroupItems(props: Props) {
  const navigation = useNavigation()

  const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: "white",
      width: "100%",
      height: 150,
      borderWidth: 1,
      borderColor: "#F5F5F5",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      // margin: 5,
      shadowOpacity: 1,
      shadowColor: "lightgray",
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1,
      },
    },

    buttonFontSize: {
      fontSize: 25,

    },
    text: {
      fontSize: 16,
      color: "grey",
      fontWeight: "bold",
    },
    shopText: {
      fontSize: 15,
      color: "darkgrey",
    },
  })


  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.shopText}>x{props.items.quantity}</Text>
      </View>
      <TouchableOpacity>
        <View><Image source={{ uri: props.items.goods_picture }}
          style={{ width: 50, height: 50, marginRight: "2%" }} /></View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: 150 }}>
        <View><Text style={styles.text}>{props.items.name}</Text></View>
        {/* <View><Text style={styles.shopText}>{getLowest().shop}</Text></View> */}
      </TouchableOpacity>
      {/* <View ><Text style={styles.price}>${addZeroes(getLowest().price! * props.items.quantity)}</Text></View> */}
      <TouchableOpacity>
        <FontAwesome name="trash-o" size={20} color={"#47b4b1"} />
      </TouchableOpacity>
    </View >
  )
}
