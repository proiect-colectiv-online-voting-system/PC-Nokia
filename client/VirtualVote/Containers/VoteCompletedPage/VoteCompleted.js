import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import Background from '../../Components/Background/Background';

class VoteCompleted extends React.Component {
    static navigationOptions = {
        headerTransparent: 'true',
        headerLeft: null
    };

    state:{
        titleList: []
    };



    render(){
        const { navigation } = this.props;
        const title= navigation.getParam('title','Nu este disponibil');
        return(
            <Background>
                <View style={styles.container}>
                    <Image style={styles.image}
                           source={require("../../assets/images/VoteCompleted.png")}
                            onLoad={() =>{setTimeout(() => {
                                this.props.navigation.navigate('List',{title: this.props.navigation.getParam('title','Nu este disponibil')});
                            }, 1400)}}
                        />
                    <Text style={styles.description}>Vot inregistrat cu succes!</Text>
                </View>
            </Background>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '15%'
    },
    image:{
      borderWidth: 3,
      borderRadius: 80,
      width:200,
      height:200,

    },
    description:{
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        marginTop: 20,
        marginLeft: 10,
        lineHeight: 45,
        letterSpacing: 2,
    },
});

export default VoteCompleted;