import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  FlatList,
  Button,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import FriendItem from './FriendItem';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GroceriesCategories from './GroceriesCategories';
import GroceriesRandomItems from './GroceriesRandomItems';
import GroceriesTopItems from './GroceriesTopItems';
import { REACT_APP_API_SERVER } from '@env';
import { useQuery } from "react-query";
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


import useDebounce from './useDebounce';
import SearchBarItem from './SearchBarItem';

export default function Groceries() {
  const navigation = useNavigation();
  const [isBestSeller, setIsBestSeller] = useState(true)
  const [allExploreData, setAllExploreData]: any = useState([]);
  const [allTop5Data, setAllTop5Data]: any = useState([]);
  const [groupName, setGroupName] = React.useState('');
  const [page, setPage] = useState(1)
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const [shoppingCartNum, setShoppingCartNum] = React.useState<number>(0);

  const isFocused = useIsFocused();
  useEffect(() => {
    try {
      const shoppingCartInitNum = async () => {
        const quantity = await fetch(`${REACT_APP_API_SERVER}/goods/getShoppingCartInitNum/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userIdInRedux
          }),
        });
        let json = await quantity.json()
        console.log("shoppingCart :", json.shoppingCartInit)
        if (json.shoppingCartInit == null) {
          setShoppingCartNum(0)
        } else {
          setShoppingCartNum(json.shoppingCartInit)
        }

      };



      if (isFocused) {
        shoppingCartInitNum()
      }

    } catch (error) {
      console.log('error', error);
    }

  }, [isFocused]);

  //---------------SEARCH BAR--------------------//
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState([])
  const debouncedSearchKeyword = useDebounce<string>(searchKeyword, 500)
  const textChange = ()=> {
    // console.log("value: ", debouncedSearchKeyword)
    if (debouncedSearchKeyword && debouncedSearchKeyword.length >= 2) {
      console.log('i am now searching :', debouncedSearchKeyword)

      const loadSearchResult = async () => {
        try {
          console.log('Seraching Result...');
          const response = await fetch(
            `${REACT_APP_API_SERVER}/goods/searchKeyword/`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: debouncedSearchKeyword,
              }),
            },
          );

          let json = [];
          if (response) {
            json = await response.json();
          }
          // console.log("json :", json.searchResult);
          setSearchResult(json.searchResult);
          setIsShow(true)

        } catch (error) {
          console.log('error', error);
          setIsShow(false)

        }
      };
      if (isFocused) {
        loadSearchResult();
      }
    } else {
      setIsShow(false)

    }

    // console.log(searchKeyword);
    
    // if (searchKeyword == '') {
    //   setIsShow(false)
    // } else {
    //   setIsShow(true)
    // }
  }
  useEffect(()=>{
    textChange()
  },[debouncedSearchKeyword])
  //---------------SEARCH BAR--------------------//


  const bestSellerButton = () => {
    if (isBestSeller == false) {
      setIsBestSeller(!isBestSeller)
    }
  };

  const exploreButton = () => {
    if (isBestSeller != false) {
      setIsBestSeller(!isBestSeller)
    }
  };

  const fetchData = async (array: any) => {
    try {
      console.log(`fetch data from [${array}]`);

      const response = await fetch(
        `${REACT_APP_API_SERVER}/goods/productByBatchAndCatId/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            qtyInOneBatch: 30,
            ItemsToBeSkipped: 0,
            catIds: array
          }),
        },
      );
      let json;
      if (response) {
        json = await response.json();
      }
      setAllExploreData(json.result.exploreResults)
      setAllTop5Data(json.result.top5Results)

    } catch (error) {
      console.log('error', error);
    }
  }
  // console.log("exploreResults :", allExploreData);
  // console.log("top5Results :", allTop5Data);

  // TODO: Infinite Scroll Pagination

  const renderEmpty = () => (
    <View>
      <Text>No Data at the Moment</Text>
      <TouchableOpacity onPress={() => requestAPI()}>
        <Text>Refresh</Text>
      </TouchableOpacity>
    </View>
  )
  const renderFooter = () => (
    <View>
      {allExploreData.moreLoading && <ActivityIndicator />}
      {allExploreData.isListEnd && <Text>No more products at the moment</Text>}
    </View>
  )

  const onChangePage = () => {
    setPage(page + 1)
  }
  const fetchMoreDataOnPageEnd = () => {
    console.log("touched the end of the page")
    if (!allExploreData.isListEnd && !allExploreData.moreLoading) {
      onChangePage()
    }
  }

  const requestAPI = async () => {
    try {
      let response = await fetch(`${REACT_APP_API_SERVER}/goods/productByBatchAndCatId`)

      console.log("requestAPI response: ", response)

    } catch (e) {
      console.log("error: ", e)

    }
  }

  const renderItem = ({ item }) => (
    <GroceriesRandomItems item={item} />
  )


  useEffect(() => {
    requestAPI()
    console.log("The current page number: ", page)
  }, [page])
  // =================================================================



  // const fetchGoodsList = async () => {
  //   const response = await fetch(`${REACT_APP_API_SERVER}/goods/categories`);
  //   // console.log("response :", response);

  //   return response.json();
  // };

  // const { data: fetchGoodListData, status: fetchGoodListStatus } = useQuery("users", fetchGoodsList);


  const styles = StyleSheet.create({
    dropDown: {
      position: "absolute",
      left: "6%",
      maxHeight: "50%",
      minHeight:"50%",
      width: "88%",
      top: "16%",
      zIndex:9,
      padding: 10,
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      shadowOpacity: 0.1,
      shadowRadius: 2,
      shadowOffset: {
          height: 1,
          width: 1
      }

    },
    text: {
      fontSize: 25,
      fontWeight: 'bold',
      paddingLeft: 20,
    },
    cartNumText: {
      fontSize:9,
   
    },
    cartQty: {
      justifyContent: "center",
      alignItems: "center",
      height: 20,
      width: 20,
      borderRadius: 100,
      backgroundColor: "#f79f24",
      position: "absolute",
      top: -10,
      right: -10
    },
    container: {
      position:"relative",
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      padding: 20,
      paddingTop: 2,
      paddingBottom: 2,
      backgroundColor: '#47b4b1',
      //SHADOW
      // shadowOpacity: 0.1,
      // shadowRadius: 2,
      // shadowOffset: {
      //     height: 1,
      //     width: 1
      // }
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 2.5,
      padding: 10,
      minWidth: 300,
      maxWidth: 300,
      borderRadius: 15,
      backgroundColor: 'white',
      borderColor:"white",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: {
          height: 1,
          width: 1
      }

    },
    searchButton: {
      margin: 5,
      fontSize: 20,
      backgroundColor: 'white',
      width: 120,
      height: 45,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },

    catergoriesContainer: {
      // justifyContent: 'space-between',
      // alignItems: 'center',
      // flexDirection: 'row',
      // width: '100%',
      // paddingBottom: 5,
      backgroundColor: 'white',
    },

    randomItemsContainer: {
      display: 'flex',

      justifyContent: 'space-around',
      alignItems: 'flex-start',
      flexDirection: 'column',
      width: '100%',
      // padding: 5,
    },

    topItemsCards: {
      display: 'flex',
      // justifyContent: "space-around",
      // alignItems: "flex-start",
      flexDirection: "row",
      width: "100%",
      // padding: 5,

    },
    bestSellerButton: {
      // margin: 5,
      // fontSize: 50,
      backgroundColor: 'white',
      width: '40%',
      height: 35,
      shadowOpacity:1,
      shadowColor: isBestSeller ? "#47b4b1": "lightgray",
      shadowRadius:1,
      shadowOffset: {
          height: isBestSeller? -4:-4,
          width: isBestSeller? 4: 4
      },
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius:20,
      borderTopLeftRadius:20,
      margin: 2
    },
    exploreButton

      : {
      // margin: 5,
      // fontSize: 100,
      backgroundColor: 'white',
      width: '40%',
      height: 35,
      shadowOpacity:1,
      shadowColor:isBestSeller ? "lightgray": "#47b4b1",
      shadowRadius: 1,
      shadowOffset: {
          height: isBestSeller? -4: -4,
          width: isBestSeller? 4: 4
      },
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius:20,
      borderTopLeftRadius:20,
      margin: 2
    },

    bestSellerButtonText: {
      fontSize: isBestSeller ? 20 : 20,
      fontWeight: "bold"
  
    },
    exploreButtonText: {
      fontSize: isBestSeller ? 20 : 20,
      fontWeight: "bold"
    },
    groupTypeButtonContainer: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    container2: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "row",
      // width: "100%",
      padding: 10,
      paddingTop: 10,
      paddingBottom: 20,
      // backgroundColor: "#E2D8CF",

    },
    container3: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "row",
      padding: 10,
      paddingTop: 10,
      paddingBottom: 20,
      flexWrap: 'wrap',
      width: '100%'


    },
  });

  // console.log("searchResult :", searchResult)



  return (
    //---------------SEARCH BAR--------------------//
    <SafeAreaView style={{ flex: 1, backgroundColor: '#47b4b1', position: "relative" }}>
      <StatusBar barStyle="light-content"/>
      {isShow? <ScrollView style={styles.dropDown}>
          {searchResult.map((item: any, idx: number) => (
            <SearchBarItem item={item} key={idx} />
          ))}
        </ScrollView>: (null)}
      <View style={styles.container}>
        <View >
          <TextInput
            placeholder="Search Products"
            value={searchKeyword}
            // onChangeText={setSearchKeyword}
            style={styles.input}
            onChangeText={(value) => {
              console.log('on change value = ', value)
              setSearchKeyword(value)
            }}
          />        

        </View>
        {/* //---------------SEARCH BAR--------------------// */}
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)} style={{ position: "relative" }}>
            <FontAwesome name="shopping-cart" size={25} />
            <View style={styles.cartQty}>
              <Text style={styles.cartNumText}>{shoppingCartNum}</Text>
            </View>
          </TouchableOpacity>
        </View>


      </View>


      {/* Categories Column */}
      <View style={styles.catergoriesContainer}>
        {/* <ScrollView horizontal={true} style={{backgroundColor: 'white'}}> */}
        <Text>
          <GroceriesCategories fetchData={fetchData} />
        </Text>
        {/* </ScrollView> */}
      </View>

      <View style={styles.groupTypeButtonContainer}>
        <TouchableOpacity
          style={styles.bestSellerButton}
          onPress={bestSellerButton}>
          <Text style={styles.bestSellerButtonText}>Best Seller</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.exploreButton

          }
          onPress={exploreButton}>
          <Text style={styles.exploreButtonText}>Explore</Text>
        </TouchableOpacity>
      </View>

      {/* Top 5 Column */}

      {isBestSeller == true &&
        <View style={{ backgroundColor: 'white' }}>

          <ScrollView horizontal={true} style={{ backgroundColor: 'white', width: '100%' }}>
            <View style={styles.container2}>
              {allTop5Data.map((item: any, idx: number) => (
                <GroceriesTopItems item={item} key={idx} />
              ))}
            </View>
          </ScrollView>
          {/* ======================= test start ======================= */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{
              height: 50,
              width: 80,
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10
            }} onPress={() => navigation.navigate('GroceriesDetails' as never)} >
              <Text>Temp Item by Mike</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
              height: 50,
              width: 80,
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center"
            }} onPress={() => navigation.navigate('GroceriesTest' as never)} >
              <Text>Pagination Test by Mike</Text>
            </TouchableOpacity>

          </View>


          {/* ======================= test end ======================= */}
          <View style={{ minHeight: 500 }}></View>
        </View >}



      {/* Random Goods Column */}
      {
        isBestSeller == false &&
          allExploreData.loading ?
          <View>
            <ActivityIndicator size="large" />
          </View>
          :
          <FlatList
            style={{ backgroundColor: 'white' }}
            contentContainerStyle={{ flexGrow: 1 }}
            data={allExploreData}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreDataOnPageEnd}
          />



      }

    </SafeAreaView >
  );
}
