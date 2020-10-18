/* ==========================================================================
** Custom Card Container for each POkemon
** 15/10/2020
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
    import React from 'react';
    import HelperFunctions from '../../shared/HelperFunctions'
    import {StyleSheet, View, Image, Text} from 'react-native';

// --------------------------------------
// Create Card Component
// --------------------------------------
const PokemonCard = (props) => {

    const {pokemonData} = props;
    const {name, types ,id, sprites, url} = pokemonData;
    const helper =  new HelperFunctions();

    let pokType = helper.setPokemonBgColorAndType(types);
    let pokImage = sprites?.other["official-artwork"]?.front_default;
    if(!pokImage || pokImage == '' || pokImage === null) pokImage = sprites.front_default

    const bgColorStyle = {
        backgroundColor : pokType.bgColor
    }

   
    




    return (
        <View style = {styles.cardContainer}>
            <View  style={[styles.cardContent, bgColorStyle]} >
               {pokImage && <Image  
                    source = {{uri:pokImage}}
                    style= {styles.cardImage}/> }
                <View style= {styles.circle}></View>
                <Text style={styles.pokeID}> #{helper.addZeros(id, 3)} </Text>
                <Text style={styles.pokeName}> {helper.capitalize(name)} </Text>
                <Text style = {styles.pokeType}> {helper.capitalize(pokType.typeName)} </Text>
            </View>
        </View>
    );
}




// --------------------------------------
// Export Component
// --------------------------------------
export default PokemonCard;




// --------------------------------------
// Create Styles
// --------------------------------------
const styles = StyleSheet.create({
    cardContainer : {
        position: 'relative',
        height: 300,
        width: 185,
        margin : 10,
        shadowColor: "rgba(100, 100, 100, 0.5)",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,  
        elevation: 5,
        borderRadius: 20,        
    },
    cardContent : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',        
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 20,

    },
    cardImage: {
        width : 165,
        height: 165
        
    },
    circle: {
        // padding:65,
        position:'absolute',
        backgroundColor:'rgba(255, 255, 255, 0.5)',
        borderRadius:50,
        top:'6%',
        // zIndex:-1,
    },
    pokeID : {
        marginTop: 10,
        borderRadius: 20,
        padding: 5,
        color : '#fff',
        // // fontSize: '1.1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    pokeName : {
        fontWeight : 'bold',
        color : '#fff',
        fontSize : 18,
        textAlign: 'center'
    },
    pokeType : {
        color : '#fff'
    }
})