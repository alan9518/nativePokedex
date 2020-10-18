/* ==========================================================================
** Welcome Screen 
** 15/10/2020
** Alan Medina Silva
** ========================================================================== */



// --------------------------------------
// Imports
// --------------------------------------

import React, { Component, Fragment } from 'react';
import PokedexDataService from '../services/PokedexDataService'
import { PokemonCard, Pagination, Loader } from '../components';
import AsyncStorage from '@react-native-community/async-storage';
import { Searchbar } from 'react-native-paper';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';




// --------------------------------------
// Create Class Component
// --------------------------------------
class PokedexScreen extends Component {

    //? --------------------------------------
    //? Constructor
    //? --------------------------------------   
    constructor(props) {
        super(props);
        this.state = {
            pokedexData: [],
            currentData: [],
            nextUrl: '',
            prevUrl: '',
            searchQuery: '',
            resetPagination : false,
            isLoaded: false
        }
        this.searchRef = React.createRef();

    }



    // ?--------------------------------------
    // ? Get Values from the API
    // ?--------------------------------------
    async componentDidMount() {

        this.loadAPI();
    }





    // ?--------------------------------------
    // ? Load all pokemons
    // ? call it withour params to get the 
    // ? first 50 pokemons, use params to 
    // ? filter or paginate
    // ?--------------------------------------

    async loadAPI(serviceUrl = "", limit = 50, filterValues = false, filterText = "", searchID = false) {

        const dataService = new PokedexDataService();
        const pokedexData = await dataService.getAllPokemonsNames(serviceUrl, limit)
        let pokemonsDetailsData = []
        // let resetPagination  = false;

        if (filterValues === true ) {
            const filteredData = pokedexData.results.filter((pok) => {

                if(searchID === true) {
                    return pok.url.indexOf(`/${filterText}/`) >= 0                }

                 else 
                    return pok.name.indexOf(filterText) >= 0 
            })
            console.log("PokedexScreen -> loadAPI -> filteredData", filteredData);
            
            pokemonsDetailsData = await this.getPokemonDetails(dataService, filteredData);
            
        }
        else
            pokemonsDetailsData = await this.getPokemonDetails(dataService, pokedexData.results);


        //? Reset next Pagination
        let nextPageUrl = pokedexData.next;

        this.setState({
            pokedexData: pokemonsDetailsData,
            nextUrl: nextPageUrl,
            prevUrl: pokedexData.previous,
            resetPagination : false,
            isLoaded: true
        })



        
    }



    //? --------------------------------------
    //? Get Single Pokemon
    //? --------------------------------------
    async getPokemonDetails(dataService, pokemonsData) {
        // Merge Pokemons And Types
        const pokemonsLinksArray = pokemonsData.map((pokemon) => { return pokemon.url });
        const promisesArray = pokemonsLinksArray.map(url => dataService.getPokemonDetails(url));


        try {
            const pokemonDetails = (await Promise.all(promisesArray)).map(res => res)
            return pokemonDetails;
        }
        catch (error) {
            console.error(error)
            return [];
        }
    }



    // ?--------------------------------------
    // ? Filter By ID
    // ?--------------------------------------
    async filterPokemonByID(pokemonID)  {
        const dataService = new PokedexDataService();
        const pokemonDetails = await dataService.getPokemonDetails(pokemonID, false)
        console.log("PokedexScreen -> filterPokemonByID -> pokemonDetails", pokemonDetails);

        const { navigation } = this.props
        navigation.navigate('PokemonDetails', { ...pokemonDetails })

        // this.setState({
        //     pokedexData: pokemonDetails,
        //     resetPagination : true,
        //     isLoaded: true
        // })

    }


    // ?--------------------------------------
    // ? Save Values on Local DB
    // ?--------------------------------------
    storeData = async (value) => {
        const { pokedexData } = this.state;
        console.log("PokedexScreen -> storeData -> pokedexData", pokedexData);
        try {
            await AsyncStorage.setItem('local_Pokedex', JSON.stringify(pokemonData))
        } catch (e) {
            console.log("PokedexScreen -> storeData -> e", e);
            
        }
    }

    // ?--------------------------------------
    // ? Retrieve Values on Local DB
    // ?--------------------------------------

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('local_Pokedex')

            if(jsonValue !== null)
                alert(Json.stringify(jsonValue))

            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log("PokedexScreen -> getData -> e", e);
            // error reading value
        }
    }


    // ?--------------------------------------
    // ? Function to control Pagination
    // ?--------------------------------------
    onPaginationItemClick = (pageUrl) => {
        this.goToNextPage(pageUrl)

    }


    // ?--------------------------------------
    // ? Change View to Pokemon Details
    // ?--------------------------------------
    openPokemonCardOnClick = (pokemonItem) => {
        const { navigation } = this.props
        navigation.navigate('PokemonDetails', { ...pokemonItem })
    }


    // ?--------------------------------------
    // ? Change Page
    // ? GET items from API
    // ?--------------------------------------
    goToNextPage = async (pageToNavigate) => {
        this.setState({ isLoaded: false })
        await this.loadAPI(pageToNavigate);
    }


    


    // ?--------------------------------------
    // ? Search Bar controller
    // ? Reset Items when empty
    // ?--------------------------------------
    onChangeSearch = (query) => {

        if (query.length === 0 && this.state.currentData.length > 0) {
            const { currentData } = this.state;
            this.setState({ searchQuery: query, pokedexData: currentData, currentData: [], nextUrl : 'https://pokeapi.co/api/v2/pokemon?offset=50&limit=50' })
        }
        else
            this.setState({ searchQuery: query })




    }

    // ?--------------------------------------
    // ? Input Submit event, filter pokemons
    // ? from the API
    // ?--------------------------------------

    filterPokemons = async (event) => {

        const { searchQuery, pokedexData } = this.state;
        let isnum = /^\d+$/.test(searchQuery);
        if (searchQuery.length < 3 && isnum === false )
            return


        
        this.setState({ isLoaded: false, currentData: pokedexData })
        // if(isnum === true)
            // await this.filterPokemonByID(searchQuery);
        // else
            await this.loadAPI('', 1050, true, searchQuery.toLowerCase(), isnum);

    }



    // ?--------------------------------------
    // ? Render Component
    // ?--------------------------------------

    render() {
        const { pokedexData, isLoaded, nextUrl, prevUrl, searchQuery } = this.state;

        if (!isLoaded)
            return <Loader message={"We are Catching'em all, please wait"} />

        return (

            <React.Fragment>

                <Searchbar
                    placeholder="Search Pokemon"
                    style={styles.searchBar}
                    onChangeText={this.onChangeSearch}
                    ref={this.searchRef}
                    value={searchQuery}
                    onSubmitEditing={this.filterPokemons}
                />

                <FlatList
                    style={styles.container}
                    data={pokedexData}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <TouchableOpacity onPress={this.openPokemonCardOnClick.bind(this, item)}>
                                <PokemonCard pokemonData={item} />
                            </TouchableOpacity>
                        </View>

                    )}

                    numColumns={2}
                    keyExtractor={(item) => item.name}
                />


                <Pagination prevUrl={prevUrl} nextUrl={nextUrl} onItemClick={this.onPaginationItemClick} />



            </React.Fragment>


        )

    }



}

export default PokedexScreen;



const styles = StyleSheet.create({

    scrollView: {

        flex: 1,
        width: '100%',
        height: '100%',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    searchBar: {
        fontSize: 24,
        padding: 10,
        width: '100%',
        height: 50,

    },
})