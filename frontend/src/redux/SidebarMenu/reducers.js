import * as actions from './actions'


const initState = {
    StateMenu : false,
    SidebarWidth:57
}

const rootReducer = (state = initState,action) =>{
    switch (action.type) {
        case actions.Open_Menu:
            return {...state,StateMenu:true,SidebarWidth:260}
        case actions.Close_Menu:
            return {...state,StateMenu:false,SidebarWidth:57}   
        default:
            return state    
    }
}

export {rootReducer,initState}