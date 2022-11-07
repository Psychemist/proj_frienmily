import React from 'react'
import { Text, View } from 'react-native'

export default function LoadingScreen() {
    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1
        }}>
            <Text>Loading...</Text>
        </View>
    )
}
