/* ==========================================================================
** Pagination
** 17/10/2020
** Alan Medina Silva
** ========================================================================== */



// --------------------------------------
// Imports
// --------------------------------------
    import React from 'react';
    import { StyleSheet, View, Image, Text, Button, TouchableOpacity } from 'react-native';

// --------------------------------------
// Create Card Component
// --------------------------------------
    const Pagination = (props) => {

        const { prevUrl, nextUrl, onItemClick } = props;
        
        
        return (

            <View style = {styles.paginationContainer}>

                {
                    prevUrl && <TouchableOpacity onPress={() => {onItemClick(prevUrl)}}>
                                    <Text style ={styles.paginationItem}> Prev Page  </Text>  
                                </TouchableOpacity>
                }

            {
                nextUrl &&  <TouchableOpacity onPress={ () => {onItemClick(nextUrl)}}>
                                    <Text style ={[styles.paginationItem, {marginLeft : 'auto'}]}>Next Page  </Text>  
                                </TouchableOpacity>
            }

            </View>
        )

    }



// --------------------------------------
// Export Component
// --------------------------------------
    export default Pagination;




// --------------------------------------
// Create Styles
// --------------------------------------
const styles = StyleSheet.create({
    paginationContainer: {
        position: 'relative',
        width: '100%',
        flexDirection : 'row',
        justifyContent : 'space-around',
        backgroundColor : '#ef5350',
        padding : 10
    },
    paginationItem : {
        fontSize : 18,
        color : '#fff'
    }


    
})