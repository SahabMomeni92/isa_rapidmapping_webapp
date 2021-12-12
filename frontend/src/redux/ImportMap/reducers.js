import * as actions from './types'


const initState = {
    layer_informations : {layer_name:'salam aleykom',disaster_name:'chi mige ? ',system_name:'ISAFRM_layers_8_mlatlon'},
    has_layer : false,
    disaster_list : null,
    importedMap_id:9,
    importedMapDetails:null,
}

const rootReducer = (state = initState,action) =>{
    const {type,payload} = action
    switch (type) {
        case actions.LAYER_IMPOERT_SUCCESS:
            return {...state,layer_informations:payload,has_layer:true}  
        case actions.LAYER_IMPOERT_FAIL:
        case actions.RESET_LAYER:
                return {...state,layer_id:null,disaster:null,has_layer:true,layer_informations:{}}   
        case actions.GET_DISASTER_SUCCESS:
            return {...state,disaster_list:payload}      
        case actions.GET_DISASTER_FAIL:
            return {...state,disaster_list:null}       
        case actions.MAP_IMPORT_SUCCESS:
            return {...state,importedMap_id:payload}    
        case actions.MAP_IMPORT_FAIL:
            return {...state,importedMap_id:null}       
        case actions.GET_IMPORTEDMAPDETAIS_SUCCESS:
                return {...state,importedMapDetails:payload}    
        case actions.GET_IMPORTEDMAPDETAIS_FAIL:
                return {...state,importedMapDetails:null}             
        default:
            return state    
    }
}

export {rootReducer,initState}