import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GroupItem from './GroupItem';
import {useIsFocused} from '@react-navigation/native';
import {REACT_APP_API_SERVER} from '@env';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Groups() {
  const userIdInRedux = useSelector((state: RootState) => state.user.userId);

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
      opacity: 0.8,
    },
    header: {
      height: '14%',
      alignItems: 'center',
      marginBottom: '10%',
      width: '100%',
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
    progressBar: {
      position: 'absolute',
      marginTop: 130,
    },
    line: {
      height: 5,
      width: 200,
    },
    circleWrapper: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 40,
      borderRadius: 20,
      position: 'absolute',
    },
    circleFilled: {
      backgroundColor: '#f79f24',
    },
    circleUnfilled: {
      backgroundColor: 'white',
      borderWidth: 6,
      borderStyle: 'solid',
      borderColor: '#e1e0e1',
    },
    caption: {
      position: 'absolute',
      fontWeight: 'bold',
      color: '#939493',
      top: 21.5,
    },
  });
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  const [groupItemList, setGroupItemList] = useState([]);
  useEffect(() => {
    const loadGroupList = async () => {
      try {
        console.log('loadGroupList...');
        const response = await fetch(
          `${REACT_APP_API_SERVER}/groups/getGroups/`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              userID: userIdInRedux,
            }),
          },
        );

        let json = [];
        if (response) {
          json = await response.json();
        }
        // console.log(json);
        setGroupItemList(json);
      } catch (error) {
        console.log('error', error);
      }
    };
    if (isFocused) {
      loadGroupList();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 25, paddingBottom: '1%'}}>Groups</Text>
      </View>

      <ScrollView style={{backgroundColor: '#F5F5F5'}}>
        {groupItemList.map((item: any, idx: number) => (
          <GroupItem items={item} key={idx} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          navigation.navigate('Create Group' as never);
        }}>
        <Text style={styles.floatButtonFontSize}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
