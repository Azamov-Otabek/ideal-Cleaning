import { Table } from "@components"
import { useEffect, useState } from "react"
import serviceStore from "../../service/service"
import { MyAccaunt } from "../../interface/settings"
import Cookies from "js-cookie"
import { ToastContainer, toast } from "react-toastify"
import OrderStore from "../../store/orders"
import { useStore } from "zustand"
import OrderModal from '../../components/ordermodal'


function index() {
  const [data, setData] = useState([])
  const user:any = Cookies.get('user')
  const user2:MyAccaunt = JSON.parse(user)
  let arrIds:any[] = []
  const [isLoading, setisLoading] = useState(false)
  const [ispage, setisPage] = useState(1)
  const {getOrder, order, postOrder, deleteOrder}:any = useStore(OrderStore)
  const [search, setsearch] = useState('')

  const thead = [
    { name: 'check', title: '', class: 'w-[1px]'},
    { name: 'id', title: 'T/R', class: 'w-[1px]'},
    { name: 'created_at', title: 'Yaratilgan vaqti' , class: 'w-[200px]' },
    { name: 'price', title: "Narxi (so‘m)", class: 'w-[120px]' },
    { name: 'amount', title: "Amount", class: 'w-[120px]' },
    { name: 'status', title: 'Status', class: 'w-[120px]'},
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
        limit: 100,
        owner_id: user2.id,
      };
      const response: any = await serviceStore.get(payload);
      if(response.data.services != null)
          setData(response.data.services);
      else
          setData([])
      
      const payloadd = {
        page: ispage,
        limit: 5,
      };
      getOrder(payloadd)
    setisLoading(false)
   

  }

  useEffect(()=> {
    getData()
  }, [ispage, search])

  async function deleteAllDatas(){
    if(arrIds.length){
      let response = []
      for(let i = 0; i < arrIds.length; i++){
        response = await deleteOrder({id: arrIds[i]})
      }
      arrIds = []
      getData()
    }else{
      toast.error("O'chirish uchun mahsulot topilmadi !", {autoClose: 1200})
    }
  }

  return (
    <>
    <ToastContainer />
      <div>
      <div className="flex justify-end mb-5 gap-5">
          <input type="search" onChange={(e) => setsearch(e.target.value)} className="rounded-xl px-[20px] outline-none text-[18px]"/>
          <button className='bg-[#e44040] py-[15px] px-[25px] rounded-lg text-[white] font-bold' onClick={deleteAllDatas}>Delete All</button>
          <OrderModal data={data} postData={postOrder}/>
      </div>
      <Table subtitle={data} name={'order'} thead={thead} tbody={order} checkedBox={checkedBox} email={user2.id} getdata={getData} isLoading={isLoading}/>
      <div className="flex items-center justify-center gap-5 mt-5">
        {ispage == 1 ? <button className="text-[20px] py-[8px] px-[20px] bg-[#2389DA] text-[white] font-bold rounded-xl" disabled>-</button> : <button className="text-[20px] py-[8px] px-[20px] bg-[#2389DA] text-[white] font-bold rounded-xl" onClick={()=> setisPage(ispage-1)}>-</button>}
        <h1 className="text-[20px]">{ispage}</h1>
        {ispage == 4 ? <button className="text-[20px] py-[8px] px-[20px] bg-[#2389DA] text-[white] font-bold rounded-xl" disabled>+</button> : <button className="text-[20px] py-[8px] px-[20px] bg-[#2389DA] text-[white] font-bold rounded-xl" onClick={()=> setisPage(ispage+1)}>+</button>}
      </div>
    </div>
    </>
  )
}

export default index