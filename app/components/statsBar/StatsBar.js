/* ==========================================================================
** Pokemon Details Stats Bar Component
** 16/10/2020
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Imports
// --------------------------------------
    import React, { Component } from 'react';
    import { Platform, StyleSheet, Text, View, Animated } from 'react-native';



// --------------------------------------
// Create Class Component
// For easier state, animation handling
// --------------------------------------

    class StatsBar extends Component {


        // ?--------------------------------------
        // ? Constructor
        // ?--------------------------------------
        constructor(props) {
            super(props)
            this.state = {
                progressStatus : 0
            }

            this.anim = new Animated.Value(0);
        }


        // ?--------------------------------------
        // ? Start Animation when component is loaded
        // ?--------------------------------------
        componentDidMount() {
            this.onAnimate();
        }

        // ?--------------------------------------
        // ?Handle Load Animation
        // ?--------------------------------------
        onAnimate = () => {

            const {statValue} = this.props;

            this.anim.addListener(({ value }) => {
                this.setState({ progressStatus: parseInt(value, 10) });
            });

            Animated.timing(this.anim, {
                toValue: statValue,
                duration: 500,
                useNativeDriver: true
            }).start();
        }

        // ?--------------------------------------
        // ? Render Component
        // ?--------------------------------------
        render() {
            const {statName, indexColor} = this.props;
            const innerColor = {backgroundColor :indexColor %2 === 0 ? "#5ec788" : "#fc8383"}

            return (
                <View style={styles.container}>

                    <View style = {styles.innerCol}>
                        <Text> {statName}  </Text>
                    </View>

                    <View style = {[styles.innerCol, {alignItems : 'center'}]}>
                        <Animated.Text style={styles.label}>
                            {this.state.progressStatus}
                        </Animated.Text>
                    </View>


                    <View style = {styles.animatedCol}>
                    
                    
                
                        <Animated.View
                            style={[
                                styles.inner, innerColor, { width: this.state.progressStatus },
                            ]}
                        />

                        </View>
                       
                    </View>
                
            );
        }
    }



// --------------------------------------
// Export Component
// --------------------------------------
    export default StatsBar

// --------------------------------------
// Create Styles
// --------------------------------------
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 30,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: "space-between",
        alignItems : 'center',
        flexDirection : 'row'
    },

    inner: {
        width: '100%',
        height: 5,
        borderRadius: 5,
        // backgroundColor: "#5ec788",  
    },
    innerCol : {
        flexDirection : 'column',
        width : '25%'
    },  
    animatedCol : {
        width: '50%',
        height: 5,
        borderRadius: 5,
        backgroundColor: "#DEE5F1",
    },
    label: {
        
        color: "black",
        
        zIndex: 1,
        
    }
});  