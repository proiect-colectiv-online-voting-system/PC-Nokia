import React from 'react';
import FrontPage from './Components/FrontPage/FrontPage';
import {ImageBackground} from "react-native";
// import { createStackNavigator, createAppContainer } from "react-navigation";



 export default class HomeScreen extends React.Component {
  render() {
    return (
        <ImageBackground style={{width: '100%', height: '100%'}} source={require("./assets/images/Background.jpg")}>
        <FrontPage/>
        </ImageBackground>
    );
  }
}

// const AppNavigator = createStackNavigator({
//     Home: {
//         screen: HomeScreen
//     }
// });

 // export default createAppContainer(AppNavigator);