import * as actions from './types'


const initState = {
    access : localStorage.getItem('access'),
    refresh:  localStorage.getItem('refresh'),
    isAuthenticated: null,
    remindMe:null,
    user: null,
    errorMessage:null,
    status:null,
    userLoading:false,
    checkAuthLoading:false,

}

const rootReducer = (state = initState,action) =>{
    const {type,payload} = action
    switch (type) {
        case actions.LOGIN_SUCCESS:
            localStorage.setItem('access',payload.access)
            localStorage.setItem('refresh',payload.refresh)
            return {...state,access:payload.access,refresh:payload.refresh,isAuthenticated:true}
        case actions.LOGIN_FAIL:
        case actions.LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {...state,access:null,refresh:null,isAuthenticated:false,user:null,errorMessage:payload} 
        case actions.USER_LOADED_REQUEST:
            return {...state,userLoading:true}    
        case actions.USER_LOADED_SUCCESS:
            return {...state,user:payload,userLoading:false}   
        case actions.USER_LOADED_FAIL:
            return {...state,user:null,userLoading:false} 
        case actions.CHECK_AUTHENTICATED_SUCCESS:
                return {...state,isAuthenticated:true}          
        case actions.CHECK_AUTHENTICATED_FAIL:
            return {...state,isAuthenticated:false}         
        default:
            return state    
    }
}

export {rootReducer,initState}