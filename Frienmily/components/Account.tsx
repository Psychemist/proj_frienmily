import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Account() {
    // 在 Redux 取資料
    const usernameInRedux = useSelector((state: RootState) => state.user.username)
    const mobileInRedux = useSelector((state: RootState) => state.user.mobile)
    const emailInRedux = useSelector((state: RootState) => state.user.email)

    const [username, setUsername] = useState(usernameInRedux)
    const [mobile, setMobile] = useState(mobileInRedux ?? "Enter your mobile number so that your friend can find you")
    const [email, setEmail] = useState(emailInRedux ?? "Enter your email address so that your friend can find you")
    const [isNameEditable, setIsNameEditable] = useState(false)
    const [isMobileEditable, setIsMobileEditable] = useState(false)
    const [isEmailEditable, setIsEmailEditable] = useState(false)


    const navigation = useNavigation()
    const dispatch = useDispatch()

    const changeUsername = () => {
        setIsNameEditable(!isNameEditable)
        console.log("Can edit username now")
    }
    const changeMobile = () => {
        setIsMobileEditable(!isMobileEditable)
        console.log("Can edit mobile number now")
    }
    const changeEmail = () => {
        setIsEmailEditable(!isEmailEditable)
        console.log("Can edit email now")
    }
    const onLogout = () => {
        // TODO: isLoggedIn 變為false；將token無效化


        Alert.alert(
            'Are you sure you want to log out?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => navigation.navigate('Login' as never) },
            ]
        );
    }

    const styles = StyleSheet.create({
        mainPage: {
            flex: 1
        },
        title: {
            // height: 40,
            // margin: 12,
            padding: 10,
            // minWidth: 300,
            // maxWidth: 300,
            borderRadius: 10,
            fontSize: 30
        },
        itemContainer: {
            width: "90%",
            backgroundColor: "#907651",
            justifyContent: "space-between",
            // alignItems: "center",
            flexDirection: "row",
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 15,
            marginTop: 5,
            marginBottom: 5,
            height: "22%",
            alignItems: "center",
            // justifyContent: "space-between",
            // alignItems:"space-around",

        },
        leftContainer: {
            height: "100%",
            justifyContent: "space-around",
        },
        fieldHeader: {
            fontSize: 22,
            fontWeight: "bold",
            paddingLeft: 10
        },
        inputField: {
            backgroundColor: "white",
            fontSize: 22,
            borderRadius: 10,
            minWidth: 270,
            maxWidth: 270,
            padding: 10
        }

    });
    return (
        <SafeAreaView style={styles.mainPage}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 25, paddingBottom: "1%" }}>Account</Text>
            </View>

            <Text style={styles.title}>Personal Details</Text>
            <View style={{ alignItems: "center" }}>

                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.fieldHeader}>Username</Text>
                        {isNameEditable ?
                            <TextInput autoCapitalize='none' maxLength={18} style={styles.inputField}
                                value={username} onChangeText={setUsername}
                            />
                            :
                            <Text style={[styles.fieldHeader, { fontSize: 17, padding: 10 }]}>{username}</Text>}
                    </View>
                    <View>
                        <Text>
                            {isNameEditable ?
                                <FontAwesome name='check' size={40} onPress={changeUsername} />
                                :
                                <FontAwesome name='pencil' size={40} onPress={changeUsername} />}
                        </Text>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.fieldHeader}>Mobile (for adding friends)</Text>
                        {isMobileEditable ?
                            <TextInput keyboardType='numeric' maxLength={8} style={styles.inputField}
                                value={mobile} onChangeText={setMobile}
                            />
                            :
                            <Text style={[styles.fieldHeader, { fontSize: 17, padding: 10 }]}>{mobile}</Text>}
                    </View>
                    <View>
                        <Text>
                            {isMobileEditable ?
                                <FontAwesome name='check' size={40} onPress={changeMobile} />
                                :
                                <FontAwesome name='pencil' size={40} onPress={changeMobile} />}
                        </Text>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.fieldHeader}>Email Address</Text>
                        {isEmailEditable ?
                            <TextInput autoCapitalize='none' maxLength={22} style={styles.inputField}
                                value={email} onChangeText={setEmail}
                            />
                            :
                            <Text style={[styles.fieldHeader, { fontSize: 17, padding: 10 }]}>{email}</Text>}
                    </View>
                    <View>
                        <Text>
                            {isEmailEditable ?
                                <FontAwesome name='check' size={40} onPress={changeEmail} />
                                :
                                <FontAwesome name='pencil' size={40} onPress={changeEmail} />}
                        </Text>
                    </View>
                </View>


                <TouchableOpacity style={styles.itemContainer} onPress={onLogout}>
                    <Text style={[styles.fieldHeader, { fontWeight: "bold", fontSize: 18, paddingLeft: 10, textAlign: "center" }]}>Logout</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}