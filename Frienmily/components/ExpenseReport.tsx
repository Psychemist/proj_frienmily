import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ExpenseReport() {
  const navigation = useNavigation();
  const route = useRoute<any>()
  let groupName = route.params.groupName
  console.log("route:", route)


  const styles = StyleSheet.create({
    header: {
      position: 'relative',
      height: '14%',
      alignItems: 'center',
      marginBottom: 0,
      width: '100%',
    },
    backButton: {
      position: 'absolute',
      left: 0,
      paddingLeft: '20%',
      fontSize: 25,
    },
    text: {
      fontSize: 25,
    },
    groupNameWrapper: {
      position: "absolute",
      top: 120,
      padding: '1%'
    },
    categoryWrapper: {

    },
    category: {
      backgroundColor: "grey",
      padding: 10,
      margin: 10,
      height: 40
    }

  })

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative" }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={35} />
        </TouchableOpacity>

        <Text style={styles.text}>Expense Report</Text>
      </View>

      <View style={styles.groupNameWrapper}>
        <Text style={{ fontSize: 20 }}>{groupName}</Text>
      </View>

      <View style={styles.categoryWrapper}>
        <View style={styles.category}><Text>Bakery & Breakfast</Text></View>
        <View style={styles.category}><Text>Dairy Product</Text></View>
        <View style={styles.category}><Text>Snack & Dessert</Text></View>
        <View style={styles.category}><Text>Staples</Text></View>
        <View style={styles.category}><Text>Noodles</Text></View>
        <View style={styles.category}><Text>Beverage</Text></View>
        <View style={styles.category}><Text>Alcohol</Text></View>
        <View style={styles.category}><Text>Household</Text></View>
        <View style={styles.category}><Text>Personal Care</Text></View>
        <View style={styles.category}><Text>Frozen Food</Text></View>
      </View>
    </SafeAreaView>
  )
}
