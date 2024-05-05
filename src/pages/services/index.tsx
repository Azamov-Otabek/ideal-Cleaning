import { Table } from "@components"
import { useEffect, useState } from "react"
import serviceStore from "../../service/service"
import { MyAccaunt } from "../../interface/settings"
import Cookies from "js-cookie"
import { ServiceAdd, UpdateModal } from "@modals"
import { ToastContainer, toast } from "react-toastify"


function index() {
  const [data, setData] = useState([])
  const user:any = Cookies.get('user')
  const user2:MyAccaunt = JSON.parse(user)
  let arrIds:any[] = []
  const [update, setupdate] = useState({})
  const [updateModal, setupdateModal] = useState(false)

  const thead = [
    { name: 'checkbox', title: ' ', class: 'w-[30px] '},
    { name: 'name', title: 'Xizmat nomi' , class: 'w-[60px]' },
    { name: 'price', title: "Narxi (so‘m)", class: 'w-[120px]' },
    { name: 'countuser', title: "Foydalanishlar soni", class: 'w-[100px]' },
    { name: 'buttons', title: "", class: 'w-[300px]' }
  ]

  function checkedBox(e:any){
      if(e.target.checked){
        arrIds.push(e.target.id)
      }else{
        arrIds = arrIds.filter((item:any) => item!= e.target.id)
      }
  }

  async function getData(){
      const payload = {
        page: 1,
        limit: 10,
        owner_email: user2.email,
      };
      const response: any = await serviceStore.get(payload);
      if(response.data.services != null)
          setData(response.data.services);
   

  }


  async function updateData(e:any){
    const payload = {
      id: e.id,
      owner_email: user2.email,
      name: e.name,
      price: e.price
    }
    setupdate(payload);
    setupdateModal(true)
  }

  useEffect(()=> {
    getData()
    setupdateModal(false)
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
        }, 1600);
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
          {updateModal && <UpdateModal getdata={getData} email={update}/>}
          <button className='bg-[#e44040] py-[15px] px-[25px] rounded-lg text-[white] font-bold' onClick={deleteAllDatas}>Delete All</button>
          <ServiceAdd email={user2.email} getdata={getData}/>
      </div>
      <Table data={data} thead={thead} checkedBox={checkedBox} getData={getData} updateData={updateData} />
    </div>
    </>
  )
}

export default index