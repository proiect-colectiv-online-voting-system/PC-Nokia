import React from 'react';
import axios from 'axios';
import {ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Logo from '../../Components/Logo/Logo';
import Background from '../../Components/Background/Background';

class FrontPage extends React.Component{
    static navigationOptions = {
        headerTransparent: 'true'
    };

    state:{
        userCNP: null;

    };

    loginHandler = () => {
        if(this.CNPValid(this.state.userCNP)){
            axios.post("92.87.91.15:3031/api",{ CNP: this.state.userCNP});
            this.props.navigation.navigate('List')
        }
    };

    CNPValid = (CNP) =>{
        const CNP_mask = "279146358279";
        if(CNP.length !== 13){
            alert("CNP-ul introdus nu are 13 caractere");
            return false;
        }
        else{
            let sum = 0;
            for(let i = 0; i < CNP.length - 1; i++){
                sum += (parseInt(CNP.charAt(i)) * parseInt(CNP_mask.charAt(i)));
            }
            let control_digit = sum%11 !== 0 ? sum%11 : 1;
            if(control_digit != CNP.charAt(12)){
                return false;
            }else{
                return true;
            }
        }
    };

    render(){
        return(
            <Background>
                <View style={styles.container}>
                    <Logo/>
                    <Text style={styles.firstLogo}>Virtual<Text style={styles.lastLogo}>Vote</Text></Text>
                    <View style={styles.login}>
                        <View style={{width: 300}}>
                            <Text style={styles.textCNP}>CNP</Text>
                            <TextInput label={'CNP'} style={styles.textInput}
                                       placeholder={' Introduceti CNP-ul aici...'}
                                       selectionColor={'#0F4142'}
                                       onChangeText={(text) => this.setState({userCNP:text})}/>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={this.loginHandler}>
                                <Text style={styles.buttonText}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
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
    login:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:40
    },
    textInput: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        height: 40,
        color: 'black',
    },
    textCNP:{
        color: 'white',
        fontSize: 25,
    }
});


export default FrontPage;