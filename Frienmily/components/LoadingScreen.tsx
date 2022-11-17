import React from 'react'
import { Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useNavigation } from '@react-navigation/native'


export default function LoadingScreen() {
    const navigation = useNavigation()
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

    if (isLoggedIn == true) {
        navigation.navigate('Groups' as never)
        console.log("isLoggedIn is true at LoadingScreen. Navigated to Homepage(Groups Page).")
    } else {
        navigation.navigate('Login' as never)
        console.log("isLoggedIn is false at LoadingScreen. Navigated to LoginScreen.")
    }




    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "#47b4b1"
        }}>
            <Text>Loading...</Text>
        </View>
    )
}
