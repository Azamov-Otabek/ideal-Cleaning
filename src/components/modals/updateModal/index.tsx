import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import { TextField } from '@mui/material';
import serviceStore from '../../../service/service';
import { toast } from 'react-toastify';

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

interface propsemail{
    email: any;
    getdata: () => any;
    ids: string;
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

export default function SpringModal(props:propsemail) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    async function postData(e:any){
        e.preventDefault();
        const payload = {
            id: props.ids,
            name: e.target[0].value,
            price: +e.target[2].value,
            owner_id: props.email
        }
        console.log(payload);
        const response = await serviceStore.put(payload)
        if(response.status == 201){
          toast.success("Muvaffaqiyatli o'zgartirildi", {autoClose: 500})
            setTimeout(() => {
              props.getdata()
              handleClose()
            }, 700)
          }
        handleClose()
    }
  return (
    <>
        <div>
          <button><i onClick={handleOpen} className='bx bx-edit-alt text-[35px]' ></i> </button>
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
                    label="Xizmat nomini kiriting"
                    id='Outlined'
                    variant="outlined"
                    placeholder={props.email.name}
                    />    
                </label>
                <label className='block w-full p-[10px]'>
                    <TextField
                    autoComplete='off'
                    className='w-full'
                    label="Xizmat narxini kiriting"
                    id='Outlined'
                    variant="outlined"
                    type='number'
                    placeholder={props.email.price}
                    />    
                </label>
                <button type='submit' className='block mx-auto bg-[#2389DA] py-[15px] px-[25px] rounded-lg text-[white] font-bold '>O'zgartirish</button>
              </form>
          </Box>
        </Fade>
      </Modal>
    </div>
    </>
  );
}