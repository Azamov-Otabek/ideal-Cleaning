import { useState } from "react"

function index(props:any) {
  const [cod, setCod] = useState(0)
  function verifyButton(){
    props.state(cod)
  }

  return (
    <div className='absolute top-0 left-0 w-full bg-white h-[100vh] z-20'>
      <div className='w-[500px] mx-auto shadow-xl border mt-[250px] p-[50px] rounded-xl'>
            <p className="text-[25px] font-bold text-[#2389DA]">Emailingizga kod yuborildi </p>
            <input onChange={(e) => setCod(e.target.value)} className="block w-full p-3 mt-4 rounded-xl outline-[#00000016] " type="text" placeholder="Kodni kiriting"/>
            <button onClick={verifyButton} className="block w-full bg-[#2389DA] text-white font-bold py-[10px] mt-[20px] rounded-xl">Tasdiqlash</button>
      </div>
    </div>
  )
}

export default index