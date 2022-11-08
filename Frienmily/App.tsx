import React, { type PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
<<<<<<< HEAD
import { Provider } from 'react-redux';
import store from './redux/store';
=======
import Account from './components/Account';
import Groceries from './components/Groceries';
import Friends from './components/Friends';
import Groups from './components/Groups';
>>>>>>> 204cafb2b590930fd53c08577c5211491e423d04


const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name = 'Friends' component={Friends} />
        <Tab.Screen name = 'Groups' component={Groups} />
        <Tab.Screen name = 'Groceries' component={Groceries} />
        <Tab.Screen name = 'Account' component={Account} />
    </Tab.Navigator>
  )
}

const App = () => {

  return (
    <Provider store={store}>
      {/* <SafeAreaView> */}
<<<<<<< HEAD
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, gestureEnabled: false }}>
=======

      <Stack.Navigator>
          <Stack.Screen 
          options={{
            headerShown: false,
          }}
          name="HomeTab" component={HomeTab} />
          <Stack.Screen name="Detail" component={Account} />
      </Stack.Navigator>





      {/* <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false, gestureEnabled: false }}>
>>>>>>> 204cafb2b590930fd53c08577c5211491e423d04

          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />

<<<<<<< HEAD
        </Stack.Navigator>
      </NavigationContainer>
=======
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />

      </Stack.Navigator> */}
>>>>>>> 204cafb2b590930fd53c08577c5211491e423d04
      {/* </SafeAreaView> */}
    </Provider>
    //TODO: The Tab bar is static (show when the current location is not loading/login/register page)
  );
};

export default App