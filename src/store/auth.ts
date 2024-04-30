import {create} from 'zustand'
import http from '@plugins/axios.ts'
import { saveCookie } from '@utils/cokies.ts'

const authStore = create((set) => ({
    login: async (payload: any) => {
        try {
          const response = await http.post("/auth/login", payload);
          if (response.status == 200) {
            saveCookie("token", response.data.access_token);
          }
          return response;
        } catch (err) {
          return err
        }
    },
    register: async(payload:any) => {
        try {
          const response = await http.post("/auth/register", payload);
          return response
        } catch (err) {
          console.log(err);
        }
    },
    forgotPassword: async(payload:any) => {
        try{
            const response = await http.post("/auth/forgot-password", payload);
            return response;
        }catch(err){
            console.log(err);
        } 
    },
    refreshToken: async(payload:any) => {
        try{
            const response = await http.post("/auth/refresh-token", payload);
            return response;
        }catch(err){
            console.log(err);
        }
    },
    updatePassword: async(payload:any) => {
        try{
            const response = await http.post("/auth/update-password", payload);
            return response;
        }catch(err){
            console.log(err);
        }
    },
    verify: async(payload:any) => {
        try{
            const response = await http.post("/auth/verify", payload);
            return response;
        }catch(err){
            console.log(err);
        }
    },
    verifyForgotPassword: async(payload:any) => {
        try{
            const response = await http.post("/auth/verify-forgot-password", payload);
            return response;
        }catch(err){
            console.log(err);
        }
    },
}));


export default authStore;