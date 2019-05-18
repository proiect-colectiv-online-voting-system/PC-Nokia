import React from 'react';
import axios from 'axios';
import {ImageBackground, StyleSheet, Text, TouchableOpacity,ScrollView} from 'react-native';
import Background from '../../Components/Background/Background';

class VotingPage extends React.Component {
    static navigationOptions = {
        headerTransparent: 'true',
        headerLeft: null
    };

    state:{
        choice: null;
    };

    voteHandler = (choice) =>{
        this.setState({choice:choice});
        axios.post('92.87.91.15:3031/api/polls/vote/');
        this.props.navigation.navigate('VoteCompleted');

    };

    render(){
        const { navigation } = this.props;
        const title= navigation.getParam('title','Nu este disponibil');
        const description = navigation.getParam('description', 'Nici o descriere disponibila');
        const choices = navigation.getParam('choices','Nici o varianta disponibila');
        return(
            <Background>
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    {choices.map( (e,index) =>
                        <TouchableOpacity key={index}
                                          onPress={this.voteHandler(e.option)}>
                            <Text key={index} style={styles.choice}>{e.option}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity key={'null'} onPress={this.voteHandler('VOT NUL')}>
                        <Text style={styles.votNul}>VOT NUL</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Background>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color:'#FF8C00',
        fontSize: 40,
        textAlign: 'center',
    },
    description:{
        color: 'white',
        fontSize: 28,
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 20,
        lineHeight: 35
    },
    container:{
        flex: 1,
        flexDirection: 'column',
        marginTop: 50,
    },
    choice:{
        backgroundColor: '#252626',
        borderRadius: 50,
        borderWidth: 3,
        color: '#FF8C00',
        textAlign: 'center',
        fontSize: 30,
        marginTop: 15,
    },
    votNul:{
        backgroundColor: '#252626',
        borderRadius: 50,
        borderWidth: 3,
        textAlign: 'center',
        fontSize: 30,
        marginTop: 15,
        letterSpacing:4,
        color:'#FF0000'
    }
});

export default VotingPage;