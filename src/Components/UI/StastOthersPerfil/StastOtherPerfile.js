import React, { useEffect, useState, useContext,useLayoutEffect } from "react"
import {ActivityIndicator ,Dimensions, View, StyleSheet, Text, Image } from "react-native"
import { Card } from "react-native-elements"
import StasOtherPerfil from "./StastOtherPerfil"
import StastOtherDescripcion from "./StastOtherDescripcion"
import { useFonts } from "expo-font";
import * as Font from 'expo-font'
import Follow from '../Follow/Follow'
import { Context as perfileContext } from "../../../Providers/perfileProviders"
import { Context as AuthContext } from "../../../Providers/AuthProvider"

const { width, height } = Dimensions.get("screen");


const StastOtherPerfile = ({
    callback
}) => {
   
    const [fonstLoaded, setFonstLoaded] = useState(false)
    const {state: perfilData,  otherGetPerfile} = useContext(perfileContext)
    const {state,signout} = useContext (AuthContext)
    //const [perfilData, setPerfilData] = useState (null)

    const loadFonts = async () => {

        await Font.loadAsync({

            "Aktiv-Normal": require("../../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
            "Aktiv_Medium": require("../../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
            "Aktiv-Bold": require("../../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
            "PlayFair": require("../../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
        });
        setFonstLoaded(true)
    }

    const getData = () => {
        try {
       
      //  setPerfilData(perfileState.perfiles)
        console.log(perfilData)
        }
        catch (error) {
           // setPerfilData(data)
           otherGetPerfile(state.user.id)
        } 
      }

    useEffect(() => {
        loadFonts()
        getData()
        
    }, [])


    if (!fonstLoaded || !(perfilData.otherPerfiles[0] && true) ) {
        return (
            <View style={[Style.containerR, Style.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>)
        
    }
    // console.log(perfilData.perfiles)

    return (
        <>
      
        <View style={Style.CardConteiner}>
            
            <View style={Style.Container}>
                <View style={Style.Imagen}>
                    <Image style={Style.Imagen} source={{ uri: `data:image/jpg;base64,${perfilData.otherPerfiles[0].image.base64}` }} />
                </View>
                <View style={Style.conteinerPerfil}>
                    <Text style={Style.Text1}>
                    {perfilData.otherPerfiles[0].userName}
                    </Text>

                    <Text style={Style.Text2}>
                    {perfilData.otherPerfiles[0].mystate}
                    </Text>
                    
                   
                </View>
            </View>
            <View style = {Style.LineContain}>  
            <View style = {Style.lineStyle} />
           </View>
            <StastOtherDescripcion perfiles={perfilData.otherPerfiles} callback={callback}/>
        </View>
        </>

    )

}

/* <Follow NotFolloAnswer={Style.NotFolloAnswer} FollowAnswer={Style.FollowAnswer} TextColorNotFollow={Style.TextColorNotFollow} TextColorFollow={Style.TextColorFollow}/>*/

const Style = StyleSheet.create({
    conteinerPerfil:{
        flex: 1,
        alignItems:"center",
        alignSelf:"center",
        textAlign:"center"
        
    },
    containerR: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      },
    CardConteiner: {
        marginTop: 40,
        position: "absolute",
        marginLeft: 25,
        backgroundColor: "#f0f0f0",
        //color:"white",
        width: width * 0.85,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1,

        elevation: 5,

    },
    Container: {
        flexDirection: "row",
        marginTop: 10,
        height: height * 0.11
    },
    container1: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: height * 0.2
    },
    Imagen: {

        width: width * 0.31,
        height: height * 0.1,
        resizeMode: "contain",
        marginBottom: 10
    },
    LineContain:{
        width: width * 0.8,
        left:width* 0.02
    }
    ,
    lineStyle:{
        borderWidth: 0.7,
        borderColor:'black',
        margin:10,
   }
    ,



    Text1: {
        fontFamily: "Aktiv-Bold",
        fontSize: 20,
       

    },

    Text2: {
        fontFamily: "Aktiv-Normal",
        fontSize: 13,
        marginTop: 2,
        marginBottom: 2,
        color: "#C6C3C2"
    },


    conteinerFollow: {
        position: 'absolute'
    }
    ,
    FollowAnswer: {
        borderColor: "#0000ff",
        borderWidth: 2,
        backgroundColor: "#0000ff",
        width: 110,
        alignItems: 'center',
        padding: 5,
        marginLeft: 75,
        borderRadius: 15,

    },
    NotFolloAnswer: {

        width: 110,
        alignItems: 'center',
        padding: 5,
        marginLeft: 75,
        borderColor: "#0000ff",
        borderWidth: 2,
        borderRadius: 15,

    },
    TextColorFollow: {
        color: '#FDFDFD',
        fontSize: 15,
        fontFamily: "Aktiv_Bold",
    }
    ,
    TextColorNotFollow: {
        color: "#0000ff",
        fontSize: 15,
        fontFamily: "Aktiv-Bold"
    }

}
)

export default StastOtherPerfile
