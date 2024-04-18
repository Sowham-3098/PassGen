import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home'
import Store from '../screens/Store'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Appnavigation = () => {
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
    <Stack.Screen name="Store" component={Store} options={{headerShown:false}}/>

  </Stack.Navigator>
  </NavigationContainer>

  )
}

export default Appnavigation