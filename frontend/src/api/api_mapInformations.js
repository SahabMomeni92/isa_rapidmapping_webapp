import axios from 'axios'

const base_url = process.env.REACT_APP_BASE_URL
export const getMapDetails = async(map_id)=>{
    const config = {
        headers : {
            'Content-Type':'application/json',
            'Accept':'application/json'
        } 
    }
    
    const response = await axios.get(`${base_url}api/expert_panel/expertmap/${map_id}`,config)
    .then(resp=>resp)
    .catch(err=>err)
    return response
}

