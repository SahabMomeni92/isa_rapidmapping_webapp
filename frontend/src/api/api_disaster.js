import axios from 'axios'

const base_url = process.env.REACT_APP_BASE_URL
export const getDisasterList = async()=>{
    const config = {
        headers : {
            'Content-Type':'application/json',
        } 
    }
    console.log(`${base_url}api/manager_panel/createdisaster/`);
    const response = await axios.get(`${base_url}api/manager_panel/createdisaster/`,config)
    .then(resp=>resp)
    .catch(err=>err)
    return response
}

