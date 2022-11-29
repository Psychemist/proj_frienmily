#icon installation

npm install -g react-native-cli
yarn add react-native-elements
yarn add react-native-vector-icons

Added "Assets" folder in root project folder
Added "Fonts" folder in "Assets" folder
Drag all .ttf (e.g. AntDesign.ttf, FontAwesome.ttf) from "./node_modules/react-native-vector-icons/Fonts" into the "Fonts" folder

Created "react-native.config.js" in root project folder
Added the following code inside module.exports:

module.exports = {
    project: {
        ios:{},
        android:{}
    },
    assets:['./assets/fonts/'],
}

Then run:
npx react-native-asset

So you can use it now:
import FontAwesome from 'react-native-vector-icons/FontAwesome' 

<View style={styles.container}>
            <FontAwesome name='trophy' />
            <View ><Text style={styles.text}>USER NAME</Text></View>
            <View><Text style={styles.text}>owns you HKD $200.00</Text></View>
            <FontAwesome name='trophy' />
        </View>


Louie notes:
all of them should add friends tgt when creating groups 


<div class="restaurant-image"><img class="portrait-crop" alt="Qries" src="${cardData.shop_photo}"></div>