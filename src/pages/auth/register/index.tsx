import {Form, Formik, Field, ErrorMessage} from 'formik' 
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import authStore from '@store/auth';
import { ToastContainer, toast } from 'react-toastify';
import { AuthModal } from '@components';

function index() {
  const navigate = useNavigate()
  const { register, verify} = authStore()
  const [verifycod, setverifycod] = useState(0)
  const [isActive, setActive] = useState(false)
  const [ismodal, setModal] = useState(false)
  const [email, setemail] = useState("")


  function isActivePassword(){
    if(isActive)
      setActive(false)
    else
      setActive(true)
  } 
  const userValidate = yup.object().shape({
      full_name: yup.string().min(6, 'Ismingiz 6 harfdan kam bolmasligi kerak !').required("Iltimos soro'vni to'ldiring ! "),
      phone_number: yup.string().matches(/^\+998\d{9}$/, "Iltimos raqamingizni to'gri kiriting !").required("Iltimos so'rovni to'ldiring !"),
      email: yup.string().email("Iltimos emailni to'gri kiriting !").required("Iltimos so'rovni to'ldiring !"),
      password: yup.string().min(8, "Parolingiz 8 tadan kam bo'lmasin !").matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Parol kamida bitta katta harf, bitta kichik harf, bitta raqam va bitta maxsus belgidan iborat bo'lishi kerak").required("Iltimos so'rovni to'ldiring !"),
  })
  const initialvalue = {
    full_name: '',
    phone_number: '',
    email: '',
    password: '',
    verify: '',
  }

  const handleSubmit = async(value:object) => {
      if(value.password == value.verify) {
        const user = {
          full_name: value.full_name,
          phone_number: value.phone_number,
          email: value.email,
          password: value.password
        }
        const response = await register(user)
        if(response.status == 200) {
          setModal(true)
          setemail(user.email)
        }
      }else{
        toast.error('Parol va parol tasdiqlari mos emas', {autoClose : 1200})
      }
  }

  async function verifyRegister(){
    const user = {
      email: email,
      code: verifycod
    }
    if(user.code != 0) {
        const response = await verify(user)
        if(response.status == 201) {
          toast.success('Ro‘yxatdan o‘tganingiz', {autoClose : 1200})
          setTimeout(() => {
            navigate('/')
          }, 1600);
          setModal(false)
        }
    }
    
  }

  useEffect(() => {
    verifyRegister()
  }, [verifycod]);
  return (
    <>
    <ToastContainer/>
      <div className='w-[537px] mx-auto'>
        <Link to={'/'} className='absolute top-[100px] left-[145px] flex items-center'>
          <i className='bx bx-arrow-back text-[50px] '></i>
          <p className='text-[30px] font-semibold'>ortga</p>  
        </Link>
        <h1 className='text-center text-[56px] font-bold mt-[50px] mb-[80px]'>Ro‘yxatdan o‘tish</h1>
        <Formik initialValues={initialvalue} validationSchema={userValidate} onSubmit={handleSubmit}>
            <Form>
              <label className='block mb-[40px]'>
                <Field
                as={TextField}
                id="outlined-basic" 
                label="Ismingiz" 
                variant="filled"
                sx={{width: '100%'}}
                name="full_name"
                autoComplete="off"
                />
                <ErrorMessage name='full_name' component={'p'} className='text-[red]'/>
              </label>
              <label className='block mb-[40px]'>
                <Field
                as={TextField}
                id="outlined-basic" 
                label="Telefon raqamingiz" 
                variant="filled"
                sx={{width: '100%'}}
                name="phone_number"
                placeholder="+998 99 999 99 99"
                autoComplete="off"
                />
                <ErrorMessage name='phone_number' component={'p'} className='text-[red]'/>
              </label>
              <label className='block mb-[40px]'>
                <Field
                as={TextField}
                id="outlined-basic" 
                label="Email" 
                variant="filled"
                sx={{width: '100%'}}
                name="email"
                autoComplete="off"
                />
                <ErrorMessage name='email' component={'p'} className='text-[red]'/>
              </label>
              <label className='block mb-[40px] relative'>
                <Field
                as={TextField}
                id="outlined-basic" 
                label="Parol" 
                variant="filled"
                sx={{width: '100%'}}
                type={isActive ? 'text' : 'password'}
                name="password"
                autoComplete="off"
                />
                 <i onClick={isActivePassword} className={isActive ? 'bx bx-hide absolute text-[35px] right-4 cursor-pointer z-10 top-[10px]' : 'bx bx-show absolute text-[35px] right-4 cursor-pointer z-10 top-[10px]'}></i>
                <ErrorMessage name='password' component={'p'} className='text-[red]'/>
              </label>
              <label className='block mb-[40px]'>
                <Field
                as={TextField}
                id="outlined-basic" 
                label="Parolni tasdiqlash" 
                variant="filled"
                sx={{width: '100%'}}
                type={isActive ? 'text' : 'password'}
                name="verify"
                autoComplete="off"
                />
              </label>
              <Button variant="contained" type='submit' className='w-full block' sx={{mt: "3px", height: '58px', borderRadius: '12px', fontWeight: 700}} disableElevation>Ro'yhatdan o'tish</Button>
              <div className='flex justify-center gap-2 items-center mt-[32px]'>
                   <p className='text-[20px] '>Ro‘yxatdan o‘tganmisiz?</p>
                   <Link to={'/'} className=' text-[20px] font-normal text-[#2389DA]'>Tizimga kirish</Link>
              </div>
            </Form>
        </Formik>
      </div>
      {
        ismodal && <AuthModal state={setverifycod}/>
      }
    </>
  )
}

export default index