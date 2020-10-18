/* ==========================================================================
** Pokemon Details Screen 
** 15/10/2020
** Alan Medina Silva
** ========================================================================== */



// --------------------------------------
// Imports
// --------------------------------------
    import React, { Component } from 'react';
    import { DetailsCard, DetailsHeader, Loader } from '../components'
    import HelperFunctions from '../shared/HelperFunctions';
    import PokedexDataService from '../services/PokedexDataService';
    import { View,  StyleSheet } from 'react-native';






// --------------------------------------
// Create Screen Component
// --------------------------------------

class PokemonScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            specieInfo: '',
            isLoaded: false
        }
    }


    componentDidMount() {
        const dataService = new PokedexDataService()
        const { species } = this.props.navigation.state.params;
        dataService.getPokemonSpecieDetails(species.url).then((speciesData) => {
            this.setState({ specieInfo: speciesData.flavor_text_entries[0].flavor_text, isLoaded: true })
        })
    }







    render() {
        const { isLoaded, specieInfo } = this.state;
        const { name, types, id, sprites, abilities, height, weight, stats,  } = this.props.navigation.state.params;
        console.log("PokemonScreen -> render -> this.props.navigation.state.params", this.props.navigation.state.params);
        const helper = new HelperFunctions();
        let pokType = helper.setPokemonBgColorAndType(types);

        let pokImage = sprites?.other["official-artwork"]?.front_default;
        if (!pokImage || pokImage == '') pokImage = sprites.front_default


        if (!isLoaded)
            return <Loader message={"Catching Pokemon"} />

        return (
            <View style={styles.container}>
                <DetailsHeader
                    pokemonName={name}
                    pokemonTypes={types}
                    pokemonID={id}
                    pokemonImage={pokImage}
                    headerColor={pokType.bgColor} />
                <DetailsCard pokemonAbilities={abilities} pokemonHeight={height} pokemonWeight={weight} pokemonStats={stats} specieInfo={specieInfo} />


            </View>
        );


    }



}








// --------------------------------------
// Export Screen
// --------------------------------------
export default PokemonScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
});