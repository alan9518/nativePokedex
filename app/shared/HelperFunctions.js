/* ==========================================================================
** POkedex Data Service Class
** Consume PokeApi
** 16/10/2020
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------



export default class HelperFunctions {


    /// ?--------------------------------------
    // ? Capitalize first Letter
    // ?--------------------------------------
    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }


    // ?--------------------------------------
    // ? Function to extract the first type
    // ? And define the BG Color of the card
    // ?--------------------------------------
    setPokemonBgColorAndType = (typesArray) => {

        const colors = {
            grass: "#48D0B0",
            poison: "#f7cdf7",
            fire: "#FB6C6C",
            flying: "#eae3ff",
            water: "#76BDFE",
            bug: "#e0e8a2",
            normal: "#e6e6c3",
            electric: "#FFD86F",
            ground: "#e0ccb1",
            fighting: "#fcada9",
            psychic: "#ffc9da",
            rock: "#f0e09c",
            fairy: "#ffdee5",
            steel: "#e6eaf0",
            ice: "#e8feff",
            ghost: "#dbbaff",
            dragon: "#c4bdff",
            dark: "#a9abb0"
        };

        let mainType = typesArray[0];

        const {type} = mainType

        return {
            bgColor : colors[type.name],
            typeName : type.name
        }
    }


    addZeros = (number,length)=> {
     
        let numberWithZeros = '' + number;
        while (numberWithZeros.length < length) {
            numberWithZeros = '0' + numberWithZeros;
        }
           
        return numberWithZeros;
        
    }


    // ?--------------------------------------
    // ? Format Pokemon Stats
    // ? special =  SP
    // ? Remove '-'
    // ?--------------------------------------
    formatStatName = (statName) => {
        if(statName.indexOf('special-') < 0)
            return statName;
        
        let newStatName = statName.replace('special-', 'SP ');

        return newStatName
    }

    // ? --------------------------------------
    // ? Feets to Meters
    // ? --------------------------------------
    convertHeightToMeters = (sizeOnFeets)=> {
        return (sizeOnFeets/10).toFixed(2)
        // return (sizeOnFeets / 3.2808).toFixed(2);
    }

    // ? --------------------------------------
    // ? Pounds to Kg
    // ? --------------------------------------
    convertPoundsToKg = (weightOnPounds) => {
        return (weightOnPounds/2.2046).toFixed(2);
    }


    // ? --------------------------------------
    // ? Set Catch Rate
    // ? The base capture rate; up to 255
    // ? --------------------------------------
    
    setCatchRate = (catch_ratio) => {
        return Math.round((100 / 255) * catch_ratio);
    }

    // ? --------------------------------------
    // ? Split Array Data into single String
    // ? --------------------------------------
    splitArrayDataByName = (arrayData) => {
        const namesArray = arrayData.map((arrayItem)=>{return arrayItem.name});
		
        return namesArray.join(', ')
        
    }

    // ? --------------------------------------
    // ? Split Array Data into single String
    // ? --------------------------------------
      splitAbilitiesByName = (arrayData) => {
        const namesArray = arrayData.map((arrayItem)=>{return arrayItem.ability.name});
		
        return namesArray.join(', ')
        
    }

    // ? --------------------------------------
    // ? Set Steps Required To Hatch
    // ? Initial hatch counter: one must walk 255 × (hatch_counter + 1) 
    // ? steps before this Pokémon's egg hatches, 
    // ? unless utilizing bonuses like Flame Body's.
    // ? --------------------------------------

    setStepsToHatchEgg = (hatch_counter) => {
        return ( 255 * (hatch_counter + 1))
    }


    // ? --------------------------------------
    // ? Set Pokemon Evs
    // ? --------------------------------------
    setPokemonEvs = (stats) => {
        
        // Filter Special Abilities
        const nStats = stats.filter(stat => {if (stat.effort > 0) {return true;}return false;})
     
        // Split the Values, remove - && add ,   
        return nStats.map((stat)=> {
              return `${stat.effort} ${stat.stat.name
                        .toLowerCase()
                        .split('-')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')}`;
            
        }).join(', ');
       
    }


    

}

