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
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../redux/product/thunk';
import { RootState } from '../redux/store';


import useDebounce from './useDebounce';
import SearchBarItem from './SearchBarItem';

export default function Groceries() {
  const navigation = useNavigation();
  const exploreProductsInRedux = useSelector((state: RootState) => state.product.exploreProductData)
  const top5ProductsInRedux = useSelector((state: RootState) => state.product.top5ProductData)
  const isListEnd = useSelector((state: RootState) => state.product.isListEnd)

  const [isBestSeller, setIsBestSeller] = useState(true)
  // const [allExploreData, setAllExploreData]: any = useState([]);
  // const [allTop5Data, setAllTop5Data]: any = useState([]);
  // const [groupName, setGroupName] = React.useState('');
  const [page, setPage] = useState(0)
  const [categoryArray, setCategoryArray] = useState([])
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);
  const [shoppingCartNum, setShoppingCartNum] = React.useState<number>(0);
  const [isRenewList, setIsRenewList] = useState<boolean>(false)

  const [button1, setButton1] = useState(false)
  const [button2, setButton2] = useState(false)
  const [button3, setButton3] = useState(false)
  const [button4, setButton4] = useState(false)
  const [button5, setButton5] = useState(false)
  const [button6, setButton6] = useState(false)
  const [button7, setButton7] = useState(false)
  const [button8, setButton8] = useState(false)
  const [button9, setButton9] = useState(false)
  const [button10, setButton10] = useState(false)

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
  const textChange = () => {
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
          if (searchResult.length == 0) {
            setIsShow(false)
          }

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
  useEffect(() => {
    textChange()
  }, [debouncedSearchKeyword])
  //---------------SEARCH BAR--------------------//

  const dispatch = useDispatch()

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

  // const getCategoryArrayFromChild = (categoryArray: any) => {
  //   console.log("THIS IS ARRAY", categoryArray);
  //   setCategoryArray(categoryArray)
  //   console.log("11111111 fetch at getCategoryArrayFromChild")
  //   dispatch(fetchProductData(categoryArray))
  // }



  const fetchData = async (categoryArray: any, page: number, isRenewList: boolean) => {
    try {
      console.log("@@@@@@@ fetch data")
      console.log("@@@@@@@ categoryArray: ", categoryArray)
      console.log("@@@@@@@ page: ", page)
      let fetchResult = await dispatch(fetchProductData({
        categoryArray: categoryArray,
        page: page,
        isRenewList: isRenewList
      })).unwrap();

    } catch (error) {
      console.log('error', error);
    }
  }


  // const renderEmpty = () => (
  //   <View>
  //     <Text>No Data at the Moment</Text>
  //     <TouchableOpacity onPress={getCategoryArrayFromChild}>
  //       <Text>Refresh</Text>
  //     </TouchableOpacity>
  //   </View>
  // )
  const renderFooter = () => (
    <View>
      {/* {allExploreData.moreLoading && <ActivityIndicator />}
      {allExploreData.isListEnd && <Text>No more products at the moment</Text>} */}
      {!isListEnd && <ActivityIndicator style={{ margin: 10 }} />}
      {isListEnd &&
        <View style={{ margin: 10 }}>
          <Text style={{ textAlign: "center" }}>No more products at the moment</Text>
        </View>
      }
    </View>
  )



  const onChangePage = () => {
    setPage(page + 1)
    console.log("The coming page is Page ", page)
  }
  const fetchMoreDataOnPageEnd = () => {
    console.log("touched the end of the page")
    // if (!allExploreData.isListEnd && !allExploreData.moreLoading) {
    onChangePage()
    // }
  }


  // useEffect(() => {
  //   console.log("categoryArray--------: ", categoryArray)
  //   console.log("The current page number: ", page)
  //   console.log("222222222 fetch at userEffect")
  //   fetchData(categoryArray, page)
  // }, [page])

  // =================================================================



  // FIXME: Fetch完第一次，Scroll到底的時候會fetch 額外60個product，並會取代掉前30個product；

  // FIXME: 按Category button沒有反應

  useEffect(() => {
    setIsRenewList(true)
    onChangeFetchData(isRenewList)
  }, [button1, button2, button3, button4, button5, button6, button7, button8, button9, button10]);

  useEffect(() => {
    setIsRenewList(false)
    onChangeFetchData(isRenewList)
  }, [page]);

  const onChangeFetchData = (isRenewList: boolean) => {
    const booleanArray = [
      { isSelected: button1, id: 1 },
      { isSelected: button2, id: 2 },
      { isSelected: button3, id: 3 },
      { isSelected: button4, id: 4 },
      { isSelected: button5, id: 5 },
      { isSelected: button6, id: 6 },
      { isSelected: button7, id: 7 },
      { isSelected: button8, id: 8 },
      { isSelected: button9, id: 9 },
      { isSelected: button10, id: 10 }]
    const finalSelectedCategoriesArray = []
    for (let item of booleanArray) {
      if (item.isSelected == true) {
        finalSelectedCategoriesArray.push(item.id)
      }
    }

    if (finalSelectedCategoriesArray.length == 0) {
      console.log("isRenewList: ", isRenewList)
      fetchData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], page, isRenewList)
    } else {
      console.log("isRenewList: ", isRenewList)
      fetchData(finalSelectedCategoriesArray, page, isRenewList)
    }
  }


  // =================================================================


  const styles = StyleSheet.create({
    dropDown: {
      position: "absolute",
      left: "6%",
      maxHeight: 200,
      // minHeight: 0,
      // height: "30%",
      width: "88%",
      top: "16%",
      zIndex: 9,
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
      fontSize: 9,

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
      right: -10,
      shadowOpacity: 0.3,
      shadowRadius: 1,
      shadowOffset: {
        height: 1,
        width: 1
      }
    },
    container: {
      position: "relative",
      justifyContent: 'center',
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
      height: 45,
      margin: 12,
      borderWidth: 2.5,
      padding: 10,
      minWidth: 300,
      maxWidth: 300,
      borderRadius: 15,
      backgroundColor: 'white',
      borderColor: "white",
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
      shadowOpacity: 1,
      shadowColor: isBestSeller ? "#47b4b1" : "lightgray",
      shadowRadius: 1,
      shadowOffset: {
        height: isBestSeller ? -4 : -4,
        width: isBestSeller ? 4 : 4
      },
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      margin: 2
    },
    exploreButton

      : {
      // margin: 5,
      // fontSize: 100,
      backgroundColor: 'white',
      width: '40%',
      height: 35,
      shadowOpacity: 1,
      shadowColor: isBestSeller ? "lightgray" : "#47b4b1",
      shadowRadius: 1,
      shadowOffset: {
        height: isBestSeller ? -4 : -4,
        width: isBestSeller ? 4 : 4
      },
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      margin: 2
    },

    bestSellerButtonText: {
      fontSize: isBestSeller ? 20 : 20,
      fontWeight: "bold",
      color: "#606467",
    },
    exploreButtonText: {
      fontSize: isBestSeller ? 20 : 20,
      fontWeight: "bold",
      color: "#606467",
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
    exploreProductList: {
      // flexGrow: 1,
      backgroundColor: 'white',
      width: "100%",
      justifyContent: "center"
    },
    loadMoreBtn: {
      backgroundColor: '#47b4b1',
      height: 40,
      width: 360,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderRadius: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'white',
    },
    buttonText: {
      fontSize: 20,
      fontWeight: '300',
      color: 'white',
    },
    shoppingCartIcon: {
      color: "white",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1
      }
    }
  });



  return (
    //---------------SEARCH BAR--------------------//
    <SafeAreaView style={{ flex: 1, backgroundColor: '#47b4b1', position: "relative" }}>
      <StatusBar barStyle="light-content" />
      {isShow && searchResult.length != 0 ? <ScrollView style={styles.dropDown}>
        {searchResult.map((item: any, idx: number) => (
          <SearchBarItem item={item} key={idx} />
        ))}
      </ScrollView> : (null)}
      <View style={styles.container}>
        <View style={{ paddingRight: "2%" }} >
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
            <FontAwesome name="shopping-cart" size={26} style={styles.shoppingCartIcon} />
            <View style={styles.cartQty}>
              <Text style={styles.cartNumText}>{shoppingCartNum}</Text>
            </View>
          </TouchableOpacity>
        </View>


      </View>


      {/* Categories Column */}
      <View style={styles.catergoriesContainer}>
        <Text>
          <GroceriesCategories
            setButton1={setButton1}
            setButton2={setButton2}
            setButton3={setButton3}
            setButton4={setButton4}
            setButton5={setButton5}
            setButton6={setButton6}
            setButton7={setButton7}
            setButton8={setButton8}
            setButton9={setButton9}
            setButton10={setButton10}
            button1={button1}
            button2={button2}
            button3={button3}
            button4={button4}
            button5={button5}
            button6={button6}
            button7={button7}
            button8={button8}
            button9={button9}
            button10={button10}
          // getCategoryArrayFromChild={getCategoryArrayFromChild}
          />
        </Text>
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
              {top5ProductsInRedux.map((item: any, idx: number) => (
                <GroceriesTopItems item={item} key={`top_${idx}`} />
              ))}
            </View>
          </ScrollView>
          <View style={{ minHeight: 500 }}></View>
        </View >}



      {/* Random Goods Column */}
      {
        isBestSeller == false &&
        // allExploreData.loading ?
        // <View>
        //   <ActivityIndicator size="large" />
        // </View>
        // :

        <FlatList<any[]>
          contentContainerStyle={styles.exploreProductList}
          data={exploreProductsInRedux}
          renderItem={(item: any) => (
            <GroceriesRandomItems key={`rand_${item.id}`} item={item.item} />
          )}
          keyExtractor={(item: any, index: any) => index.toString()}
          numColumns={3}
          ListFooterComponent={renderFooter}
          // ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreDataOnPageEnd}
        />

      }

    </SafeAreaView >
  );
}
