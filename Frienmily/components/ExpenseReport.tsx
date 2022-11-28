import { REACT_APP_API_SERVER } from '@env';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExpenseReportItem from './ExpenseReportItem';

export default function ExpenseReport() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute<any>()
  console.log("route:", route)
  let groupName = route.params.groupName
  let groupId = route.params.groupId


  // TODO: 每條紀錄都計算最高價格和最低價格

  let expenseRecord = route.params.expenseRecord
  console.log("expenseRecord get at ExpenseReport Page: ", expenseRecord)



  const date = new Date();
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();

  const [month, setMonth] = useState<number>(currentMonth)
  const [year, setYear] = useState<number>(currentYear)


  const changeMonth = () => {
    setMonth(month)
    console.log("new month: ", month)
  }

  const changeYear = () => {
    setYear(year)
    console.log("new year: ", year)
  }





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
    datePickerWrapper: {
      position: "absolute",
      top: 100,
      padding: '1%',
      width: "50%",
      flexDirection: "row",
      justifyContent: "center"
    },
    inputField: {
      boxSizing: 'border-box',
      backgroundColor: "rgba(71, 180, 177, 0.3)",
      fontSize: 16,
      shadowColor: "#47b4b1",
      borderRadius: 10,
      padding: 10,
      margin: 5
    },

    tableHeader: {
      flexDirection: "row",
      width: 360,
      height: 40,
      justifyContent: "center",
      alignItems: "center"

    },
    leftWrapper: {
      padding: 5,
      width: "60%",
    },
    rightWrapper: {
      padding: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "40%",

    },
    totalExpenseWrapper: {
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      height: 20
    },
    totalSavedMoneyWrapper: {
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      height: 20
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

      {/* <View style={styles.datePickerWrapper}>
        <TextInput autoCapitalize='none' maxLength={2} style={[styles.inputField, { width: 50 }]}
          value={month} placeholder="MM" onChangeText={() => changeMonth}
        />
        <TextInput autoCapitalize='none' maxLength={4} style={[styles.inputField, { width: 70 }]}
          value={year} placeholder="YYYY" onChangeText={() => changeYear}
        />

      </View> */}
      <View style={styles.tableHeader}>


        <View style={styles.leftWrapper}>
          <Text style={{ fontWeight: "bold" }}>Categories</Text>
        </View>


        <View style={styles.rightWrapper}>
          <View style={styles.totalExpenseWrapper}>
            {/* <Text style={{ fontWeight: "bold", color: "#47b4b1" }}>Total</Text> */}
            <Text style={{ fontWeight: "bold", color: "#47b4b1" }}>Expense</Text>
          </View>
          <View style={styles.totalSavedMoneyWrapper}>
            <Text style={{ fontWeight: "bold", color: "#f79f24" }}>Money</Text>
            <Text style={{ fontWeight: "bold", color: "#f79f24" }}>Saved</Text>
          </View>
        </View>
      </View>




      <View style={{ backgroundColor: '#F5F5F5' }}>
        {expenseRecord.map((item: any) => (
          <ExpenseReportItem items={item} key={item.categoryId} />
        ))}
      </View>



    </SafeAreaView>
  )
}
