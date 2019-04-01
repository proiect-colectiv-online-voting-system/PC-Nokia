import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Logo from './Logo/Logo';
import Login from './Login/Login';

const frontPage = props => (
        <View style={styles.container}>
            <Logo/>
            <Text style={styles.firstLogo}>Virtual<Text style={styles.lastLogo}>Vote</Text></Text>
            <Login/>
        </View>

);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: '30%'
    },
    firstLogo: {
        marginTop: 23,
        color: 'white',
        margin: 0,
        flex: 1,
        fontSize: 40,
        textAlign: 'center',
    },
    lastLogo: {
        color:'orange'
    }
});


export default frontPage;