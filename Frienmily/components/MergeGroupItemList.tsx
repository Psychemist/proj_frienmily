import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MergeGroupItems from './MergeGroupItems'

export default function MergeGroupItemList() {
  const navigation = useNavigation()

  const styles = StyleSheet.create({
    header: {
      height: "12%",
      alignItems: "center",
      marginBottom: "2%",
      marginRight: "2%",
      width: "100%",
      backgroundColor: "white",
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
  })

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>
        <Text style={styles.text}>Choose a Group</Text>
      </View>

      <ScrollView style={{ backgroundColor: 'white', width: "100%", marginTop: '7%' }}>
        {shoppingListArray.map((item: any, idx: number) => (
          <MergeGroupItems items={item} key={idx} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
