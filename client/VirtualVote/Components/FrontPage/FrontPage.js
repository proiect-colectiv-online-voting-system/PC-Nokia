import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Logo from './Logo/Logo';
import Login from './Login/Login';


class FrontPage extends React.Component{


    render(){
        return(
            <ImageBackground style={{width: '100%', height: '100%'}} source={require("../../assets/images/Background.jpg")}>
            <View style={styles.container}>
                <Logo/>
                <Text style={styles.firstLogo}>Virtual<Text style={styles.lastLogo}>Vote</Text></Text>
                <Login/>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('List')}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: '25%'
    },
    firstLogo: {
        marginTop: 23,
        marginBottom: 38,
        color: 'white',
        margin: 0,
        fontSize: 40,
        textAlign: 'center',
    },
    lastLogo: {
        color:'orange'
    },
    button:{
        width: '50%',
        marginLeft: '25%',
        marginTop: '7%'
    },
    buttonText:{
        backgroundColor: '#FFD700',
        color:'white',
        borderRadius: 40,
        letterSpacing: 2,
        height: 40,
        paddingTop: 2,
        fontSize: 25,
        textAlign: 'center'
    },
});


export default FrontPage;