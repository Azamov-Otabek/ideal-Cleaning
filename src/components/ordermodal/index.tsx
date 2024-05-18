import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import { TextField } from '@mui/material';
import OrderStore from '../../store/orders';
import { useStore } from 'zustand';

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}


const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SpringModal(props:any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {putOrder}:any = useStore(OrderStore)


    async function postData(e:any){
        e.preventDefault();

        const payload = {
            amount: +e.target[0].value,
            client_phone_number: e.target[2].value,
            client_full_name: e.target[4].value,
            service_id: e.target[6].value
        }
       if(props.method == 'update'){
        payload.id = props?.client?.id
        payload.client_id = props?.client?.client_id
        payload.status = props?.client?.status
        await putOrder(payload)
       }else{
        await props.postData(payload);
       }
    }
  return (
    <>
        <div>
      <button className='bg-[#2389DA] py-[15px] px-[25px] rounded-lg text-[white] font-bold' onClick={handleOpen}>{props.title || 'Order qoshish'}</button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
              <form onSubmit={(e) => postData(e)}>
                <label className='block w-full p-[10px]'>
                    <TextField
                    autoComplete='off'
                    className='w-full'
                    label="Omount kiriting"
                    id='Outlined'
                    variant="outlined"
                    type='number'
                    defaultValue={props?.dataa?.amount || 0}
                    />    
                </label>
                <label className='block w-full p-[10px]'>
                    <TextField
                    autoComplete='off'
                    className='w-full'
                    label="Telefon raqamingizni kiriting:"
                    id='Outlined'
                    variant="outlined"
                    defaultValue={props?.dataa?.client_phonenumber || ''}
                    />    
                </label>
                <label className='block w-full p-[10px]'>
                    <TextField
                    autoComplete='off'
                    className='w-full'
                    label="Ismingizni toliq kiriting"
                    id='Outlined'
                    variant="outlined"
                    defaultValue={props?.dataa?.cliet_full_name || ''}
                    />    
                </label>
                <label className='block w-full p-[10px]'>
                    <select defaultValue={props?.dataa?.service_id || ''}>
                        {
                          props.dataa ? props?.dataa?.map((e:any, i:number) => {
                              return <option key={i} value={e.id}>{e.name}</option>
                          }) : props?.data?.map((e:any, i:number) => {
                              return <option key={i} value={e.id}>{e.name}</option>
                          })
                        }
                    </select>
                </label>
                <button type='submit' className='block mx-auto bg-[#2389DA] py-[15px] px-[25px] rounded-lg text-[white] font-bold '>Qo'shish</button>
              </form>
          </Box>
        </Fade>
      </Modal>
    </div>
    </>
  );
}