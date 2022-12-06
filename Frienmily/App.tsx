import React, { type PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './redux/store';
import Account from './components/Account';
import Groceries from './components/Groceries';
import Friends from './components/Friends';
import Groups from './components/Groups';
import AddFriends from './components/AddFriends';
import CreateGroup from './components/CreateGroup';
import SignUpScreen from './components/SignUpScreen';
import Cart from './components/Cart';
import CartItem from './components/CartItem';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShoppingList from './components/ShoppingList';
import ShoppingListItem from './components/ShoppingListItem';
import GroceriesRandomItems from './components/GroceriesRandomItems';
import GroceriesTopItems from './components/GroceriesTopItems';
import ReceiptRecord from './components/ReceiptRecord';
import ReceiptRecordItem from './components/ReceiptRecordItem';
import GroceriesDetails from './components/GroceriesDetails';
import Photo from './components/Photo';
import AssignGroup from './components/AssignGroup';
import UploadReceipt from './components/UploadReceipt';
import MoneySettle from './components/MoneySettle';
import UserProfilePicuture from './components/UserProfilePicuture';
import GroupMember from './components/GroupMember';
import ImagePreview from './components/ImagePreview';
import GroceriesTest from './components/GroceriesTest';
import ExpenseReport from './components/ExpenseReport';
import GroupPhotoEdit from './components/GroupPhotoEdit';
import PurchasedProductsItems from './components/PurchasedProductsItems';
import PurchasedProducts from './components/PurchasedProducts';
import GroceriesDetailsInstant from './components/GroceriesDetailsInstant';
import MergeGroupList from './components/MergeGroupList';
import MergeGroupListItem from './components/MergeGroupListItem';
import MergeShoppingList from './components/MergeShoppingList';
import MergeShoppingListItem from './components/MergeShoppingListItem';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()
const styles = StyleSheet.create({

  shoppingCartIcon: {
    color: "white",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }
})

const HomeTab = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#47b4b1",
      tabBarInactiveTintColor: "gray",

    }} >
      <Tab.Screen
        name="Groceries"
        component={Groceries}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? '#47b4b1' : color, fontSize: 11 }}>Groceries</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            // <FontAwesomeIcon name="braille" color={color} size={20} />
            <FontAwesomeIcon name="cubes" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? '#47b4b1' : color, fontSize: 11 }}>Groups</Text>
          ),
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="spinner" color={color} size={20} />
            // <MaterialCommunityIcons name="account-multiple" size={24} color="grey" />r
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? '#47b4b1' : color, fontSize: 11 }}>Friends</Text>
          ),
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="smile-o" color={color} size={24} />
            // <MaterialCommunityIcons name="robot-happy-outline" size={24} color="grey" />
          ),
        }}
      />
      <Tab.Screen

        name="Account"
        component={Account}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? '#47b4b1' : color, fontSize: 11 }}>Account</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="user-o" color={color} size={20} />
            // <MaterialCommunityIcons name="account-multiple" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="light-content" />
        {/* <SafeAreaView> */}
        <NavigationContainer>
          {/* isLoggedIn? */}
          <Stack.Navigator
            initialRouteName="Loading"
            // initialRouteName="Photo"
            screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <Stack.Screen
              options={{ headerShown: false, gestureEnabled: false }}
              name="HomeTab"
              component={HomeTab}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ gestureEnabled: true }} />
            <Stack.Screen
              name="GroceriesTopItems"
              component={GroceriesTopItems}
            />
            <Stack.Screen
              name="GroceriesRandomItems"
              component={GroceriesRandomItems}
            />
            <Stack.Screen name="GroceriesDetails" component={GroceriesDetails} options={{ gestureEnabled: true }} />
            <Stack.Screen name="Cart" component={Cart} options={{ gestureEnabled: true }} />
            <Stack.Screen name="CartItem" component={CartItem} />
            <Stack.Screen name="AssignGroup" component={AssignGroup} options={{ gestureEnabled: true }} />
            <Stack.Screen
              name="ShoppingList"
              component={ShoppingList}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen name="ShoppingListItem" component={ShoppingListItem} options={{ gestureEnabled: true }} />
            <Stack.Screen name="ReceiptRecord" component={ReceiptRecord} options={{ gestureEnabled: true }} />
            <Stack.Screen
              name="ReceiptRecordItem"
              component={ReceiptRecordItem}
            />
            <Stack.Screen name="Groups" component={Groups} />
            {/* <Stack.Screen name="Groceries" component={Groceries} /> */}
            <Stack.Screen
              name="Add friends"
              component={AddFriends}
              options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
              name="Create Group"
              component={CreateGroup}
              options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Photo" component={Photo} options={{ gestureEnabled: true }} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="UploadReceipt" component={UploadReceipt} options={{ gestureEnabled: true }} />
            <Stack.Screen name="MoneySettle" component={MoneySettle} options={{ gestureEnabled: true }} />
            <Stack.Screen name="UserProfilePicuture" component={UserProfilePicuture} options={{ gestureEnabled: true }} />
            <Stack.Screen name="GroupMember" component={GroupMember} options={{ gestureEnabled: true }} />
            {/* <Stack.Screen name="ReceiptImage" component={ReceiptImage} /> */}
            <Stack.Screen name="ExpenseReport" component={ExpenseReport} options={{ gestureEnabled: true }} />
            <Stack.Screen name="ImagePreview" component={ImagePreview} />
            <Stack.Screen name="GroceriesTest" component={GroceriesTest} />
            <Stack.Screen name="GroupPhotoEdit" component={GroupPhotoEdit} options={{ gestureEnabled: true }} />
            <Stack.Screen name="PurchasedProducts" component={PurchasedProducts} options={{ gestureEnabled: true }} />
            <Stack.Screen name="PurchasedProductsItems" component={PurchasedProductsItems} />
            <Stack.Screen name="GroceriesDetailsInstant" component={GroceriesDetailsInstant} />
            <Stack.Screen name="MergeGroupList" component={MergeGroupList} options={{ gestureEnabled: true }} />
            <Stack.Screen name="MergeGroupListItem" component={MergeGroupListItem} />
            <Stack.Screen name="MergeShoppingList" component={MergeShoppingList} options={{ gestureEnabled: true }} />
            <Stack.Screen name="MergeShoppingListItem" component={MergeShoppingListItem} />

          </Stack.Navigator>
        </NavigationContainer>
        {/* </SafeAreaView > */}
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
