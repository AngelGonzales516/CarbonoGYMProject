import React, { useState, useContext } from 'react'
import { Button, Text } from 'react-native-elements';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native'
import { color, set } from 'react-native-reanimated';
//import { Context as FollowContext } from "../../../Providers/FollowProvider"
import { Context as AuthContext } from "../../../Providers/AuthProvider"


const Follow = ({ NotFolloAnswer, FollowAnswer, TextColorNotFollow, TextColorFollow }) => {

    //const { state, updateFollow, deleteFollow,getFollow } = useContext(FollowContext)
    const { state: idState, } = useContext(AuthContext)
    const [Toggle, setToggle] = useState(false)
    const [publicationTimes, setPublicationTime] = useState(Date.now())

    // const [Titlee, setTitle] = useState(['Seguir','Siguiendo'])
    //const [answerB, setAnswerB] = useState(false)

    const TexValue = Toggle ? 'Siguiendo' : 'Seguir'


    const desicion = () => {
        const NewToggle = !Toggle
        setToggle(NewToggle)
      /*  getFollow(idState.user.id)
        !Toggle ? (
            updateFollow(idState.user.id, publicationTimes),
            setToggle(state.toogle),
            console.log(state.toogle)
        ) : (deleteFollow(idState.user.id, publicationTimes),
            setToggle(state.toogle),
            console.log(state.toogle)
        )
*/
    }
 //   console.log(state.Toogle)

   

    return (
        <View>
            <TouchableOpacity onPress={() => { desicion() }}
                style={!Toggle ? NotFolloAnswer : FollowAnswer}
            >
                <Text style={!Toggle ? TextColorNotFollow : TextColorFollow}>{TexValue}</Text>
            </TouchableOpacity>

        </View>
    )
}
/*<TouchableOpacity> <Text>{}</Text>
</TouchableOpacity> 


  <Button buttonStyle={answerB?(colorr == "Not" ? style.NotFolloAnswer:style.FollowAnswer):style.NotFolloAnswer} 
        onPress={desicion(colorr)} 
        title={Titlee} 
        disabled={answerB?setAnswerB(false):setAnswerB(true)} '#49EBF7'/>
*/

//(color == "Not" ? style.NotFolloAnswer:style.FollowAnswer)

const style = StyleSheet.create({

    TextColorFollow: {
        color: '#FDFDFD'
    }
    ,
    TextColorNotFollow: {
        color: "#0000ff"
    }
})

export default Follow;

