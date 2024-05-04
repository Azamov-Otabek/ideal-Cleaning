import { useState } from "react"
import serviceDataStore from "../../store";



function index(props:any) {
  const { pushData }  = serviceDataStore()
  let ids = [];
  const {data, thead, setaldelete} = props
  function checkedBox(e:any){
      if(ids.includes(e.target.id)){
        const id2 = ids.filter((el) => el !== e.target.id)
        ids = [...id2]
      }else{
        ids.push(e.target.id)
      }
      pushData(ids)
  }

  return (
    <div>
        <table className="w-full">
            <thead>
               <tr>
                  {
                    thead.map((item, index) => {
                      return (
                        <th className={item.class + ' bg-[#F9F9F9] py-5 font-bold text-[22px] border'} key={index}>{item.title}</th>
                      )
                    })
                  }
               </tr>
            </thead>
            <tbody>
               {
                data.map((item:any, index) => {
                  return (
                    <tr key={index} className={index % 2 ? "bg-[#F9F9F9] py-[10px] border" : 'bg-white border' }>
                      {thead.map((itemm:any, indexx) => {
                        return (
                          itemm.title == ' ' ? <td key={indexx} className={itemm.class + ' py-4 pl-5 text-center'}><input id={item.id} onChange={(e) => checkedBox(e)} type="checkbox" className="w-[25px] h-[25px] opacity-50"/></td> 
                          : itemm.title == "" ? 
                          <td key={indexx} className={itemm.class + ' px-10 '}><button className="py-[8px] px-[14px] bg-[#2389DA] text-white border-none rounded-xl hover:bg-[#3a6e98] duration-200">delete</button> <button className="py-[8px] px-[14px] bg-[#2a9c39] text-white border-none rounded-xl hover:bg-[#23612c] duration-20">Edit</button></td> 
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
  )
}

export default index