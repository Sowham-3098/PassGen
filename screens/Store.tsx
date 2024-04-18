import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const {height,width}=Dimensions.get('window');


export default function Store(props) {
  let password = props.route.params.password || null;
  const [passwordItem, setPasswordItem] = useState({password});
  const [passwordList, setPasswordList] = useState([]);
  const [passwordTitle, setPasswordTitle] = useState('');
  const navigation =useNavigation();
  useEffect(() => {
    loadPasswordList();
  }, []);

  const loadPasswordList = async () => {
    try {
      const storedPasswords = await AsyncStorage.getItem('passwordList');
      if (storedPasswords !== null) {
        setPasswordList(JSON.parse(storedPasswords));
      }
    } catch (error) {
      console.error('Error loading password list:', error);
    }
  };

  const savePassword = async () => {
    if(!passwordTitle) return Alert.alert('Error', 'Please enter a title for the password');
    if(!password) return Alert.alert('Error', 'Please generate a password before saving');
    try {
      const newPassword = {
        title: passwordTitle,
        password: password,
        dateTime: new Date().toLocaleString(),
      };
      const updatedPasswordList = [...passwordList, newPassword];
      await AsyncStorage.setItem(
        'passwordList',
        JSON.stringify(updatedPasswordList)
      );
      setPasswordList(updatedPasswordList);
      setPasswordTitle('');
    } catch (error) {
      console.error('Error saving password:', error);
    }
  };

  const deletePassword = async (index) => {
    try {
      const updatedPasswordList = passwordList.filter(
        (_, i) => i !== index
      );
      await AsyncStorage.setItem(
        'passwordList',
        JSON.stringify(updatedPasswordList)
      );
      setPasswordList(updatedPasswordList);
    } catch (error) {
      console.error('Error deleting password:', error);
    }
  };

  const renderPasswordItem = ({ item, index }) => (
    <View style={styles.passwordItem}>
      <View style={{gap:8}} >
        <View >
        <Text selectable={true} style={{color: "black",fontSize: 18,fontWeight:'bold'}}>{item.title}</Text>
        <Text selectable={true} style={{color: "black",fontSize: 16}}>Password : {item.password}</Text>
        </View>
        
        <Text style={styles.passwordDateTime}>{item.dateTime}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            'Delete Password',
            'Are you sure you want to delete this password?',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              { text: 'OK', onPress: () => deletePassword(index) },
            ]
          );
        }}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={{ backgroundColor: '#1f2937' }}>
      <StatusBar backgroundColor='#ff8503' barStyle='light-content' />
      <View style={styles.titlecard}>
       
        <Text style={[styles.title, styles.WhiteText]}>Saved Passwords</Text>
      </View>
      <View style={{ flex: 1 }}>
       
       
        <FlatList
          data={passwordList}
          renderItem={renderPasswordItem}
          keyExtractor={(item, index) => index.toString()}
          style={{maxHeight:height*0.58}}
          inverted
        />
         <View style={{marginTop:15,marginBottom:10}}>
            <Text style={{color: 'white', fontSize: 22,textAlign:'center', fontWeight: 'bold',padding:8,borderRadius:10, marginHorizontal: 15, marginVertical: 5,}}>Save Your Password with Title</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <TextInput
            style={styles.textInput}
            placeholder="Password Title"
            placeholderTextColor="gray"
            onChangeText={setPasswordTitle}
            value={passwordTitle}
          />
        
          <TouchableOpacity
            style={styles.addButton}
            onPress={savePassword}
          >
            <Text style={styles.WhiteText}>Add</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
            style={{marginHorizontal:15,backgroundColor: '#ff8503',padding:10,borderRadius:20,width:width*0.5,alignSelf:'center',
                marginTop:10
             } }
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={{color: 'white', fontSize: 25,textAlign:'center'}}>Generate Another</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  WhiteText: {
    color: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    padding: 15,
    fontFamily: 'Helvetica Neue Bold',
    color: '#fff',
  },
  titlecard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff8503',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: 'white',
    width: '70%',
    color: 'black',
    fontSize: 15,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#ff8503',
    width: '15%',
    height: 50,
    padding: 10,
    borderRadius: 5,
    marginRight: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  passwordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordDateTime: {
    fontSize: 14,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: '#c2410c',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});
