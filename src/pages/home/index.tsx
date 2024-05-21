import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '@cocies';
import CommonlyUsedComponents from '../../components/ui/datapicker';
import OrderStore from '../../store/orders';
import { useStore } from 'zustand';
import PieActiveArc from '../../components/ui/reyting';


const index = () => {
  const {get_orders}:any = useStore(OrderStore)
  const navigate = useNavigate();
  const [date, setdate] = useState({
    start: '2024-05-14',
    end: '2024-05-20'
  })
  const [data, setdata] = useState({
    client_count: 0,
    order_count: 0,
    sms_count: 0,
    service_count: 0,
  })

   const propsDataStatus = [
    {id:0 , value: data?.client_count , label: ` ${data?.client_count} ta foydalanuvchi`, color: "#0066ff"},
    {id:1 , value: data?.order_count , label: ` ${data?.order_count} ta buyurtma` , color: "#009900"},
    {id:2 , value: data?.sms_count , label: ` ${data?.sms_count} ta SMS jo‘natildi`},
    {id:3 , value: data?.service_count , label: ` ${data?.service_count} xil xizmat` , color: "#9966ff"},
  ];
  // const propsDataStatus2 = [
  //   {id:0 , value: dataOrder?.all_orders , label: ` ${dataOrder?.all_orders} ta barcha buyurtmalar` , color: "#ccccff"},
  //   {id:1 , value: dataOrder?.in_process , label: ` ${dataOrder?.in_process} ta tozalanmoqda` , color: "#ff5050"},
  //   {id:2 , value: dataOrder?.done , label: ` ${dataOrder?.done} ta tayyor` , color: "#ccff33"},
  //   {id:3 , value: dataOrder?.taken , label: ` ${dataOrder?.taken} ta olib ketildi` , color: "#66ff66"},
  // ];

  const chengData = (start:string, end:string) => {
    setdate(prevState => ({
      ...prevState,
      start: start,
      end: end,
    }))
  }
  // Cantrol User token <-------------------------------------
  useEffect(() => {
    const response = get_orders(date)
    setdata(response?.data)
    if (getCookie("token")) {
      navigate("/mainlayout");
    } else {
      navigate("/signin");
    }
  }, [date, setdate]);

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-



  return (
    <>
    
      <CommonlyUsedComponents chengData={chengData}/>
      <div className="">
        <h1 className="text-[24px] font-bold mb-5">Asosiy</h1>
        <div className="flex items-center justify-between flex-wrap gap-y-4 ">
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center"><CountUp end={423} duration={2}/> ta</h1>
            <p className="text-[30px] font-semibold text-center">Foydalanuvchi</p>
          </div>
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center"><CountUp end={978} duration={2}/> ta</h1>
            <p className="text-[30px] font-semibold text-center">Buyurtma</p>
          </div>
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center"><CountUp end={342} duration={2}/> ta</h1>
            <p className="text-[30px] font-semibold text-center">SMS jo‘natildi</p>
          </div>
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center"><CountUp end={4} duration={2}/> xil</h1>
            <p className="text-[30px] font-semibold text-center">Xizmat</p>
          </div>
        </div>
      </div>
      <PieActiveArc data={propsDataStatus}/>
    </>
  );
};

export default index;