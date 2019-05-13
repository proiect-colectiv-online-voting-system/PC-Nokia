import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Logo from '../../Components/Logo/Logo';
import Login from '../../Components/Login/Login';
import Background from '../../Components/Background/Background';

class FrontPage extends React.Component{
    static navigationOptions = {
        headerTransparent: 'true'
    };


    render(){
        return(
            <Background>
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
            </Background>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: '25%',
        marginTop: '5%'
    },
    firstLogo: {
        marginTop: 23,
        marginBottom: 38,
        color: 'white',
        fontFamily:'monospace',
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