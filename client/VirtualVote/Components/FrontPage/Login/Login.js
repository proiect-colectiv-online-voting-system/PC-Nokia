import React from 'react';
import {TouchableOpacity, StyleSheet, TextInput, View, Text} from "react-native";


const button = props => (
    <View style={styles.login}>
        <View style={{width: 300}}>
            <Text style={styles.textCNP}>CNP</Text>
            <TextInput label={'CNP'} style={styles.textInput}
                       placeholder={' Introduceti CNP-ul aici...'}
                       selectionColor={'#0F414'} />
        </View>
        <View style={styles.button}>
        <TouchableOpacity>
                <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    login:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        height: 40,
        color: 'black',
    },
    button:{
        marginTop: 30,
        width: '50%',
        flex:1,
        justifyContent: 'center',
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
    textCNP:{
        color: 'white',
        fontSize: 25,
    }


});

export default button;