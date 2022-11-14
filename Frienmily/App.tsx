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


const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Groups' component={Groups} />
      <Tab.Screen name='Friends' component={Friends} />
      <Tab.Screen name='Groceries' component={Groceries} />
      <Tab.Screen name='Account' component={Account} />
    </Tab.Navigator>
  )
}

const App = () => {

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

  return (
    <Provider store={store}>
      {/* <SafeAreaView> */}
      <NavigationContainer>

        isLoggedIn? (
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false, gestureEnabled: true }} name="HomeTab" component={HomeTab} />
          <Stack.Screen name="Add friends" component={AddFriends} />
          <Stack.Screen name="Create Group" component={CreateGroup} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        </Stack.Navigator>

        )
        :
        (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, gestureEnabled: true }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false, gestureEnabled: true }} />
        </Stack.Navigator>
        )

        {/* <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen options={{ headerShown: false, gestureEnabled: true }} name="HomeTab" component={HomeTab} />
          <Stack.Screen name="Add friends" component={AddFriends} />
          <Stack.Screen name="Create Group" component={CreateGroup} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        </Stack.Navigator> */}


      </NavigationContainer>
      {/* </SafeAreaView > */}
    </Provider>
  );
};

export default App