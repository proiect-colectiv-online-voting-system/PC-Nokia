import React from 'react';
import {ImageBackground} from 'react-native';

const background = (props) => (
    <ImageBackground style={{width: '100%', height: '100%'}} source={require("../../assets/images/Background.jpg")}>
        {props.children}
    </ImageBackground>
    );

export default background;