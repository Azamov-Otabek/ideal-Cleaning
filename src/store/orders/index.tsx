import {create} from 'zustand'
import http from '../../service/config'
import {toast} from 'react-toastify'

const OrderStore = create((set) => ({
    count: 0,
    order: [],
    countStxs: [],
    getOrder: async(payload:any) => {
        const response = await http.get(`/order/search?page=${payload.page}&limit=${payload.limit}&name=${payload.name}`)
        set({order: response.data.orders_list})
        set({count: response.data.total})
    },
    postOrder: async(payload:any) => {
        try{
            const response = await http.post(`/order`, payload)
            if(response.status === 201)
                toast.success('Muvaffaqiyatli qoshildi', {autoClose: 1200})
                set((state:any)=>({order: state.order.length < 5 ?[...state.order, response?.data] : [...state.order]})) 
                set((state:any)=>({count: state.count += 1}))
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
                set((state:any)=>({count: state.count -= 1}))
            return response
        }catch(err){
            toast.error('Xatolik bor!')
        }
    },
    get_orders: async(payload:any) => {
        try{
            const response = await http.get(`/orders?start=${payload.start}&end=${payload.end}`, payload)
            return response
        }catch(err){
            console.log(err);
        }
    }

}))

export default OrderStore