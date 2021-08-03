import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"

import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get("screen");

const ButtonActions = ({title1,style,style2,press}) => {
    return (
        <View>
            <Button
                titleStyle={style2}
                buttonStyle={style}
                title={title1}
                onPress={press}
            />
        </View>
    );
    
}

export default ButtonActions