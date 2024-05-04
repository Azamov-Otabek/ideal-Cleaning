import {Formik, Form, Field, ErrorMessage} from 'formik'
import { TextField } from '@mui/material'
import Cookies from 'js-cookie'
import { MyAccaunt, UpdatePassword } from '../../interface/settings'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import authStore from '@servicesAuth';
import { useState } from 'react';

function index() {
  const user:any = Cookies.get('user')
  const user2:MyAccaunt = JSON.parse(user)
  const [isActive, setActive] = useState(false)
  const [isActive1, setActive1] = useState(false)
  const [isActive2, setActive2] = useState(false)
  const initialValue = {
    password: '',
    new_password: '',
    verify_password: ''
  }
  const validatetionNewPassword = yup.object().shape({
    new_password: yup.string().min(8, "Parolingiz 8 tadan kam bo'lmasin !").matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Parol kamida bitta katta harf, bitta kichik harf, bitta raqam va bitta maxsus belgidan iborat bo'lishi kerak").required("Iltimos so'rovni to'ldiring !"),
    password: yup.string().required("Iltimos so'rovni to'ldiring !"),
    verify_password: yup.string().required("Iltimos so'rovni to'ldiring !"),
  })

  async function handle_submit(value:UpdatePassword){
    if(value.password == user2.password){
      if(value.new_password == value.verify_password){
        const email = {
          email: user2.email,
          password: value.new_password
        }
        const response = await authStore.updatePassword(email)
        response.status == 201 && toast.success("Parol muvaffaqiyatli o'zgartirildi")
      }
      else{
        toast.error("Tasdiqlash parolingizni to'g'ri kiriting !")
      }
    }else{
      toast.error("Parolingizni to'g'ri kiriting !")
    }
  }
  return (
    <>
      <ToastContainer />
      <div className='bg-white h-screen flex justify-center pt-[100px]'>
        <Formik initialValues={initialValue} validationSchema={validatetionNewPassword} onSubmit={handle_submit} >
            <Form>
                <label className='block mb-[30px] w-[700px]'>
                  <Field
                    sx={{width:{sx: '200px', sm:"300px", lg:'100%' }}}
                    disabled={true}
                    as={TextField}
                    label="Ismingiz"
                    value={user2.full_name}
                    id="filled-disabled"
                    variant="filled"  
                  />
                </label>
                <label className='block mb-[30px] w-[700px]'>
                  <Field
                    sx={{width:{sx: '200px', sm:"300px", lg:'100%' }}}
                    disabled={true}
                    as={TextField}
                    label="Emailingiz"
                    value={user2.email}
                    id="filled-disabled"
                    variant="filled"  
                  />
                </label>
                <label className='block mb-[30px] w-[700px]'>
                  <Field
                    sx={{width:{sx: '200px', sm:"300px", lg:'100%' }}}
                    disabled={true}
                    as={TextField}
                    label="Telefon raqamingiz"
                    value={user2.phone_number}
                    id="filled-disabled"
                    variant="filled"  
                  />
                </label>
                <label className='block mb-[30px] w-[700px]'>
                  <Field
                    sx={{width:{sx: '200px', sm:"300px", lg:'100%' }}}
                    disabled={true}
                    as={TextField}
                    label="Akkaunt yaratildi"
                    value={user2.created_at}
                    id="filled-disabled"
                    variant="filled"  
                  />
                </label>
                <label className='block mb-[30px] w-[700px]'>
                  <Field
                    sx={{width:{sx: '200px', sm:"300px", lg:'100%' }}}
                    disabled={true}
                    as={TextField}
                    label="Akkaunt yangilandi"
                    value={user2.updated_at}
                    id="filled-disabled"
                    variant="filled"  
                  />
                </label>
                <div className='sx:w-[200px] sm:w-[300px] lg:w-[700px] w-[200px]'>
                  <Accordion sx={{background: "#E0E0E0", color: '#8B8B8B'}}>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>Parolni o'zgartirish</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <label className='block mb-[30px]  relative'>
                        <Field
                       type={isActive ? 'text' : 'password'}
                          autoComplete="off"
                          sx={{width:{sx: '200px', sm:"300px", lg:'100%' }}}
                          as={TextField}  
                          label="Eski parolingizni kiriting"
                          id="filled-disabled"
                          variant="filled"  
                          name="password"
                        />
                        <ErrorMessage name='password' component={'p'} className=' text-[red] font-semibold'/>
                        <i onClick={() => setActive(!isActive)} className={isActive ? 'bx bx-hide absolute text-[35px] right-4 cursor-pointer z-10 top-[10px]' : 'bx bx-show absolute text-[35px] right-4 cursor-pointer z-10 top-[10px]'}></i>
                    </label>
                    <label className='block mb-[30px] relative'>
                        <Field
                       type={isActive1 ? 'text' : 'password'}
                         autoComplete="off"
                          sx={{width:{sx: '200px', sm:"300px", lg:'100%' }}}
                          as={TextField}  
                          label="Yangi parol kiriting"
                          id="filled-disabled"
                          variant="filled"  
                          name='new_password'
                        />
                        <ErrorMessage name='new_password' component={'p'} className=' text-[red] font-semibold'/>
                        <i onClick={() => setActive1(!isActive1)} className={isActive1 ? 'bx bx-hide absolute text-[35px] right-4 cursor-pointer z-10 top-[10px]' : 'bx bx-show absolute text-[35px] right-4 cursor-pointer z-10 top-[10px]'}></i>
                    </label>
                    <label className='block mb-[30px] relative'>
                        <Field
                        type={isActive2 ? 'text' : 'password'}
                          autoComplete="off"
                          sx={{width:{sx: '200px', sm:"300px", lg:'100%' }}}
                          as={TextField}  
                          label="Tasdiqlash uchun parolni qayta kiriting"
                          id="filled-disabled"
                          variant="filled" 
                          name='verify_password' 
                        />
                         <i onClick={() => setActive2(!isActive2)} className={isActive2 ? 'bx bx-hide absolute text-[35px] right-4 cursor-pointer z-10 top-[10px]' : 'bx bx-show absolute text-[35px] right-4 cursor-pointer z-10 top-[10px]'}></i>
                        <ErrorMessage name='verify_password' component={'p'} className=' text-[red] font-semibold'/>
                        
                    </label>
                    <div className='flex justify-end'>
                      <Button type='submit' variant="contained">Tasdiqlash</Button>
                    </div>
                    </AccordionDetails>
                    </Accordion>  
                </div>
            </Form>
        </Formik>
      </div>
    </>
  )
}

export default index