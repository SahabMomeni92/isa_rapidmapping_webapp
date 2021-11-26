import axios from 'axios'

const base_url = process.env.REACT_APP_BASE_URL
export const importMap_api = async(formData)=>{
    const config = {
        headers : {      
        "Content-Type": "multipart/form-data"
        } 
    }
    
    const response = await axios.post(`${base_url}api/expert_panel/createexpertmap/`,formData,config)

    return response 
}