import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import {NavBar} from  '../components'
import {PokedexScreen, PokemonScreen} from  '../screens'



// import Home from '../screens/home';
// import ReviewDetails from '../screens/reviewDetails';

const screens = {
  Home: {
    screen: PokedexScreen,
  },
  PokemonDetails: {
    screen: PokemonScreen,
    
  }
 
}


// home stack navigator screens
const AppNavigationStack = createStackNavigator(screens, {
    defaultNavigationOptions : ({ navigation}) => {
        return {
            headerStyle : {backgroundColor : '#ef5350'},
            headerTitle: ()=><NavBar navigation = {navigation}/> 
        }
       
    }
});

export default createAppContainer(AppNavigationStack);
