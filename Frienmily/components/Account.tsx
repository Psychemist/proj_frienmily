import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchUpdateEmail, fetchUpdateGender, fetchUpdateMobileNumber } from "../redux/user/thunk";
import ModalDropdown from 'react-native-modal-dropdown';
import { logout } from "../redux/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GENDERS = ["Male", "Female", "Others"]

export default function Account() {
    // 在 Redux 取資料
    const usernameInRedux = useSelector((state: RootState) => state.user.username)
    const genderInRedux = useSelector((state: RootState) => state.user.gender)
    const mobileInRedux = useSelector((state: RootState) => state.user.mobile)
    const emailInRedux = useSelector((state: RootState) => state.user.email)

    const genderIndex = GENDERS.indexOf(genderInRedux!)



    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    if (isLoggedIn == true) {
        console.log("isLoggedIn is true at User Profile Screen")
    } else {
        console.log("isLoggedIn is false at User Profile Screen")
    }

    // 設定初始值
    const [username, __] = useState(usernameInRedux)
    const [gender, setGender] = useState(genderIndex)
    const [mobile, setMobile] = useState(mobileInRedux)
    const [email, setEmail] = useState(emailInRedux)

    const [isGenderEditable, setIsGenderEditable] = useState(false)
    const [isMobileEditable, setIsMobileEditable] = useState(false)
    const [isEmailEditable, setIsEmailEditable] = useState(false)



    const navigation = useNavigation()
    const dispatch = useDispatch()

    // TODO: 離開此頁時，如果各個isEditable仍是true，則彈出視窗問用戶是否要放棄更改

    const changeGender = async () => {
        if (isGenderEditable == true) {
            try {
                let updateGenderResult = await dispatch(fetchUpdateGender({ username, gender })).unwrap()
                console.log('fetchUpdateGender from unwrap = ', updateGenderResult)
            }
            catch (error) {
                console.log('error from unwrap = ', error)
            }
            console.log("Submitted new gender setting")
        }
        setIsGenderEditable(!isGenderEditable)

    }
    const changeMobile = async () => {

        if (isMobileEditable == true) {
            try {
                const normalMobileNumberLength = 8
                if (!mobile || mobile.length != normalMobileNumberLength) {
                    Alert.alert(
                        'Invalid mobile number. Please input again.',
                        '',
                        [
                            {
                                text: 'OK',
                                onPress: () => console.log('OK Pressed'),
                                style: 'cancel',
                            }
                        ]
                    );
                    return
                }

                let updateMobileNumberResult = await dispatch(fetchUpdateMobileNumber({ username, mobile })).unwrap()
                console.log('updateMobileNumberResult from unwrap = ', updateMobileNumberResult)

            }
            catch (error) {
                console.log('error from unwrap = ', error)
            }
            console.log("Submitted new mobile number")
        }

        setIsMobileEditable(!isMobileEditable)

    }
    const changeEmail = async () => {

        if (isEmailEditable == true) {
            try {
                if (!email || !email.includes('@') || !email.includes('.')) {
                    Alert.alert(
                        'Invalid email address. Please input again.',
                        '',
                        [
                            {
                                text: 'OK',
                                onPress: () => console.log('OK Pressed'),
                                style: 'cancel',
                            }
                        ]
                    );

                    return
                }

                let updateEmailResult = await dispatch(fetchUpdateEmail({ username, email })).unwrap()
                console.log('updateEmailResult from unwrap = ', updateEmailResult)

            }
            catch (error) {
                console.log('error from unwrap = ', error)
            }
            console.log("Submitted new email address")
        }

        setIsEmailEditable(!isEmailEditable)

    }
    const onLogout = async () => {
        // TODO: 將token無效化
        await AsyncStorage.removeItem("token")
        Alert.alert(
            'Are you sure you want to log out?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: () => {
                        dispatch(logout())
                        navigation.navigate('Login' as never)
                    }
                },
            ]
        );
    }

    const styles = StyleSheet.create({
        mainPage: {
            flex: 1,
            backgroundColor: "#F5F5F5"
        },
        title: {
            padding: 10,
            borderRadius: 10,
            fontSize: 22,
            marginLeft: 10
        },
        itemContainer: {
            width: "90%",
            height: "17%",
            backgroundColor: "white",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 15,
            marginTop: 5,
            marginBottom: 5,

        },
        leftContainer: {
            maxWidth: "100%",
            justifyContent: "space-around"
        },
        fieldHeader: {
            fontSize: 20,
            paddingLeft: 10,
            marginBottom: 10
        },
        fieldContentText: {
            paddingLeft: 10,
            fontSize: 16,
            padding: 10,
            fontWeight: 'bold',
            color: '#47b4b1'
        },
        inputField: {
            boxSizing: 'border-box',
            backgroundColor: "rgba(71, 180, 177, 0.3)",
            fontSize: 16,
            shadowColor: "#47b4b1",
            borderRadius: 10,
            minWidth: 270,
            maxWidth: 270,
            padding: 10,
            marginTop: 1
        },
        editBtn: {
            fontSize: 22,
            color: "#47b4b1"
        },
        BtnText: {
            fontSize: 20,
            paddingLeft: 10
        }
    });
    return (
        <SafeAreaView style={styles.mainPage}>
            {/* <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 25, paddingBottom: "1%" }}>Account</Text>
            </View> */}

            <Text style={styles.title}>Personal Profile</Text>

            <View style={{ alignItems: "center" }}>

                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.fieldHeader}>Username</Text>
                        <Text style={styles.fieldContentText}>{username}</Text>

                    </View>
                </View>


                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.fieldHeader}>Gender</Text>
                        {isGenderEditable ?
                            <ModalDropdown options={GENDERS} defaultValue={GENDERS[gender]} onSelect={(a) => { setGender(Number(a)) }}
                                style={styles.inputField} dropdownTextStyle={{ fontSize: 18 }} />
                            :
                            <View>
                                <Text style={styles.fieldContentText}>{GENDERS[gender]}</Text>
                            </View>
                        }
                    </View>
                    <View>
                        <Text>
                            {isGenderEditable ?
                                <FontAwesome name='check' onPress={changeGender} style={styles.editBtn} />
                                :
                                <FontAwesome name='pencil' onPress={changeGender} style={styles.editBtn} />}
                        </Text>
                    </View>
                </View>


                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.fieldHeader}>Mobile</Text>
                        {isMobileEditable ?
                            <TextInput keyboardType='numeric' maxLength={8} style={styles.inputField}
                                value={mobile!} onChangeText={setMobile}
                            />
                            :
                            (mobile ?
                                <Text style={styles.fieldContentText}>{mobile}</Text>
                                :
                                <View>
                                    <Text style={[styles.fieldContentText, { color: "red" }]}>(Update your mobile number)</Text>
                                </View>

                            )
                        }
                    </View>
                    <View>
                        <Text>
                            {isMobileEditable ?
                                <FontAwesome name='check' onPress={changeMobile} style={styles.editBtn} />
                                :
                                <FontAwesome name='pencil' onPress={changeMobile} style={styles.editBtn} />}
                        </Text>
                    </View>
                </View>


                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.fieldHeader}>Email Address</Text>
                        {isEmailEditable ?
                            <TextInput autoCapitalize='none' maxLength={30} style={styles.inputField}
                                value={email!} onChangeText={setEmail}
                            />
                            :
                            (email ?
                                <Text style={styles.fieldContentText}>{email}</Text>
                                :
                                <View>
                                    <Text style={[styles.fieldContentText, { color: "red" }]}>(Update your email address)</Text>
                                </View>
                            )
                        }
                    </View>
                    <View>
                        <Text>
                            {isEmailEditable ?
                                <FontAwesome name='check' onPress={changeEmail} style={styles.editBtn} />
                                :
                                <FontAwesome name='pencil' onPress={changeEmail} style={styles.editBtn} />}
                        </Text>
                    </View>
                </View>

            </View>

            <Text style={styles.title}>Options</Text>

            <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={[styles.itemContainer, { height: "30%" }]} onPress={onLogout}>
                    <Text style={styles.BtnText}>Logout</Text>
                    <Icon name='ios-exit-outline' size={28} color={"#47b4b1"} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}