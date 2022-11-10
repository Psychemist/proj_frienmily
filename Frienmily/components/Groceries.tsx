import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Groceries() {
    const styles = StyleSheet.create({
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{alignItems: "center"}}>
                <Text style={{fontSize: 25, paddingBottom: "1%"}}>Groceries</Text> 
            </View>
            <Text>Groceries</Text>
            <Text>This is groceries page</Text>
        </SafeAreaView>
    )
}