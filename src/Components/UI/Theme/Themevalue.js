import {Context as  ThemeContext} from "../../../Providers/ThemeProvider"

const ValueTheme  = () =>{
    const {state:ThemeState} = useContext (ThemeContext)

    return ThemeState.Theme
}

//const ValueColor = ValueTheme()

export default ValueTheme