import React from 'react';
import {ImageBackground,Button} from "react-native";
import {createStackNavigator,createAppContainer} from "react-navigation";

import ListPage from './Components/ListsPage/Lists';
import FrontPage from './Components/FrontPage/FrontPage';


class App extends React.Component {
    render() {
        return (
                <AppStackNavigator/>
        );
    }
}

const AppStackNavigator = createStackNavigator(
    {
        Login: FrontPage,
        List: ListPage,
    },
    );

export default createAppContainer(AppStackNavigator);

