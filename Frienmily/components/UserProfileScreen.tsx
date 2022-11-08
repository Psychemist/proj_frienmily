import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function UserProfileScreen() {

    // NOTE: use the states in store
    const isLoggedIn = useSelector((state: RootState) => { return state.user.isLoggedIn })
    const displayName = useSelector((state: RootState) => { return state.user.displayName })
    const errMsg = useSelector((state: RootState) => { return state.user.errMsg })

    return (
        <View>
            <View>
                <View>User Information stored in Redux:</View>
                <View>DisplayName:{displayName}</View>
                <View>Login Status: {isLoggedIn ? "logged in" : "not yet logged in"}</View>
                <View>Error messege: {errMsg}</View>
            </View>
        </View>
    )
}
