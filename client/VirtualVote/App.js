import React from 'react';
import {ImageBackground,Button} from "react-native";
import {createStackNavigator,createAppContainer} from "react-navigation";
import { Font } from 'expo';

import ListPage from './Containers/ListsPage/Lists';
import FrontPage from './Containers/FrontPage/FrontPage';
import VotingPage from './Containers/VotingPage/VotingPage';
import VoteCompleted from './Containers/VoteCompletedPage/VoteCompleted';


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
        Vote: VotingPage,
        VoteCompleted: VoteCompleted,
    },
    );



export default createAppContainer(AppStackNavigator);

