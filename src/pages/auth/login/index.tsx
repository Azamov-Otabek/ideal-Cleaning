import loginImg from '@images/login_Img.png';
import {Formik, Form, Field, ErrorMessage} from "formik";
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState } from 'react';
import authStore from '@servicesAuth';
import { ToastContainer, toast } from 'react-toastify';
import {SendCodeEmail} from '@modals'
import {userLoginValidate} from '@validation'
import {Login} from "@authInterface"
import Cookies from 'js-cookie';


function index() {
  const navigate = useNavigate()
  const [sendCode, setsendCode] = useState(false)
  const [isActive, setActive] = useState(false)
  let initialValues = {
    email: '',
    password: ''
  }
  async function handleSumbit(value:Login){
    const response:any = await authStore.login(value)
    if(response.status === 200){
      toast.success('Tizimga muvaffaqiyayli kirildi !', {autoClose: 1200})
      const userData = JSON.stringify({...response.data, password: value.password})
      Cookies.set('user', userData)
      setTimeout(() => {
        navigate('/mainlayout')
      }, 1600);
    }else{
      toast.error('Tizimga kirishda xatolik yuz berdi!', {autoClose: 1200})
    }
  }

  function forgetPassword(){
    setsendCode(true)
  }
  

  return (
    <>
      <ToastContainer/>
      <div className='w-full'>
        <div className="topimg">
          <div className='absolute top-0 left-0 w-full bg-[#80A5D1] h-[378px]'></div>
          <div className='absolute top-[362px] w-full h-[42px] bg-[#5287D5]'></div>
            <img className='relative z-10 w-[736px] h-[400px] mx-auto' src={loginImg} alt="LoginImg" />
        </div>
      </div>
      <div className='mt-[55px] mx-auto w-[560px]'>
          <h1 className='text-center text-[56px] font-bold'>Tizimga kirish</h1>
          <Formik initialValues={initialValues} validationSchema={userLoginValidate} onSubmit={handleSumbit}>
              <Form>
                 <label className='block w-full mb-[20px] mt-[36px]'>
                    <Field
                    sx={{width: "100%"}}
                    name='email'
                    as={TextField}
                    id="filled-basic"
                    label="Enter your email"
                    variant="filled"
                    autoComplete="off"
                    />
                    <ErrorMessage name='email' component={'p'} className='text-[red]'/>
                 </label>
                  <p onClick={forgetPassword} className='text-end text-[20px] font-normal ml-[360px] cursor-pointer'>Parolni unutdingizmi ?</p>
                 <label className='block w-full mt-[15px] relative'>
                  <Field  
                    sx={{width: "100%"}}
                    name='password'
                    as={TextField}
                    id="filled-basic"
                    label="Enter your password"
                    variant="filled"
                    autoComplete="off"
                    type={isActive ? 'text' : 'password'}
                    />
                    <i onClick={() => setActive(!isActive)} className={isActive ? 'bx bx-hide absolute text-[35px] right-4 cursor-pointer z-10 top-[10px]' : 'bx bx-show absolute text-[35px] right-4 cursor-pointer z-10 top-[10px]'}></i>
                    <ErrorMessage name='password' component={'p'} className='text-[red]'/>
                 </label>
                 <Button variant="contained" type='submit' className='w-full block' sx={{mt: "33px", height: '78px', borderRadius: '12px'}} disableElevation>Tizimga kirish</Button>
                 <div className='flex justify-center gap-2 items-center mt-[32px]'>
                   <p className='text-[20px] '>Hisobingiz yo‘qmi?</p>
                   <Link to={'/register'} className=' text-[20px] font-normal text-[#2389DA]'>Ro‘yxatdan o‘tish</Link>
                 </div>
              </Form>
          </Formik>
      </div>
      {
        sendCode && <SendCodeEmail setsendCode={setsendCode}/>
      }
    </>
  )
}

export default index