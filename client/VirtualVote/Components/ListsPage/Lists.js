import React from 'react';
import {StyleSheet,Text,View} from 'react-native';

const list = props => (
        <View style={styles.container}>
            <Text style={title}>Selection List</Text>
        </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',

    }
});


export default list;
