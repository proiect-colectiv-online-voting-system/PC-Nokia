import React from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';

const List = props => (
    <View style={styles.container}>
        <TouchableOpacity>
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        borderWidth: 5,
        borderColor: 'black',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 5,
    },
    title:{
        fontSize: 30,
        letterSpacing: 2,
        color: 'white',
        textAlign: 'center',
    }

});

export default List;