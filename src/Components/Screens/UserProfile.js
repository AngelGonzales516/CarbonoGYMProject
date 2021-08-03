import React, { useEffect, useState, useContext,useLayoutEffect } from "react"
import StasPerfil from "../UI/StastPerfil/StastPerfil"
import { Dimensions, StyleSheet, View, Text, Image, ScrollView, FlatList,ActivityIndicator } from "react-native"
import { Card } from 'react-native-elements'
import { useTabBar } from '../UI/BottonNav/context/TabBarProvider'
import StastPerfile from "../UI/StastPerfil/StastPerfile"
import AnimatedScrollView from "../UI/BottonNav/TabNav/AnimatedScrollView"
import Post from "../Shared/Post";
import * as Font from 'expo-font'
import { Context as informationContext } from "../../Providers/InformationProviders"
import { Context as AuthContext } from "../../Providers/AuthProvider"
import { Context as PerfileContext } from "../../Providers/perfileProviders"
import { add } from "react-native-reanimated"
import PostList from "../Shared/PostList";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");
let offsetY = 0;

const UserPerfile = ({
    navigation
}) => {
    const { setShowTabBar } = useTabBar();
    const [fonstLoaded, setFonstLoaded] = useState(false)
    
    const { state:perfilState,getPerfile } = useContext(PerfileContext)
    const { state: informationState, getPublication, clearMessage } = useContext(informationContext)
    const { state, signout } = useContext(AuthContext)
    

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

    /*   const getData = () => {
           getPublication(state.user.id)
       }*/

    const getData = () => {
       
        getPublication(state.user.id)
        getPerfile(state.user.id)
              
    }
/*
    useEffect(() => {
        if (perfilState.errorMessage) {
          Toast.show({
            text2: perfilState.errorMessage,
          });
          clearMessage();
        }
      }, [perfilState.errorMessage]);
*/





    useLayoutEffect(() => {
        loadFonts()
        //  addData()
        getData()
    }, [])

  

    if (!fonstLoaded) {
        return (  <View style={[style.containerR, style.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>)
    }

    return (
            
        <View >
       
        
            <StastPerfile callback={
                () => {
                    navigation.navigate("Configurations")
                }
            } />
        
            <Text style={style.Text1}> publicaciones </Text>

            <View style={style.conteiner2}>
                <PostList
                    posts={informationState.publications}
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
    containerscrol:{
        position:"absolute"
    },
    container: { backgroundColor: '#000000' },

    container1: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: height * 0.2
    },

    Text1: {
        marginTop: height * 0.48,
        position:"absolute",
        marginLeft: 26,
        fontSize: 15,
        marginBottom: 10,
        fontFamily: "Aktiv_Medium"
    },
    conteiner2: {
        marginTop: height * 0.42,
        height: height * 0.52,
        
        padding: 0

    }

})

export default UserPerfile