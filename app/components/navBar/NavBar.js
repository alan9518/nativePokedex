/* ==========================================================================
** Header NavBar Component
** 15/10/2020
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, SafeAreaView, View } from 'react-native';



// --------------------------------------
// Create App Component
// --------------------------------------
const Header = (props) => {

  const {navigation} = props;
  

  return (
    <SafeAreaView style={styles.header}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />
    </SafeAreaView>
  );
};

Header.defaultProps = {
  title: 'Pokemon',
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    position : 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    width: 150, 
    height: 55,
  }
});

export default Header;


// --------------------------------------
// Export Component
// --------------------------------------
