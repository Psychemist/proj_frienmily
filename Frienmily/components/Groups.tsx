import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GroupItem from "./GroupItem";

export default function Groups() {
    const styles = StyleSheet.create({
        floatButtonFontSize: {
            fontSize: 50,
        },
        circleButton: {
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: '#907651',
            position: 'absolute',
            right: 30,
            bottom: 30,
            opacity: 0.8

        }
    })
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Text><GroupItem /></Text>
                <Text><GroupItem /></Text>
                <Text><GroupItem /></Text>
                <Text><GroupItem /></Text>

            </ScrollView>
            <TouchableOpacity
                style={styles.circleButton}
                onPress={() => {
                    navigation.navigate('Create Group' as never)
                }}>
                <Text style={styles.floatButtonFontSize}>+</Text>
            </TouchableOpacity>
        </View>
    )
}