import { SafeAreaView, ScrollView, StyleSheet, useColorScheme, Text, TextInput, TouchableOpacity, View, Alert, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from "react-native-slider";
import Store from './Store';
import Appnavigation from '../appnavigation/Appnavigation';
import { Dimensions } from 'react-native';
const {height,width}=Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Yup from 'yup'
import { Formik } from 'formik';


const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .typeError('Length should be a number')
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required')
})

export default function Home() {
  
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)
  const [firstTime, setFirstTime] = useState(true)
  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [passwordLength, setPasswordLength] = useState(4); // Set initial password length to 4
 const navigation = useNavigation();
  useEffect(() => {
    // Generate password when component mounts
    if(!firstTime){
      generatePasswordString(passwordLength);
    }
   
  }, []); // Add empty dependency array to run the effect only once

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
    setFirstTime(false);
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * (characters.length - 1)); // Adjusted to prevent index out of range
      result += characters.charAt(characterIndex)
    }
    return result;
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
    setPasswordLength(4); // Reset password length to 4
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={{backgroundColor: '#1f2937'}}>
        <StatusBar backgroundColor='#ff8503' barStyle='light-content' />
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.titlecard}>
          <Text style={[styles.title, styles.WhiteText ]}>Password Generator</Text>
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ passwordLength: '4' }}
            validationSchema={passwordSchema}
            onSubmit={values => {
              generatePasswordString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper1}>
                  <View style={styles.inputColumn}>
                    <Text style={[styles.heading,  styles.WhiteText]}>Choose Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    placeholderTextColor='gray'
                    keyboardType='numeric'
                  />
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                  <Slider
                    value={passwordLength} // Use passwordLength state here
                    onValueChange={(value) => {
                        setPasswordLength(value); // Update password length state
                        handleChange('passwordLength')(value.toString());
                      }}
                    minimumValue={4}
                    maximumValue={16}
                    step={1}
                    minimumTrackTintColor="#fde047"
                    maximumTrackTintColor="#ff8503"
                    thumbTintColor=  'white'
                    thumbTouchSize={{ height: 10, width: 10 }}
                    trackStyle={{ height: 5, borderRadius: 10, width: 300, }}
                  />
                </View>

                <View style={styles.includes}>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>+ Include lowercase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>+ Include Uppercase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#FED85D"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>+ Include Numbers</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#C9A0DC"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>+ Include Symbols</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#FC80A5"
                    />
                  </View>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card]}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginBottom: 20 }}>
              <Text style={[styles.subTitle,styles.WhiteText ]}>Generated Password:</Text>
              {(lowerCase && upperCase && numbers && symbols) ? (
                <Text style={{ color: 'green', textAlign: 'center', fontSize: 16, marginHorizontal: 8 }}>Strong</Text>
              ) : ((lowerCase && upperCase && numbers) || (lowerCase && upperCase && symbols) || (symbols && upperCase && numbers) || (lowerCase && symbols && numbers)) ? (
                <Text style={{ color: 'green', textAlign: 'center', fontSize: 16, marginHorizontal: 8 }}>Strong </Text>
              ) : ((lowerCase && upperCase) || (lowerCase && numbers) || (lowerCase && symbols) || (upperCase && numbers) || (upperCase && symbols) || (symbols || numbers)) ? (
                <Text style={{ color: '#b3b300', textAlign: 'center', fontSize: 16, marginHorizontal: 8 }}> Medium </Text>
              ) : (
                <Text style={[styles.description]}>Weak</Text>
              )}</View>
            <View style={{flex:1,flexDirection:'row',alignContent:'center'}}>
            <View style={{flexGrow:1}}>
                <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Store', {  password })}>
                <Text style={[styles.generatedPassword,{backgroundColor:'#CAD5E2'}]} > Save </Text>
            </TouchableOpacity>
            </View>
            
            
            


          </View>
        ) : null}
        <TouchableOpacity style={{width:width*0.8,alignSelf:'center'}} onPress={() => navigation.navigate('Store',{password})}>
                <Text style={[styles.generatedPassword,{backgroundColor:'#CAD5E2'}]}>Saved Passwords</Text>
            </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  WhiteText: {
    color: 'white',
  },
  BlackText: {
    color: 'black',
  },
  appContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    padding: 15,
    fontFamily: 'Helvetica Neue Bold',
    color: '#fff',
  },
  titlecard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff8503',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  heading: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    fontFamily: 'System',
  },
  inputWrapper1: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    gap: 10,
   marginVertical: 6
  },
  includes: {
    marginVertical: 5,

    padding: 5,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorcontainer: {
    backgroundColor: '#ffcccc',
  },
  inputWrapper: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#e6f7ff',
    padding: 10,
    borderRadius: 8,
  },
  inputColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputStyle: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '25%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#004466',
    backgroundColor: '#e6f7ff',
    color: 'black',
    fontSize: 18,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical:4,
    marginBottom: 20,
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#ca8a04',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    padding: 4,
    fontSize: 18,
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '700',
    padding: 4,
    fontSize: 18,
  },
  card: {

    padding: 12,
    borderRadius: 6,
    marginHorizontal: 20,
    
    width: '88%',
  },
  
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 5,
    color: '#000',
    
    padding: 10,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: '#ca8a04',
    marginHorizontal:  4,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: 'white',
  },
  description: {
    color: 'red',
    marginHorizontal: 8,

    fontSize: 16,

    textAlign: 'center',

  },
});
