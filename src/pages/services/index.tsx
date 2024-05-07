import { Table } from "@components"
import { useEffect, useState } from "react"
import serviceStore from "../../service/service"
import { MyAccaunt } from "../../interface/settings"
import Cookies from "js-cookie"
import { ServiceAdd } from "@modals"
import { ToastContainer, toast } from "react-toastify"


function index() {
  const [data, setData] = useState([])
  const user:any = Cookies.get('user')
  const user2:MyAccaunt = JSON.parse(user)
  let arrIds:any[] = []
  const [isLoading, setisLoading] = useState(false)

  const thead = [
    { name: 'check', title: '', class: 'w-[1px]'},
    { name: 'id', title: 'T/R', class: 'w-[1px]'},
    { name: 'name', title: 'Xizmat nomi' , class: 'w-[10px]' },
    { name: 'price', title: "Narxi (so‘m)", class: 'w-[10px]' },
    { name: 'countuser', title: "Foydalanishlar soni", class: 'w-[10px]' },
    { name: 'action', title: "", class: 'w-[500px]' }
  ]

  function checkedBox(e:any){
      if(e.target.checked){
        arrIds.push(e.target.id)
      }else{
        arrIds = arrIds.filter((item:any) => item!= e.target.id)
      }
  }

  async function getData(){
    setisLoading(true)
      const payload = {
        page: 1,
        limit: 10,
        owner_email: user2.email,
      };
      const response: any = await serviceStore.get(payload);
      if(response.data.services != null)
          setData(response.data.services);
      else
          setData([])
    setisLoading(false)
   

  }

  useEffect(()=> {
    getData()
  }, [])

  async function deleteAllDatas(){
    if(arrIds.length){
      let response = []
      for(let i = 0; i < arrIds.length; i++){
        response = await serviceStore.delete(arrIds[i])
      }
      if(response.status == 200){
        toast.success("Mahsulotlar muvaffaqiyatli o'chirildi", {autoClose: 700})
        setTimeout(() => {
          getData()
        }, 900);
      }
      arrIds = []
    }else{
      toast.error("O'chirish uchun mahsulot topilmadi !", {autoClose: 1200})
    }
  }

  return (
    <>
    <ToastContainer />
      <div>
      <div className="flex justify-end mb-5 gap-5">
          <button className='bg-[#e44040] py-[15px] px-[25px] rounded-lg text-[white] font-bold' onClick={deleteAllDatas}>Delete All</button>
          <ServiceAdd email={user2.email} getdata={getData}/>
      </div>
      <Table thead={thead} tbody={data} checkedBox={checkedBox} email={user2.email} getdata={getData} isLoading={isLoading}/>
    </div>
    </>
  )
}

export default index