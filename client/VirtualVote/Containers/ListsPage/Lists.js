import React from 'react';
import axios from 'axios';
import {ImageBackground, StyleSheet, Text, ScrollView} from 'react-native';
import List from '../../Components/List/List';
import Global from '../Global/Global';



import Background from '../../Components/Background/Background';
class Lists extends React.Component{
    static navigationOptions = {
        headerTintColor: 'white',
        headerStyle:{
            backgroundColor: "#252626",
        },
    };

    state = {
        lists:[],

    };

    componentDidMount() {
        axios.get(`http://92.87.91.15:3031/api/list-polls`)
            .then(res => {
                const lists = res.data;
                this.setState({ lists: lists });
            }).catch(err =>{
                alert(err);
        });
    }

    componentWillUnmount(){
        Global.length= 0;
    }


    render(){
        const { navigation } = this.props;
        const CNP = navigation.getParam('CNP','Nu este CNP');
        let title= navigation.getParam('title','Nu este disponibil');
        const Arr = this.state.lists.slice();
        if(title != 'Nu este disponibil'){
            Global.push(title);
        }
        const newArr = Arr.filter(el => !Global.includes(el.title));

        return(
            <Background >
                <ScrollView  style={styles.container}>
                    <Text style={styles.title}>Lista Selectii</Text>
                    {newArr.map((e,index) =>
                        <List title={e.title} key={index} clicked={() => this.props.navigation.navigate('Vote',{
                           title: e.title,
                           description: e.question,
                           choices: e.options,
                            CNP: CNP
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
