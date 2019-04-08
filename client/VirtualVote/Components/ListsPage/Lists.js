import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import List from './List/List';
import Background from '../Background/Background';
class Lists extends React.Component{
    static navigationOptions = {
        headerTintColor: 'white',
        headerStyle:{
            backgroundColor: "#252626",
        },
    };
    render(){
        return(
            <Background>
                <View style={styles.container}>
                    <Text style={styles.title}>Lista Selectii</Text>
                    <List title={'Referendum'}/>
                    <List title={'Alegeri Parlamentare'}/>
                    <List title={'Alegeri Prezidentiale'}/>
                    <List title={'Alegeri Europarlamentare'}/>
                </View>
            </Background>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 15,
    },
    title: {
        textAlign: 'center',
        color: '#FF8C00',
        fontSize: 40,
        marginBottom: 20
    }
});


export default Lists;
