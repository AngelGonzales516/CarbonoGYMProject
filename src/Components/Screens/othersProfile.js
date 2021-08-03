import React, { useContext, useEffect, useState } from "react"
import StasPerfil from "../UI/StastPerfil/StastPerfil"
import { Dimensions, StyleSheet, View, Text, Image, ScrollView , ActivityIndicator } from "react-native"
import { Card } from 'react-native-elements'
import StastOtherPerfile from "../UI/StastOthersPerfil/StastOtherPerfile"
import {Context as PerfileContext} from "../../Providers/perfileProviders"
import {Context as publicationsContext} from "../../Providers/InformationProviders"
import PostList from "../Shared/PostList";

import AnimatedScrollView from "../UI/BottonNav/TabNav/AnimatedScrollView"
import Post from "../Shared/Post";
import * as Font from 'expo-font'


const { width, height } = Dimensions.get("screen");

const othersPerfile = ({
    navigation
}) => {
    const {state:informationState ,otherGetPublication} = useContext (publicationsContext)
    const {state,otherGetPerfile} = useContext (PerfileContext)
    const [fonstLoaded, setFonstLoaded] = useState(false)

    const loadFonts = async () => {

        await Font.loadAsync({
            Aktiv_Light: require("../../Assets/Fonts/AktivGroteskCorp-Light.ttf"),
            Aktiv_Normal: require("../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
            Aktiv_Medium: require("../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
            Aktiv_Bold: require("../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
            PlayFair: require("../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
        });

        setFonstLoaded(true)

    }


    const getData = () => {
        console.log(state.currentIdPerfile)
        otherGetPublication(state.currentIdPerfile)
        otherGetPerfile(state.currentIdPerfile)
              
    }




    useEffect(() => {
        loadFonts()
        //  addData()
        getData()
    }, [])

    useEffect(() => {
        loadFonts()
    }, [])

    if (!fonstLoaded) {
        return ( <View style={[style.containerR, style.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>)
    }


    return (
        <View >
         
            <StastOtherPerfile callback={
                () => {
                    navigation.navigate("Configurations")
                }
            }  />
            

            <Text style={style.Text1}> publicaciones </Text>
            <View style={style.conteiner2}>
                <PostList
                    posts={informationState.otherPublications}
                    navigation={navigation}
                />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    containerR: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      },
    container: {backgroundColor:'#000000'},

    container1: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: height * 0.2
    },

    Text1: {
        marginTop: height * 0.46,
        position:"absolute",
        marginLeft: 26,
        fontSize: 15,
        marginBottom: 10,
        fontFamily: "Aktiv_Medium"
    },
    conteiner2: {
        marginTop: height * 0.22 ,
        height: height * 0.5,


        padding: 0

    }

})

/*
<StasPerfil name1="30" name2="400" name3="10"/>

<StasPerfil name1="30" name2="400" name3="2" /> */

export default othersPerfile