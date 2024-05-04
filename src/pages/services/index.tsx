import { Table } from "@components"
import { useEffect, useState } from "react"
import serviceStore from "../../service/service"
import { MyAccaunt } from "../../interface/settings"
import Cookies from "js-cookie"
import { ServiceAdd } from "@modals"
import { ToastContainer, toast } from "react-toastify"
import serviceDataStore from "../../store"


function index() {
  const [data, setData] = useState([])
  const [allDelete, setallDelete] = useState(false)
  const { dataAllDelete } = serviceDataStore()
  const user:any = Cookies.get('user')
  const user2:MyAccaunt = JSON.parse(user)
  console.log(dataAllDelete);

  const thead = [
    { name: 'checkbox', title: ' ', class: 'w-[30px] '},
    { name: 'name', title: 'Xizmat nomi' , class: 'w-[60px]' },
    { name: 'price', title: "Narxi (so‘m)", class: 'w-[120px]' },
    { name: 'countuser', title: "Foydalanishlar soni", class: 'w-[100px]' },
    { name: 'buttons', title: "", class: 'w-[300px]' }
  ]
  
  async function deleteDatas(data:any) {
    let response = ''
    for (let i = 0; i < data.length; i++) {
        response = await serviceStore.delete(data.i)
    }
    if(response.status == 200) {
      toast.success("Mahsulotlar muvaffaqiyatli o'chirildi", {autoClose: 1200})
      getData()
    }
  }

  async function getData(){
      const payload = {
        page: 1,
        limit: 10,
        owner_email: user2.email,
      };
      const response: any = await serviceStore.get(payload);
      setData(response.data.services);
  }

  useEffect(()=> {
    getData()
  }, [])

  return (
    <>
    <ToastContainer />
      <div>
      <div className="flex justify-end mb-5">
         {allDelete && <button>DELETE</button>}
         <ServiceAdd email={user2.email} getdata={getData}/>
      </div>
      <Table data={data} thead={thead} setaldelete={setallDelete} />
    </div>
    </>
  )
}

export default index