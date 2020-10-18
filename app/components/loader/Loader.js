/* ==========================================================================
** Loading Screen Component
** 17/10/2020
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { globalStyles } from '../../shared/globalStyles'


// --------------------------------------
// Create Component
// --------------------------------------

const Loader = (props) => {

    const { message } = props;
    return (
        <View style={styles.loaderContainer}>
            <Text style={[styles.loaderText, globalStyles.titleH1]}> {message} </Text>
            <Image style={styles.loaderImage} source={require('../../assets/splash.png')} />
        </View>


    );
}

export default Loader;



const styles = StyleSheet.create({

    loaderContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    loaderText: {
        fontSize: 20,
        textAlign: 'center'
    },
    loaderImage: {
        width: 150,
        height: 150

    }
})