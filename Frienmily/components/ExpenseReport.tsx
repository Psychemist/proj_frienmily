import { REACT_APP_API_SERVER } from '@env';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MONTHS, YEARS, MONTHS_MMM } from '../utils/dates';
import ExpenseReportItem from './ExpenseReportItem';
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { logout } from '../redux/user/userSlice';
import ExpenseReportSectorItem from './ExpenseReportSectorItem';
import { pieSectorColors } from '../utils/color'

export default function ExpenseReport() {
  const navigation = useNavigation();
  const route = useRoute<any>()
  console.log("route:", route)
  let groupId = route.params.groupId

  const date = new Date();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();
  console.log({ currentMonth, currentYear })

  const [month, setMonth] = useState<number>(currentMonth)
  const [year, setYear] = useState<number>(currentYear)
  const [displayedMonth, setDisplayedMonth] = useState<string>(MONTHS_MMM[month - 1])
  const [displayedYear, setDisplayedYear] = useState<number>(year)
  const [expenseRecords, setExpenseRecords] = useState<any>([])
  const [isChartView, setIsChartView] = useState<boolean>(false)
  const [onClickSubmit, setOnClickSubmit] = useState<boolean>(false)



  const changeYear = (index: number) => {
    let actualYear = YEARS[index]
    setYear(actualYear)
  }

  useEffect(() => {
    async function fetch() {
      setDisplayedMonth(MONTHS_MMM[month - 1])
      setDisplayedYear(year)
      await fetchExpenseReport()
      setDisplayedMonth(MONTHS_MMM[month - 1])
      setDisplayedYear(year)
    }
    fetch()
  }, [onClickSubmit])

  const setToThisMonth = async () => {
    setOnClickSubmit(!onClickSubmit)
    setMonth(currentMonth)
    setYear(currentYear)
  }

  const getExpenseReport = async () => {
    try {
      await fetchExpenseReport()
      setDisplayedMonth(MONTHS_MMM[month - 1])
      setDisplayedYear(year)

    } catch (err) {
      console.log(err)
    }
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

    } catch (err) {
      console.log(err)
    }

  }

  // TODO: 比較超越了多少個家庭group
  // 每個family的money saved
  // family group 的數量
  const fetchAvgFamiliesMoneySaved = async () => {
    try {
      //   const response = await fetch(
      //     `${REACT_APP_API_SERVER}/groups/`,
      //     {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify({
      //         groupId: groupId,
      //         month: month,
      //         year: year
      //       }),
      //     },
      //   );
      //   console.log("response from server: " + response)
      //   let data = await response.json()
      //   console.log("Group buying record get from server: ", data)
      //   setExpenseRecords(data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getExpenseReport()
  }, [])




  // For loop the 10 categories
  let i = 0
  for (let record of expenseRecords) {
    let categorySavedMoney: number = 0
    let categoryExpense: number = 0

    let recordResults = record.result


    record["pieSectorColor"] = pieSectorColors[i]
    i = i + 1
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
        categorySavedMoney = parseFloat((categorySavedMoney + moneySaved).toFixed(2))
        categoryExpense = categoryExpense + minPrice * recordResult.quantity
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



  console.log("############ original data - expenseRecords: ", expenseRecords)
  const coloredCategoryExpenseArray: any[] = []


  const data = expenseRecords.map((item: any) => {
    let categoryExpense = item.categoryExpense
    let pieSectorColor = item.pieSectorColor
    let categoryId = item.categoryId
    let categoryName = item.categoryName
    let percentage = item.categoryExpense / expenseSum || 0
    coloredCategoryExpenseArray.push({ categoryExpense, pieSectorColor, categoryId, categoryName, percentage })
  })
  console.log("@@@@@@@@@@@@@@ coloredCategoryExpenseArray:", coloredCategoryExpenseArray)

  const pieData = coloredCategoryExpenseArray
    .filter((element) => element.categoryExpense > 0)
    .map((value, index) => ({
      value: value.categoryExpense,
      svg: {
        fill: value.pieSectorColor,
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }))
  console.log("pieData: ", pieData)







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
      borderRadius: 10,
      fontSize: 30,
      fontWeight: "bold",
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
    dropdownText: {
      fontSize: 14,
      width: 60,
      height: 40,
      textAlign: "center"
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
    switchBtnWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "90%"

    },
    switchBtn: {
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      borderWidth: 2,
      shadowColor: "gray",
      borderRadius: 10,
      shadowOpacity:0.2,
      shadowOffset: {
        height: 2,
        width: 2,
      },
  
    },
    listViewBtn: {
      borderColor: isChartView ? "white" : "#47b4b1",
      borderWidth:1,

      shadowColor: "#47b4b1",
      shadowRadius: 2,
      shadowOffset: {
        height: 2,
        width: 2,
      },


    },
    chartViewBtn: {
      borderColor: isChartView ? "#47b4b1" : "white",
      borderWidth:1,
      shadowColor: "#47b4b1",
      shadowRadius: 2,
      shadowOffset: {
        height: 2,
        width: 2,
      },


    },
    dateDisplayer: {
      justifyContent: "center",
      alignItems: "center",
    },
    chartViewContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    pieChart: {
      height: 250,
      width: 250,
      marginTop: 20,
      marginBottom: 20,

    },
    sectorItemWrapper: {
      width: "98%",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    tableHeaderFooter: {
      flexDirection: "row",
      width: "97%",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "3%"
      

    },
    leftWrapper: {
      padding: 5,
      width: "60%",
      marginleft:"5%"
    },
    rightWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "40%",
      padding: 5,
      marginRight: 10

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
      // alignItems: "stretch",
      padding: 5,
      // marginRight:"1%"
    },


  })

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative", backgroundColor: 'white' }}>
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
          <ModalDropdown options={MONTHS_MMM} defaultValue={"MMM"} onSelect={(a) => { setMonth(Number(a + 1)) }}
            style={[styles.inputField, { width: 55 }]} dropdownTextStyle={styles.dropdownText} />
          <ModalDropdown options={YEARS} defaultValue={"YYYY"} onSelect={(a) => { changeYear(Number(a)) }}
            style={[styles.inputField, { width: 56 }]} dropdownTextStyle={styles.dropdownText} />
          <TouchableOpacity style={styles.submitBtn}>
            <Text style={{ color: "#FFFFFF", textAlign: "center" }} onPress={getExpenseReport}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.submitBtn, { width: 93 }]} onPress={setToThisMonth}>
            <Text style={{ color: "#FFFFFF", textAlign: "center" }}>This Month</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.switchBtnWrapper}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={[styles.switchBtn, styles.listViewBtn]} onPress={() => { setIsChartView(false) }}>
            <Text>List View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.switchBtn, styles.chartViewBtn]} onPress={() => { setIsChartView(true) }}>
            <Text>Chart View</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateDisplayer}>
          <Text style={{ fontSize: 30, color:"gray", fontWeight:"300"}}>{displayedMonth} {displayedYear}</Text>
        </View>


      </View>


      {isChartView ?
        <View style={styles.chartViewContainer}>
          <PieChart style={styles.pieChart} data={pieData} />
          {/* <Text>You have bested { } of families in saving money!</Text> */}
          <View style={styles.sectorItemWrapper}>
            {coloredCategoryExpenseArray.map((item: any) => (
              <ExpenseReportSectorItem items={item} key={item.categoryId} />
            ))}
          </View>
        </View>
        :
        <View>
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
        </View>
      }


    </SafeAreaView>
  )
}
