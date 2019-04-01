import React from 'react';
import {TouchableOpacity, StyleSheet, TextInput, View, Text} from "react-native";



const button = props => (
    <View style={styles.login}>
        <View style={{width: 300}}>
            <Text style={styles.textCNP}>CNP</Text>
            <TextInput label={'CNP'} style={styles.textInput}
                       placeholder={' Introduceti CNP-ul aici...'}
                       selectionColor={'#0F4142'} />
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
    textCNP:{
        color: 'white',
        fontSize: 25,
    }


});

export default button;