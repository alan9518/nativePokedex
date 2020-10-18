/* ==========================================================================
** POkedex Data Service Class
** Consume PokeApi
** 16/10/2020
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
import axios from 'axios';
import { Endpoints } from './Endpoints';


export default class PokedexDataService {


    // --------------------------------------
    // GET all Pokemons
    // --------------------------------------
    getAllPokemonsNames(serviceURL = "", limit = 50) {

        return new Promise((resolve, reject) => {

            let url = serviceURL !== "" ? serviceURL : Endpoints.getPokemons
            axios.get(url, { params: { limit: limit } }).then((response) => {

                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject('Error retrieving list content');
                }
            }).catch((error) => {
                console.log("PokedexDataService -> getAllPokemonsNames -> error", error);
                reject('Error requesting list content data');
            });

        });
    }

    // --------------------------------------
    // GET Pokemon Details
    // --------------------------------------

    getPokemonDetails(pokemonID, useFullURL = true) {

        return new Promise((resolve, reject) => {

            let serviceURL = useFullURL === true ? pokemonID : `${Endpoints.getPokemons}/${pokemonID}`

            return axios.get(serviceURL).then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject('Error retrieving Pokemon Item');
                }
            }).catch((error) => {
                console.log("PokedexDataService -> getAllPokemonsNames -> error", error);
                reject('Error retrieving Pokemon Item');
            });

        });

    }

    // --------------------------------------
    // GET Pokemon Species Info
    // --------------------------------------
    getPokemonSpecieDetails(pokemonSpecie) {
        return new Promise((resolve, reject) => {

            return axios.get(pokemonSpecie).then((response) => {
                if (response.status === 200) {
            
                    resolve(response.data);
                } else {
                    reject('Error retrieving Pokemon Item');
                }
            }).catch((error) => {
                console.log("PokedexDataService -> getAllPokemonsNames -> error", error);

                console.log("getPokemonSpecieDetails -> endpoint", `${Endpoints.getPokemonSpecie}/${pokemonID}`);
                reject('Error Rejectx: retrieving Pokemon Item');
            });

        });
    }



}

