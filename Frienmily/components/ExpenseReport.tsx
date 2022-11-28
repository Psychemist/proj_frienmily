import { REACT_APP_API_SERVER } from '@env';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MONTHS, YEARS } from '../utils/dates';
import ExpenseReportItem from './ExpenseReportItem';

export default function ExpenseReport() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute<any>()
  console.log("route:", route)
  let groupId = route.params.groupId
  // let expenseRecord = route.params.expenseRecord
  // console.log("expenseRecord get at ExpenseReport Page: ", expenseRecord)

  const date = new Date();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();
  console.log({ currentMonth, currentYear })

  const [month, setMonth] = useState<number>(currentMonth)
  const [year, setYear] = useState<number>(currentYear)
  const [submit, setSubmit] = useState<boolean>(false)
  const [expenseRecords, setExpenseRecords] = useState<any>([])

  // TODO: 根據日期選擇紀錄
  const changeMonth = () => {
    setMonth(month)
    console.log("new month: ", month)
  }

  const changeYear = (index: number) => {

    let actualYear = YEARS[index]
    setYear(actualYear)
  }

  const fetchExpenseReport = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_API_SERVER}/groups/groupBuyingRecord`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            groupId: groupId,
            month: month,
            year: year
          }),
        },
      );
      console.log("response from server: " + response)
      let data = await response.json()
      console.log("Group buying record get from server: ", data)
      setExpenseRecords(data)

      // console.log('load ExpenseReports of other months');
      // const response = await fetch(
      //   `${REACT_APP_API_SERVER}/groups/groupBuyingRecord`,
      //   {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       groupId: groupId,
      //       month: month,
      //       year: year
      //     }),
      //   },
      // );
      // console.log("response from server: " + response)
      // let expenseRecord = await response.json()
      // console.log(`expense report of ${month}(month) ${year}(year): `, expenseRecord)

      // setSubmit(!submit)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchExpenseReport()
  }, [])




  // For loop the 10 categories
  for (let record of expenseRecords) {
    let categorySavedMoney: number = 0
    let categoryExpense: number = 0

    let recordResults = record.result

    if (recordResults.length == 0) {
      record["categorySavedMoney"] = 0
      record["categoryExpense"] = 0

    } else if (recordResults.length >= 1) {

      // There could be more than on record under the same category.
      for (let recordResult of recordResults) {
        const floatPrices: number[] = []
        for (let [key, value] of Object.entries(recordResult)) {
          if (key.includes("_price") && value != null && typeof value == "string") {
            floatPrices.push(parseFloat(value))
          }
        }
        // calculate the categorySavedMoney and categoryExpense
        let maxPrice = Math.max(...floatPrices)
        let minPrice = Math.min(...floatPrices)
        let moneySaved: number = parseFloat((maxPrice - minPrice).toFixed(2))
        categorySavedMoney = categorySavedMoney + moneySaved
        categoryExpense = categoryExpense + minPrice
      }
      record["categorySavedMoney"] = categorySavedMoney
      record["categoryExpense"] = categoryExpense
    }
  }

  // Get the expenseSum and moneySavedSum by adding up all 10 categories
  let expenseSum: number = 0
  let moneySavedSum: number = 0

  for (let record of expenseRecords) {
    for (let [key, value] of Object.entries(record)) {
      if (typeof value === "number") {
        if (key.includes("categoryExpense")) {
          expenseSum = expenseSum + value
        } else if (key.includes("categorySavedMoney")) {
          moneySavedSum = moneySavedSum + value
        }
      }
    }
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
      width: "90%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputField: {
      boxSizing: 'border-box',
      backgroundColor: "rgba(71, 180, 177, 0.3)",
      fontSize: 16,
      shadowColor: "#47b4b1",
      borderRadius: 10,
      padding: 10,
      margin: 5,
    },
    submitBtn: {
      boxSizing: 'border-box',
      backgroundColor: "#47b4b1",
      fontSize: 16,
      borderRadius: 10,
      padding: 10,
      margin: 5,
      width: 70,
    },

    tableHeaderFooter: {
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
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "40%",
      padding: 5,

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
    },
    amountWrapper: {
      width: "50%",
      alignItems: "stretch",
      padding: 5
    },


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



      <View style={styles.datePickerWrapper}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 20 }}>
            <Text>{month}</Text>
          </View>
          <View>
            <Text>{year}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <ModalDropdown options={MONTHS} defaultValue={"MM"} onSelect={(a) => { setMonth(Number(a + 1)) }}
            style={[styles.inputField, { width: 41 }]} dropdownTextStyle={{ fontSize: 14 }} />
          <ModalDropdown options={YEARS} defaultValue={"YYYY"} onSelect={(a) => { changeYear(Number(a)) }}
            style={[styles.inputField, { width: 56 }]} dropdownTextStyle={{ fontSize: 14 }} />
          <TouchableOpacity style={styles.submitBtn}>
            <Text style={{ color: "#FFFFFF", textAlign: "center" }} onPress={fetchExpenseReport}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.tableHeaderFooter}>


        <View style={styles.leftWrapper}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>Categories</Text>
        </View>


        <View style={styles.rightWrapper}>
          <View style={styles.totalExpenseWrapper}>
            <Text style={{ fontWeight: "bold", color: "#47b4b1", fontSize: 14 }}>Expense</Text>
          </View>
          <View style={styles.totalSavedMoneyWrapper}>
            <Text style={{ fontWeight: "bold", color: "#f79f24", fontSize: 14 }}>Money</Text>
            <Text style={{ fontWeight: "bold", color: "#f79f24", fontSize: 14 }}>Saved</Text>
          </View>
        </View>
      </View>




      <View style={{ backgroundColor: '#F5F5F5' }}>
        {expenseRecords.map((item: any) => (
          <ExpenseReportItem items={item} key={item.categoryId} />
        ))}
      </View>


      <View style={styles.tableHeaderFooter}>


        <View style={[styles.rightWrapper, { width: "52%" }]}></View>


        <View style={[styles.rightWrapper, { width: "48%" }]}>
          <View style={styles.amountWrapper}>
            <Text style={{ fontWeight: "bold", color: "#47b4b1", textAlign: "right", fontSize: 20 }}>${expenseSum}</Text>
          </View>
          <View style={styles.amountWrapper}>
            <Text style={{ fontWeight: "bold", color: "#f79f24", textAlign: "right", fontSize: 20 }}>${moneySavedSum}</Text>
          </View>
        </View>
      </View>

    </SafeAreaView>
  )
}
