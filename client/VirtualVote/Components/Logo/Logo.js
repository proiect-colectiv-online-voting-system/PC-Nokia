import React from 'react';
import {View,Image, StyleSheet} from "react-native";

const logo = props => (
    <View style={styles.container}>
        <Image style={styles.logo} source={require('./Logo.png')}/>
    </View>
);

const styles = StyleSheet.create({
    logo:{

        margin: 0,
        marginTop: 25,
        marginLeft: '50%',
        width: "100%",
        height: "100%",
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 100,

    },
    container: {
        width: 200,
        height:200,
    }
});



export default logo;