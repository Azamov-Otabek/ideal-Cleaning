import { toast } from "react-toastify";
import http from '../config'
import { Reques } from "../../interface/service";


const serviceStore:Reques = {
    delete: async(id) => {
        try{    
            const response = await http.delete(`/service?id=/${id}`)
            return response
        }catch(err){
            toast.error('Xatolik bor !')
        }
    },
    post: async(payload) => {
        try{
            const response = await http.post("/service/create", payload)
            return response
        }catch(err){
            toast.error('Xatolik bor !')
        }
    },
    get: async(payload) => {
        try{
            const response = await http.get(`/service/get-all?page=${payload.page}&limit=${payload.limit}&owner_email=${payload.owner_email}`);
            return response
        }catch(err){
            console.log(err);
            toast.error('Xatolik bor !')
        }
    },
    search: async(payload) => {
        try{
            const response = await http.get(`/service/search?page=${payload.page}&limit=${payload.limit}&name=${payload.name}&owner_email=${payload.owner_email}`)
            return response
        }catch(err){
            toast.error('Xatolik bor !')
        }
    },
    put: async(payload) => {
        try{
            const response = await http.put(`/service/update`, payload)
            return response
        }catch(err){
            toast.error('Xatolik bor !')
        }
    }

}


export default serviceStore;