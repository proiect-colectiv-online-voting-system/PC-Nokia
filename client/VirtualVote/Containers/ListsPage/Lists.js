import React from 'react';
import {ImageBackground, StyleSheet, Text, ScrollView} from 'react-native';
import List from '../../Components/List/List';
import Background from '../../Components/Background/Background';
class Lists extends React.Component{
    static navigationOptions = {
        headerTintColor: 'white',
        headerStyle:{
            backgroundColor: "#252626",
        },
    };

    state = {
        lists:[
            {
                title:'Referendum',
                description: 'Sunteti de acord cu legalizarea marijuanei?',
                choices: ['Da','Nu'],
            },
            {
                title:'Alegeri Parlamentare',
                description: 'Ce partid doriti sa guverneze?',
                choices: ['PSD','PNL','ALDE','PDL']
                ,
            },
            {
                title:'Alegeri Prezidentiale',
                description: 'Cine doriti sa va fie presedinte?',
                choices: ['Traian Basescu','Mircea Geoana','Crin Antonescu'],
            },
            {
                title:'Alegeri Europene',
                description: 'Ce partid doriti sa aibe membrii in UE?',
                choices: ['PSD','PNL','ALDE','PDL'],
            }
        ]
    };

    render(){
        return(
            <Background>
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>Lista Selectii</Text>
                    {this.state.lists.map((e,index) =>
                        <List title={e.title} key={index} clicked={() => this.props.navigation.navigate('Vote',{
                           title: e.title,
                           description: e.description,
                           choices: e.choices,
                        })}/>
                    )}
                </ScrollView>
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
