import axios from 'axios'

const base_url = process.env.REACT_APP_BASE_URL
export const login_api = async(email,password)=>{
    const headers = {
        'Content-Type':'application/json'
    }
    
    const body = {'email':email,'password':password}
    const response = await axios.post(`${base_url}auth/jwt/create/`,body,headers)
    .then(res=>res)
    .catch(err=>err)
    return response 
}

export const load_user_api = async()=>{
    const config = {
        headers : {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization':`JWT ${localStorage.getItem('access')}`
        } 
    }
    
    const response = await axios.get(`${base_url}auth/users/me/`,config)
    .then(res=>res)
    .catch(err=>err)
    return response 
}

export const check_authenticated_api = async()=>{
    const config = {
        'Content-Type':'application/json',
        'Accept':'application/json',
    }
    const body = {"token":localStorage.getItem('access')}
    console.log(body);
    const response = await axios.post(`${base_url}auth/jwt/verify/`,body,config)
    .then(res=>{
        console.log('kar kard');
        console.log(res)
        return res
    })
    .catch(err=>{
        console.log('kar nakard');
        console.log(err)
        return err
    })
    return response 
}
