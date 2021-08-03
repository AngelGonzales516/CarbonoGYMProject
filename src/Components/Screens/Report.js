import React, { useState,useEffect } from "react"
import {Text,StyleSheet,View,Dimensions} from "react-native"
import * as Font from "expo-font"

import BodyReport from "../UI/Forms/BodyReport"


const { width, height } = Dimensions.get("window");




const Report = () =>{

    
return (<View>

        <View style={styles.headerConteiner} >
        <Text style={styles.headerTitle}> Carbono GYM </Text>
        <Text style={styles.headerSubtitle}> Reporte  </Text>
        </View>

        <BodyReport></BodyReport>
        </View>
        )

}

const styles = StyleSheet.create ({
    headerConteiner:{
        marginTop: height * 0.03,
        alignItems:"center"
    },
    headerTitle: {
        fontSize: 30,
        color: "#F56700",
    },
    headerSubtitle:{
        fontSize: 20,
        color: "#F56700",
    }


})

export default Report

