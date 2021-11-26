import * as actions from './types'


const initState = {
    WMS_boundingBox : null,
}

const rootReducer = (state = initState,action) =>{
    const {type,payload} = action
    switch (type) {
        case actions.GET_WMSCapabilities_SUCCESS:
            return {...state,WMS_boundingBox:payload}  
        case actions.GET_WMSCapabilities_RESET:    
        case actions.GET_WMSCapabilities_FAIL:
                return {...state,WMS_boundingBox:null}             
        default:
            return state    
    }
}

export {rootReducer,initState}