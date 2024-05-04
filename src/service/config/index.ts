import axios from 'axios'
import Cookies from 'js-cookie'

const http = axios.create({
    baseURL: "https://app.olimjanov.uz/v1"
})

http.interceptors.request.use((config:any) => {
    let token = Cookies.get('token')
    if(token){
        config.headers.Authorization = token
    }
    return config
})

export default http