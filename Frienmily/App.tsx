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


const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

const HomeTab = () => {
  // return (
  //   <Tab.Navigator>
  //     <Tab.Screen name='Friends' component={Friends} />
  //     <Tab.Screen name='Groups' component={Groups} />
  //     <Tab.Screen name='Groceries' component={Groceries} />
  //     <Tab.Screen name='Account' component={Account} />
  //   </Tab.Navigator>
  // )
}

const App = () => {

  return (
    <Provider store={store}>
      {/* <SafeAreaView> */}
      <NavigationContainer>


        {/* <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="HomeTab" component={HomeTab} />
          <Stack.Screen name="Add friends" component={AddFriends} />
          <Stack.Screen name="Create Group" component={CreateGroup} />

        </Stack.Navigator> */}




        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, gestureEnabled: false }}>

          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />

        </Stack.Navigator>






      </NavigationContainer>
      {/* </SafeAreaView > */}
    </Provider>
    //TODO: The Tab bar is static (show when the current location is not loading/login/register page)
  );
};

export default App