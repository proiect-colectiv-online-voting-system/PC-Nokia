import React from 'react';
import axios from 'axios';
import {ImageBackground, StyleSheet, Text, TouchableOpacity,ScrollView} from 'react-native';
import Background from '../../Components/Background/Background';

class VotingPage extends React.Component {
    static navigationOptions = {
        headerTransparent: 'true',
        headerLeft: null
    };



     voteHandler = (choice,CNP,title) => {
        axios.post('http://92.87.91.15:3031/api/vote',{title: title,CNP: CNP, option: choice})
            .catch(err => alert(err));
        this.props.navigation.navigate('VoteCompleted',{title: this.props.navigation.getParam('title','Nu este disponibil')});
    };




    render(){
        const { navigation } = this.props;
        const title= navigation.getParam('title','Nu este disponibil');
        const description = navigation.getParam('description', 'Nici o descriere disponibila');
        const choices = navigation.getParam('choices','Nici o varianta disponibila');
        const CNP = navigation.getParam('CNP','Nu este CNP');
        return(
            <Background>
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    {choices.map( (e,index) =>
                        <TouchableOpacity key={index}
                                          onPress={() => this.voteHandler(index,CNP,title)}
                        >
                            <Text key={index} style={e.option != 'Null Vote' ? styles.choice : styles.votNul}>{e.option}</Text>
                        </TouchableOpacity>
                    )}
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