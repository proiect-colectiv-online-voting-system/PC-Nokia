import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import List from './List/List';

const list = props => (
    <ImageBackground style={{width: '100%', height: '100%'}} source={require("../../assets/images/Background.jpg")}>
    <View style={styles.container}>
            <Text style={styles.title}>Lista Selectii</Text>
            <List title={'Referendum'}/>
            <List title={'Alegeri Parlamentare'}/>
            <List title={'Alegeri Prezidentiale'}/>
            <List title={'Alegeri Europarlamentare'}/>
        </View>
    </ImageBackground>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 50,
    },
    title: {
        textAlign: 'center',
        color: '#FF8C00',
        fontSize: 40,
        marginBottom: 20
    }
});


export default list;
