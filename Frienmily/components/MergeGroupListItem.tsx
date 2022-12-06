import { REACT_APP_API_SERVER } from '@env';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export interface Props {
  items: any;
  currentGroupId: number,
  key: number
}


export default function MergeGroupListItem(props: Props) {
  const navigation = useNavigation()

  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ props.currentGroupId: ", props.currentGroupId)


  const goToMergingScreen = () => {
    navigation.navigate('MergeShoppingList' as never, { items: props.items, currentGroupId: props.currentGroupId } as never)
  }





  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      margin: "1%",
      width: '98%',
      height: 96,
      padding: 20,
      paddingTop: "5%",
      paddingBottom: "5%",
      backgroundColor: 'white',
      //SHADOW
      borderRadius: 20,
      shadowOpacity: 0.1,
      shadowRadius: 1,
      shadowOffset: {
        height: 4,
        width: 2,
      },
      borderBottomColor: 'grey',
      borderBottomWidth: 0.2,
    },
    miniWrapper: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#47b4b1',
      borderRadius: 20,
      zIndex: 1000,
      width: 17,
      height: 17,
      justifyContent: 'center',
      alignItems: 'center',
    },
    groupImage: {
      width: 60,
      height: 60,
      borderRadius: 50,
      borderColor: "#47b4b1",
      borderWidth: 3,
      postion: "absolute",
    },
    groupName: {
      fontSize: 20,
      paddingRight: "10%",
      fontWeight: "300",
      color: "gray",
    },


  })

  return (
    <TouchableOpacity style={styles.container} onPress={goToMergingScreen}>

      <View style={styles.miniWrapper}>
        <View style={{ position: 'relative' }}>
          {props.items.is_family_group == true ?
            <View style={styles.iconContainer}><FontAwesome name="home" size={12} color={"white"} /></View>
            :
            null}
          <Image style={styles.groupImage} source={{ uri: props.items.profile_picture }} ></Image>
        </View>

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.groupName}>{props.items.group_name}</Text>
        </View>
      </View>

      <View style={styles.miniWrapper}>
        <Text style={{ color: "#47b4b1", marginRight: 10, fontSize: 17 }}>Merge</Text>
        <FontAwesome name="angle-right" size={30} color={"#47b4b1"} />
      </View>

    </TouchableOpacity>
  )
}
