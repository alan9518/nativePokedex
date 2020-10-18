/* ==========================================================================
** Details Card Container Component
** 16/10/2020
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
    import React from 'react';
    import { StatsBar } from '../../components';
    import HelperFunctions from '../../shared/HelperFunctions';
    import { StyleSheet, View, Text } from 'react-native';
    import { globalStyles } from '../../shared/globalStyles'


// --------------------------------------
// Create Component
// --------------------------------------

    const DetailsCard = (props) => {

        const { pokemonHeight, pokemonWeight, pokemonAbilities, pokemonStats, specieInfo } = props;

        const helper = new HelperFunctions();


        return (
            <View style={styles.cardContainer}>


                <View style={styles.statsContainer}>



                    <View style={styles.detailsSection}>
                        <Text style={[styles.detailsTitle, globalStyles.titleH1]}> About </Text>
                        <View style={styles.innerRow}>

                            <Text style={styles.specieInfo}>  {specieInfo && specieInfo.replace(/(\r\n|\n|\r)/gm, "")} </Text>

                            <Text style={styles.pokemonName}> Height : {`${helper.convertHeightToMeters(pokemonHeight)} mts`}  </Text>
                            <Text style={styles.pokemonID}> Weight : {`${helper.convertPoundsToKg(pokemonWeight)} kg`} </Text>
                            <Text style={styles.pokemonID}> Abilities : {helper.splitAbilitiesByName(pokemonAbilities)} </Text>

                        </View>
                    </View>



                    <View>
                        <Text style={[styles.detailsTitle, globalStyles.titleH1]}> Stats </Text>


                        {pokemonStats && pokemonStats.map((stat, index) => {
                            let statName = helper.capitalize(helper.formatStatName(stat.stat.name))
                            return <StatsBar statValue={stat.base_stat} statName={statName} key={stat.stat.name} indexColor={index} />
                        })}


                    </View>


                </View>

            </View>


        );
    }

// --------------------------------------
// Export Component
// --------------------------------------
    export default DetailsCard;



const styles = StyleSheet.create({

    cardContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    detailsSection: {
        marginVertical: 20
    },
    innerRow: {
        flexDirection: 'column'
    },

    statsContainer: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    detailsTitle: {
        fontSize: 24
    },
    specieInfo: {
        width: '100%',
        flexDirection: 'row',
        flexDirection: 'row', flexWrap: 'wrap',
        justifyContent: 'space-around',
        textAlign: 'left',
        marginBottom: 10
    }
})