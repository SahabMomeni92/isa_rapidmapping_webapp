import * as types from './types'

const initState = {
    StateMenu : false
}

const rootReducer = (state = initState,action) =>{
    switch (action.type) {
        case types.Open_Menu:
            return {...state,StateMenu:true}
        case types.Close_Menu:
            return {...state,StateMenu:false}   
        default:
            return state    
    }
}

export {initState,rootReducer} 