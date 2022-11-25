import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import FriendItem from './FriendItem';
import { useNavigation } from '@react-navigation/native';
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

export default function Groceries() {
  const navigation = useNavigation();

  // FIXME: the state now is empty there's no fetching . How to get the latest state?

  const exploreProductsInRedux = useSelector((state: RootState) => state.product.exploreProductData)
  const top5ProductsInRedux = useSelector((state: RootState) => state.product.top5ProductData)

  const [isBestSeller, setIsBestSeller] = useState(true)
  const [allExploreData, setAllExploreData]: any = useState([]);
  const [allTop5Data, setAllTop5Data]: any = useState([]);
  const [groupName, setGroupName] = React.useState('');
  const [page, setPage] = useState(1)
  const [categoryArray, setCategoryArray] = useState([])

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

  const getCategoryArrayFromChild = (categoryArray: any) => {
    console.log("THIS IS ARRAY", categoryArray);
    setCategoryArray(categoryArray)
    dispatch(fetchProductData(categoryArray))
  }

  const fetchData = async (categoryArray: any) => {
    try {
      console.log("@@@@@@@ fetch data")
      let fetchResult = await dispatch(fetchProductData({
        categoryArray: categoryArray
      })).unwrap();

    } catch (error) {
      console.log('error', error);
    }
  }


  const renderEmpty = () => (
    <View>
      <Text>No Data at the Moment</Text>
      <TouchableOpacity onPress={getCategoryArrayFromChild}>
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

  // const onChangePage = () => {
  //   setPage(page + 1)
  // }
  // const fetchMoreDataOnPageEnd = () => {
  //   console.log("touched the end of the page")
  //   if (!allExploreData.isListEnd && !allExploreData.moreLoading) {
  //     onChangePage()
  //   }
  // }


  // useEffect(() => {
  //   console.log("categoryArray--------: ", categoryArray)
  //   console.log("The current page number: ", page)
  //   // fetchData(categoryArray)
  // }, [])
  // =================================================================


  const styles = StyleSheet.create({
    text: {
      fontSize: 25,
      fontWeight: 'bold',
      paddingLeft: 20,
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
      borderWidth: 1,
      padding: 10,
      minWidth: 300,
      maxWidth: 300,
      borderRadius: 10,
      backgroundColor: 'white',
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
      fontSize: 20,
      backgroundColor: 'white',
      width: '40%',
      height: 35,
      // borderRadius: 10,
      // borderWidth: 1,
      // borderColor: isBestSeller ? '#47b4b1' : 'white',
      // borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
    },
    exploreButton

      : {
      // margin: 5,
      fontSize: 20,
      backgroundColor: 'white',
      width: '40%',
      height: 35,
      // borderRadius: 10,
      // borderWidth: 1,
      // borderColor: isBestSeller ? 'white' : '#47b4b1',
      // borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
    },

    bestSellerButtonText: {
      fontSize: isBestSeller ? 15 : 12,
    },
    exploreButtonText: {
      fontSize: isBestSeller ? 15 : 18,
    },
    groupTypeButtonContainer: {
      justifyContent: 'center',
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

  });

  // FIXME: CSS: make it 3 columns
  // FIXME: It should re-render the items when clicking categories buttons
  // FIXME: Encountered two children with the same key

  // TODO: 按自己思路來



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#47b4b1' }}>
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Search Products"
            value={groupName}
            onChangeText={setGroupName}
            style={styles.input}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)} style={{ position: "relative" }}>
            <FontAwesome name="shopping-cart" size={30} />
            <View style={styles.cartQty}>
              <Text>0</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>


      {/* Categories Column */}
      <View style={styles.catergoriesContainer}>
        <Text>
          <GroceriesCategories fetchData={fetchData} getCategoryArrayFromChild={getCategoryArrayFromChild} />
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
          <View >
            <Text style={styles.text}>Best Seller</Text>
          </View>

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
          key={1}
          numColumns={3}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        // onEndReachedThreshold={0.2}
        // onEndReached={fetchMoreDataOnPageEnd}
        />


        // <ScrollView style={{ backgroundColor: 'white', width: '100%' }}>
        //   <View style={styles.randomItemsContainer}>
        //     <View>
        //       <Text style={styles.text}>Explore</Text>
        //     </View>
        //     <View style={styles.topItemsCards}>
        //       <View style={styles.container3}>
        //         {allExploreData.map((item: any, idx: number) => (
        //           <GroceriesRandomItems item={item} key={idx} />
        //         ))}
        //       </View>
        //     </View>
        //   </View>
        // </ScrollView>


      }

    </SafeAreaView >
  );
}
