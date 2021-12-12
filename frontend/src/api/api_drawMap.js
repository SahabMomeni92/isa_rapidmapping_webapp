import axios from 'axios'

const base_url = process.env.REACT_APP_BASE_URL
export const InsertDrawMap_api = async(formData)=>{
    const config = {
        headers : {     
        "Content-Type": "application/json"
        } 
    }
    
    const response = await axios.post(`${base_url}api/expert_panel/insertdrawmap/`,formData,config)

    return response 
}
export const DrawMap_api = async(id)=>{
    const config = {
        headers : {  

        } 
    }  
    const response = await axios.post(`${base_url}api/expert_panel/drawmap/${id}/`,config)

    return response 
}