import React, { useState, useEffect, useContext } from "react"
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native"
import { useFonts } from "expo-font";
import { Button } from "react-native-elements";
import * as Font from 'expo-font'

import Follow from '../Follow/Follow'

const { width, height } = Dimensions.get("window");

const StastDescripcion = ({
  callback,
  perfiles
}) => {
  const [fonstLoaded, setFonstLoaded] = useState(false)


  const loadFonts = async () => {

    await Font.loadAsync({
      "Aktiv_Normal": require("../../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
      "Aktiv_Medium": require("../../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
      "Aktiv_Bold": require("../../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
      "PlayFair": require("../../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
    });

    setFonstLoaded(true)

  }



  useEffect(() => {
    loadFonts()

  }, [])


  if (!fonstLoaded)
  {
      return null
  }


  return (
    <View style={style.Conteiner}>
      <Text style={style.Text1}>Acerca de Mi</Text>
      <Text style={style.Text2}>{perfiles[0].aboutme}</Text>
    
      <Button
        buttonStyle={style.ConfigurationContainer}
        type="outline"
        title="Configuración"
        titleStyle={style.ConfigurationTitle}
        onPress={callback}
      />

   

    </View>
  )
}

//
//<Follow/>   //<Follow NotFolloAnswer={style.NotFolloAnswer} FollowAnswer={style.FollowAnswer} TextColorNotFollow={style.TextColorNotFollow}  TextColorFollow={style.TextColorFollow}/>
const style = StyleSheet.create({
  Conteiner: {
    marginLeft: 20,

  },
  Text1: {
    fontFamily: "Aktiv_Bold",
    fontSize: 15
  },

  Text2: {
    fontFamily: "Aktiv_Normal",
    fontSize: 14,
    marginTop: height * 0.015
  },
  ConfigurationContainer: {
    borderColor: "#2f3640",
    width: width * 0.7,
    alignSelf: "flex-start",
    padding: 5,
    marginTop: height * 0.02,
    marginBottom: 15,
    borderRadius: 6,
  },
  ConfigurationTitle: {
    fontSize: 15,
    color: "#2f3640",
    fontFamily: "Aktiv_Bold",
  },


  FollowAnswer: {
    borderColor: "#0000ff",
    borderWidth: 2,
    backgroundColor: "#0000ff",
    width: width * 0.7,
    alignItems: 'center',
    padding: 5,
    marginTop: 2,
    marginBottom: 15,
    borderRadius: 6,
  },
  NotFolloAnswer: {
    borderColor: "#0000ff",
    backgroundColor: '#FDFDFD',
    width: width * 0.7,
    alignItems: 'center',
    padding: 5,
    marginTop: 2,
    borderWidth: 2,
    marginBottom: 15,
    borderRadius: 6,
  }
  ,
  TextColorFollow: {
    color: '#FDFDFD',
    fontSize: 15,
    fontFamily: "Aktiv_Bold",
  }
  ,
  TextColorNotFollow: {
    color: "#0000ff",
    fontSize: 15,
    fontFamily: "Aktiv_Bold",
  }

})

export default StastDescripcion