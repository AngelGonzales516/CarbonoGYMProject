import createDataContext from "./createDataContext";

const ThemeReducer = (state,action) =>{
    switch(action.type){
        case "setTheme":{
            return {...state, Theme : action.payload, Toggle:true}
        }
    }
}

const getTheme =  (dispatch) =>(theme) =>{
  dispatch ({type: "setTheme",payload:theme, })
}


export const { Provider , Context} = createDataContext(
    ThemeReducer ,{
        getTheme,
    },{
        Theme:"dark" ,
        Toggle:false
    }
)