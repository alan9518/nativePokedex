/* ==========================================================================
** Pokedex App entry Point
** 14/10/2020
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Imports
// --------------------------------------

  import React, { useState, useEffect } from 'react';
  import Navigator from './app/routes/AppStack'
  import * as Font from 'expo-font';
  import { AppLoading } from 'expo';
  import NetInfo from '@react-native-community/netinfo';
  import { StyleSheet, Text, View, SafeAreaView, Dimensions, Alert  } from 'react-native';


  const { height, width } = Dimensions.get('screen')







// --------------------------------------
// Load Custom Fonts
// -------------------------------------- 
  const getFonts = () => {
    return Font.loadAsync({
      'Montserrat-Medium': require('./app/assets/fonts/Montserrat-Medium.ttf'),
      'OpenSans-Regular': require('./app/assets/fonts/OpenSans-Regular.ttf')
    })
  }

// --------------------------------------
// Create App Component
// --------------------------------------
  export default function App() {

    const [fontsLoaded, setFontsLoaded] = useState(false);

    const [isConnected, setIsConnected] = useState(true);
    

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
      });
      return () => {
        unsubscribe();
      };
    }, []);

  
    console.log("App -> isConnected", isConnected);

    isConnected === false && Alert.alert( 'No Internet Connection', 'It Seemts that your device is not connected to the Network, but you can still the 50 latest pokemons',
      [
        
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
    

    if (fontsLoaded)
      return  <Navigator style={styles.container} />  
    else
      return <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />

  }






// --------------------------------------
// Define App Styles
// --------------------------------------
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: height
    },
  });
