import {create} from 'zustand'
import http from '../../service/config'
import {toast} from 'react-toastify'

const OrderStore = create((set) => ({
    count: 0,
    order: [],
    getOrder: async(payload:any) => {
        const response = await http.get(`/order/all?page=${payload.page}&limit=${payload.limit}`)
        console.log(response);
        set({order: response.data.orders_list})
        set({total: response.data.total})
    },
    postOrder: async(payload:any) => {
        try{
            const response = await http.post(`/order`, payload)
            if(response.status === 201)
                toast.success('Muvaffaqiyatli qoshildi', {autoClose: 1200})
            return response
        }catch(err){
            toast.error('Xatolik bor!')
        }
    },
    putOrder: async(payload:any) => {
        try{
            const response = await http.put(`/order`, payload)
            if(response.status === 200)
                toast.success('Muvaffaqiyatli ozgartirildi', {autoClose: 1200})
            return response
        }catch(err){
            toast.error('Xatolik bor!')
        }
    },
    deleteOrder: async(payload:any) => {
        try{
            const response = await http.delete(`/order?id=${payload.id}`)
            if(response.status === 200)
                toast.success('Muvaffaqiyatli olib tashlandi', {autoClose: 1200})
            return response
        }catch(err){
            toast.error('Xatolik bor!')
        }
    }

}))

export default OrderStore