import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImageViewer from 'react-native-image-zoom-viewer';

export default function ImagePreview() {

    const route = useRoute<any>()
    let image = route.params.image || ''

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true);

    const images = [{
        url: image,

        // Optional, if you know the image size, you can set the optimization performance

        // You can pass props to <Image />.
        props: {
            headers: "hello",
            swipeDownThreshold: 10
            // onSwipeDown={closeModal}
            // backgroundColor: 'white'
        },

    }]

    const styles = StyleSheet.create({
        header: {
            height: "14%",
            alignItems: "center",
            width: "100%",
        },
        text: {
            fontSize: 30,
        },
        backButton: {
            position: 'absolute',
            left: 0,
            paddingLeft: '20%',
            fontSize: 25,
        },
        groupNameWrapper: {
            position: "absolute",
            top: 120,
            padding: '1%'
        },
        addMoreText: {
            fontSize: 15,
            padding: 5,
            color: '#47b4b1',
        },

        totalText: {
            fontSize: 15,
            textAlign: 'right',
            padding: 20,
        },

        buttonText: {
            fontSize: 20,
            fontWeight: '300',
            color: 'white',
        },
        scrollWrapper: {
            width: "98%",
            height: 500,
            paddingHorizontal: 5,
        },
        receiptBtn: {
            backgroundColor: '#47b4b1',
            height: 40,
            width: 360,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            borderRadius: 15,
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'white',
        },
    })

    return (
        // <SafeAreaView style={{ flex: 1, alignItems: 'center', position: "relative" }}>



        //     <ScrollView style={styles.scrollWrapper}>
        //         <View style={{ alignItems: 'center' }}><Image source={{ uri: image }}
        //             style={{ width: 300, height: 300, marginRight: 20 }} /></View>
        //     </ScrollView>
        //     <Modal animationType="slide" visible={true} transparent={true} onDismiss={() => console.log(123123)}>
        //         <View style={styles.header}>
        //             <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        //                 <FontAwesome name='angle-left' size={35} />
        //             </TouchableOpacity>
        //             <Text style={styles.text}>Receipt Image</Text>
        //         </View>
        //         <ImageViewer style={{ marginTop: "40%" }} imageUrls={images} />
        //         <TouchableOpacity onPress={() => navigation.goBack()}>
        //             <Text>HELLLOO</Text>

        //         </TouchableOpacity>
        //     </Modal>

        // </SafeAreaView>

        <Modal animationType="fade" visible={true} transparent={true} onDismiss={() => console.log(123123)}>

            {/* <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome name='angle-left' size={35} />
                </TouchableOpacity>
                <Text style={styles.text}>Receipt Image</Text>
            </View> */}
            <ImageViewer backgroundColor={"white"} imageUrls={images} />
            <View style={{ backgroundColor: 'white', paddingBottom: '8%' }} >
                <TouchableOpacity
                    style={styles.receiptBtn}
                    onPress={() => { navigation.goBack() }}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}