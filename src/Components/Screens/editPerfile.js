import React from "react"
import FormPerfile from "../UI/Forms/formPerfile"
import AnimatedScrollView from "../UI/BottonNav/TabNav/AnimatedScrollView"

const editPerfile = ({ navigation }) => {
    return (
        <AnimatedScrollView>
            <FormPerfile navigation={() => { navigation.goBack() }} />
        </AnimatedScrollView>
    );
}

export default editPerfile;