import React, { type PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import UserProfileScreen from './components/UserProfileScreen';
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
import GroceriesItems from './components/GroceriesItems';
import ReceiptRecord from './components/ReceiptRecord';
import ReceiptRecordItem from './components/ReceiptRecordItem';
import GroceriesDetails from './components/GroceriesDetails';
import Gallery from './components/Gallery';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarLabel: 'Groups',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="spinner" color={color} size={23} />
            // <MaterialCommunityIcons name="account-multiple" size={24} color="grey" />r
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarLabel: 'Friends',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="smile-o" color={color} size={25} />
            // <MaterialCommunityIcons name="robot-happy-outline" size={24} color="grey" />
          ),
        }}
      />
      <Tab.Screen
        name="Groceries"
        component={Groceries}
        options={{
          tabBarLabel: 'Groceries',
          tabBarIcon: ({ color, size }) => (
            // <FontAwesomeIcon name="braille" color={color} size={20} />
            <FontAwesomeIcon name="cubes" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
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
  // const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
  // console.log(isLoggedIn)

  return (
    <Provider store={store}>
      {/* <SafeAreaView> */}
      <NavigationContainer>
        {/* isLoggedIn? */}
        <Stack.Navigator
          initialRouteName="Loading"
          // initialRouteName="Gallery"
          screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: true }}
            name="HomeTab"
            component={HomeTab}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Groceries" component={Groceries} />
          <Stack.Screen name="GroceriesItems" component={GroceriesItems} />
          <Stack.Screen name="GroceriesDetails" component={GroceriesDetails} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="CartItem" component={CartItem} />
          <Stack.Screen
            name="ShoppingList"
            component={ShoppingList}
            options={{ headerShown: false, gestureEnabled: true }}
          />
          <Stack.Screen name="ShoppingListItem" component={ShoppingListItem} />
          <Stack.Screen name="ReceiptRecord" component={ReceiptRecord} />
          <Stack.Screen
            name="ReceiptRecordItem"
            component={ReceiptRecordItem}
          />
          <Stack.Screen name="Groups" component={Groups} />
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
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="Gallery" component={Gallery} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </SafeAreaView > */}
    </Provider>
  );
};

export default App;
