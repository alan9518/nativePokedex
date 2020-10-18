/* ==========================================================================
** Appliction API Ennpoints to consume
** 16/10/2020
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// API Base Path
// --------------------------------------
    const path = 'https://pokeapi.co/api/v2';
// --------------------------------------
// Create Endpoints Object
// --------------------------------------
    export const Endpoints = {

        /** --------------------------------------
        // Get All Pokemons
        // @param {offset <String>}
        // @param {limit <String>}
        // --------------------------------------*/
        getPokemons : `${path}/pokemon`,

        /** --------------------------------------
        // Get Pokemon Species Data
        // @param {/id <String>}
        // --------------------------------------*/
        getPokemonSpecie : `${path}/pokemon-species`
    }