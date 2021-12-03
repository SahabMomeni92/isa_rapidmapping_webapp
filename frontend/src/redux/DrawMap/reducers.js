import * as actions from './types'


const initState = {
    DataInformation:null,
    is_DataInformationImported:false,
}

const rootReducer = (state = initState,action) =>{
    const {type,payload} = action
    switch (type) {
        case actions.DrawMapData_IMPOERT_SUCCESS:
            return {...state,DataInformation:payload,is_DataInformationImported:true}      
        case actions.DrawMapData_IMPOERT_FAIL:
        case actions.DrawMapData_IMPOERT_RESET:
            return {...state,DataInformation:null,is_DataInformationImported:false}            
        default:
            return state    
    }
}

export {rootReducer,initState}