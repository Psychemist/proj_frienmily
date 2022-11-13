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
import { Provider } from 'react-redux';
import store from './redux/store';
import Account from './components/Account';
import Groceries from './components/Groceries';
import Friends from './components/Friends';
import Groups from './components/Groups';
import AddFriends from './components/AddFriends';
import CreateGroup from './components/CreateGroup';
import SignUpScreen from './components/SignUpScreen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Groups' component={Groups} 
      options={{
        tabBarLabel: 'Groups',
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon name="spinner" color={color} size={23} />
          // <MaterialCommunityIcons name="account-multiple" size={24} color="grey" />r
        ),
      }}
      />
      <Tab.Screen name='Friends' component={Friends}
      options={{
        tabBarLabel: 'Friends',
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon name="smile-o" color={color} size={25} />
          // <MaterialCommunityIcons name="robot-happy-outline" size={24} color="grey" />
        ),
      }} />
      <Tab.Screen name='Groceries' component={Groceries}
      options={{
        tabBarLabel: 'Groceries',
        tabBarIcon: ({ color, size }) => (
          // <FontAwesomeIcon name="braille" color={color} size={20} />
          <FontAwesomeIcon name="cubes" color={color} size={20} />
        ),
      }} />
      <Tab.Screen name='Account' component={Account}options={{
        tabBarLabel: 'Account',
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon name="user-o" color={color} size={20} />
          // <MaterialCommunityIcons name="account-multiple" size={24} color="black" />
        ),
      }} />
    </Tab.Navigator>
  )
}

const App = () => {

  return (
    <Provider store={store}>
      {/* <SafeAreaView> */}
      <NavigationContainer>


        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen options={{ headerShown: false, gestureEnabled: true }} name="HomeTab" component={HomeTab} />

          <Stack.Screen name="Add friends" component={AddFriends} />
          <Stack.Screen name="Create Group" component={CreateGroup} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        </Stack.Navigator>


      </NavigationContainer>
      {/* </SafeAreaView > */}
    </Provider>
  );
};

export default App