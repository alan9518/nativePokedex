/* ==========================================================================
** Details Page Header Component
** 16/10/2020
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Imports
// --------------------------------------
    import React from 'react';
    import {StyleSheet, View, Image, Text} from 'react-native';
    import HelperFunctions from '../../shared/HelperFunctions'
    import {globalStyles} from '../../shared/globalStyles'



// --------------------------------------
// Create Component
// --------------------------------------

const DetailsHeader = (props) =>  {

    const {pokemonName, pokemonID, pokemonTypes, pokemonImage, headerColor} = props
    
    const helper =  new HelperFunctions();
    const bgColorStyle = {backgroundColor : headerColor}

    return (
        <View style = {[styles.headerContainer, bgColorStyle]}>

            <View style = {styles.headerColumn}>
                <View style = {styles.innerRow}>
                    <Text style = {[globalStyles.titleH2, styles.pokemonName]}> {helper.capitalize(pokemonName)}  </Text>
                    <Text style = {styles.pokemonID}> #{helper.addZeros(pokemonID, 3)}  </Text>
                </View>

               

                <View style = {[styles.innerRow, styles.typeRow]}>
                    {
                        pokemonTypes && pokemonTypes.map((pokemonType) =>  {
                            return <Text style = {styles.typeText} key = {pokemonType.type.name}> {pokemonType.type.name} </Text>
                        })
                    }
                    
                </View>


              
                
                <View style = {[styles.innerRow,styles.centerRow, styles.imageRow ]}>
                    <Image  
                        source = {{uri:pokemonImage}}
                        style= {styles.cardImage}
                    /> 

                        <View >
                
                       
                    </View>
                </View>
            </View>

        </View>
            
        
    );
}

export default DetailsHeader;



const styles = StyleSheet.create({

    headerContainer: {

        flex: 1,
        width:'100%',
        justifyContent : 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        maxHeight : 300,
        // backgroundColor : '#FB6C6C',
        paddingVertical : 15,
        // borderBottomEndRadius : 20
    },

    innerRow :  {
        flexDirection : 'row',
        paddingHorizontal : 20,
        width : '100%',
        alignItems : 'center',
        justifyContent : 'space-between',
        
    },

    centerRow : {
        justifyContent : 'center'
    },

    imageRow: {
        marginTop : 'auto'
    },

    headerColumn : {
        flexDirection : 'column',
        // justifyContent : 'center',
        width : '100%',
        
        alignItems : 'stretch'
    },

    pokemonName : {
        color : '#fff',
        fontSize : 40,
        fontWeight : '500'
    },
    pokemonID : {
        color : '#fff',
        fontSize : 15
    },
    typeRow : {
        marginLeft : 10,
        justifyContent : 'flex-start'
    },
    typeText : {
        borderRadius : 25,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color : '#fff',
        padding : 5,
        marginRight : 5
    },
    cardImage: {
        marginTop : 'auto',
        width : 165,
        height: 165
        
    },
})