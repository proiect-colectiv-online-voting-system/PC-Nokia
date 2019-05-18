import React from 'react';
import axios from 'axios';
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
        lists:[]
    };

    componentDidMount() {
        axios.get(`92.87.91.15:3031/api`)
            .then(res => {
                const lists = res.polls;
                this.setState({ lists: lists });
            }).catch(err =>{
                alert(err);
        })
    }

    render(){
        return(
            <Background>
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>Lista Selectii</Text>
                    {this.state.lists.map((e,index) =>
                        <List title={e.title} key={index} clicked={() => this.props.navigation.navigate('Vote',{
                           title: e.title,
                           description: e.question,
                           choices: e.options,
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
