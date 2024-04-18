import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Appnavigation from './appnavigation/Appnavigation'
import SplashScreen from 'react-native-splash-screen'

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  })
  return (
    <Appnavigation />
  )
}

