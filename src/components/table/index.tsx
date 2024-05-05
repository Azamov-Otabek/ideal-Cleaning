import serviceStore from "../../service/service";
import { ToastContainer, toast } from "react-toastify";


function index(props:any) {

  async function deleteData(e:any){
    console.log(props);
    const response = await serviceStore.delete(e.target.id)
    if(response.status == 200){
      toast.success("Mahsulot muvaffaqiyatli o'chirildi", {autoClose: 500})
      setTimeout(() => {
        props.getData()
      }, 800)
    }
  }

  return (
  <>
  <ToastContainer />
      <div>
        <table className="w-full">
            <thead>
               <tr>
                  {
                    props.thead.map((item:any, index:number) => {
                      return (
                        <th className={item.class + ' bg-[#F9F9F9] py-5 font-bold text-[22px] border'} key={index}>{item.title}</th>
                      )
                    })
                  }
               </tr>
            </thead>
            <tbody>
               {
                props?.data?.map((item:any, index:number) => {
                  return (
                    <tr key={index} className={index % 2 ? "bg-[#F9F9F9] py-[10px] border" : 'bg-white border' }>
                      {props.thead.map((itemm:any, indexx:number) => {
                        return (
                          itemm.title == ' ' ? <td key={indexx} className={itemm.class + ' py-4 pl-5 text-center'}><input id={item.id} onChange={(e) => props.checkedBox(e)} type="checkbox" className="w-[25px] h-[25px] opacity-50"/></td> 
                          : itemm.title == "" ? 
                          <td key={indexx} className={itemm.class + ' px-10 '}><button className="py-[8px] px-[14px] bg-[#2389DA] text-white border-none rounded-xl hover:bg-[#3a6e98] duration-200"  id={item.id} onClick={e => deleteData(e)}>delete</button> <button id={item.id} onClick={() => props.updateData(item)} className="py-[8px] px-[14px] bg-[#2a9c39] text-white border-none rounded-xl hover:bg-[#23612c] duration-20">Edit</button></td> 
                          : <td className={itemm.class + ' text-center py-4'} key={indexx}>{item[itemm.name]}</td>
                        )
                      })}   
                    </tr>
                  )
                })
               }
            </tbody>
        </table>
    </div>
  </>
  )
}

export default index