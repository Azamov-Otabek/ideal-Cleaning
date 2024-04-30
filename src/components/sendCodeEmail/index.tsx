import { useState } from "react"
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function index(props:any) {
  const schema = yup.object().shape({
    email: yup.string().email("Emailni to'g'ri kiriting !").required()
  });
  const [cod, setCod] = useState(0)

  async function verifyButton(){
   const email = {
    email : cod
   }
   try {
    await schema.validate(email);
    props.state(cod)
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      toast.error("Emailni to'g'ri kiriting!", {autoClose: 1200});
    }
  }
   
  }



  return (
    <>
      <ToastContainer/>
      <div className='absolute top-0 left-0 w-full bg-white h-[100vh] z-20'>
      <Link to={'/'} className='absolute top-[100px] left-[145px] flex items-center'>
          <i className='bx bx-arrow-back text-[50px] '></i>
          <p className='text-[30px] font-semibold'>ortga</p>           
      </Link>
      <div className='w-[1200px] mx-auto mt-[311px] rounded-xl'>
            <p className="text-[56px] font-bold text-[black] text-center mb-[14px]">Parolni tiklash</p>
            <p className="text-[40px] font-semibold text-[black] mb-[62px] text-center">Sizga kod yuborishimiz uchun email’ingizni kiriting</p>
           <div className="w-[537px] mx-auto">
           <TextField autoComplete="off" className="block w-[537px]" sx={{margin: "0 auto"}} label="Emailni kiriting" variant="filled" onChange={(e) => setCod(e.target.value)}/>
           </div>
           <button onClick={verifyButton} className=" block w-[537px] mx-auto bg-[#2389DA] text-white font-bold py-[24px] mt-[20px] rounded-xl">Kod yuborish</button>
      </div>
    </div>
    </>
  )
}

export default index