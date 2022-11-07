import React, { type PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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



const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      {/* <SafeAreaView> */}
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false, gestureEnabled: false }}>

        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="UserProfile" component={UserProfileScreen} />

      </Stack.Navigator>
      {/* </SafeAreaView> */}
    </NavigationContainer>

    //TODO: The Tab bar is static (show when the current location is not loading/login/register page)
  );
};


export default App;
