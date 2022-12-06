import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useNavigation } from '@react-navigation/native'
import userSlice, { reLogin } from '../redux/user/userSlice'
import { getStoredAuth } from '../redux/user/thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { CommonActions } from '@react-navigation/native';
export default function LoadingScreen() {
    const navigation = useNavigation()
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const userState = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const [isLoadingScreenRendered, setIsLoadingScreenRendered] = useState(false)


    useEffect(() => {

        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('token')
            setTimeout(() => {
                if (token) {
                    console.log('>>>>>>>>>> loading page is log out flag :', userState.isLoggedOut)
                    if (!userState.isLoggedOut) {
                        dispatch(reLogin(token))
                        setIsLoadingScreenRendered(true)
                        navigation.navigate('HomeTab' as never)

                    } else {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'Groceries' }
                                ],
                            })
                        );

                    }
                    console.log("isLoggedIn is true at LoadingScreen. Navigated to Homepage(Groups Page).")

                } else {
                    navigation.navigate('Login' as never)
                    console.log("isLoggedIn is false at LoadingScreen. Navigated to LoginScreen.")
                }

            }, 1300)
        }
        checkLogin()

    }, [])

    const styles = StyleSheet.create({
        body: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "#47b4b1"
        },
        appName: {
            fontSize: 42,
            fontWeight: "bold",
            color: "white"
        }
    })

    return (
        <View style={styles.body}>
            <Text style={styles.appName}>Frienmily</Text>
        </View>
    )
}
