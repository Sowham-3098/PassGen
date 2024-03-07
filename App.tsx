import { SafeAreaView, ScrollView, StyleSheet, useColorScheme, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

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
export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setupperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

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

    const passwordResult = createPassword(characterList, passwordLength)

    setPassword(passwordResult)
    setIsPassGenerated(true)

  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
    console.log("Sowham");

  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setupperCase(false)
    setNumbers(false)
    setSymbols(false)


  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.titlecard}>
          <Text style={[styles.title, isDarkMode ? styles.WhiteText : styles.BlackText]}>Password Generator</Text>
        </View>
        <View style={styles.formContainer}>


          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}
            onSubmit={values => {
              console.log(values);
              generatePasswordString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,

            }) => (
              <>
                <View style={styles.inputWrapper1}>
                  <View style={styles.inputColumn}>
                    <Text style={[styles.heading, isDarkMode ? styles.WhiteText : styles.BlackText]}>Enter Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>


                    )}
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>


                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    placeholderTextColor={isDarkMode ? 'white' : 'black'}
                    keyboardType='numeric'
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
                      onPress={() => setupperCase(!upperCase)}
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
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}

                  >
                    <Text style={styles.primaryBtnTxt}>Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState()
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
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Generated Password:</Text>
            {/* <Text style={styles.description}>Long Press to copy</Text> */}
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
            {lowerCase && upperCase && numbers && symbols ? (
              <Text style={{ color: 'green', margin: 8, }}>⚔️ Master ⚔️ level achieved! Your password is a digital fortress. </Text>
            ) : (lowerCase && upperCase && numbers) || (lowerCase && upperCase && symbols) || (symbols && upperCase && numbers) || (lowerCase && symbols && numbers) ? (
              <Text style={{ color: 'blue', margin: 8, }}>Strong ✅ </Text>
            ) : (lowerCase && upperCase) || (lowerCase && numbers) || (lowerCase && symbols || (upperCase && numbers) || (upperCase && symbols) || (symbols || numbers)) ? (
              <Text style={{ color: '#b3b300', margin: 8, }}> Medium ⚠️ </Text>
            ) : lowerCase ? (
              <Text style={styles.description}>Weak ❌</Text>
            ) : upperCase ? (
              <Text style={styles.description}>Weak ❌</Text>
            ) : numbers ? (
              <Text style={styles.description}>Weak ❌</Text>
            ) : symbols ? (
              <Text style={styles.description}>Weak ❌</Text>
            ) : null}
          </View>
        ) : null}
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
    backgroundColor: '#5DA3FA',
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
    marginTop: 15,
    marginBottom: 20,



  },
  includes: {
    marginVertical: 8,
    backgroundColor: '#b3e6ff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,

  },
  errorcontainer: {
    backgroundColor: '#ffcccc',
  },
  inputWrapper: {
    marginVertical: 8,
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
    borderRadius: 4,
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
    marginVertical: 15,

  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#006699',
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
    marginHorizontal: 12,
    marginVertical: 12,
  },
  cardElevated: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#002233',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 5,
    color: '#000',
    borderWidth: 1,
    borderColor: '#002233',
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#66cc99',

  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#004466',
  },
  description: {
    color: 'red',
    marginBottom: 8,
    marginTop: 8,
    alignItems: 'center',
  },
});


