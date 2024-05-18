import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { UpdateModal } from '@modals';
import serviceStore from '../../service/service';
import { toast } from 'react-toastify';
import Skeleton from '@mui/material/Skeleton';
import OrderStore from '../../store/orders';
import { useStore } from 'zustand';
import OrderModal from '../ordermodal'

function index(props: any) {
  const { thead, tbody }: any = props;
  const {deleteOrder}:any = useStore(OrderStore)
 
  async function deleteItem(id: any) {
    if(props.name != 'order'){
      const response = await serviceStore.delete(id);
      if (response.status == 200) {
        toast.success('Deleted', { autoClose: 500 });
        setTimeout(() => {
          props.getdata();
        }, 1000);
      } else {
        toast.error('Error', { autoClose: 500 });
      }
    }else if(props.name == 'order'){
        await deleteOrder({ id: id });
        
    }
  }

  const array = [1, 2, 3, 4, 5];

  return (
    <Box>
      <TableContainer>
        {props.isLoading ? (
          <Table>
            <TableBody>
              {array.map((index) => (
                <TableRow key={index}>
                  {thead.map((item: any, index: any) => {
                    return (
                      <TableCell align="left" component={'th'} key={index} className="bg-[#f6f6f6]">
                        <Skeleton animation="wave" width={410} height={25} />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {thead?.map((item: any, index: any) => {
                  return (
                    <TableCell align="left" key={index} className={item.class + ' bg-white'}>
                      <TableSortLabel  hideSortIcon>{item.title}</TableSortLabel>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tbody?.map((item: any, index: any) => {
                return (
                  <TableRow
                    key={index}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    sx={{ cursor: 'pointer' }}
                  >
                    {thead.map((data: any, i: number) => {
                      return (
                        <TableCell
                          align="left"
                          component={'th'}
                          key={i}
                          className={
                            index % 2
                              ? data.class + ' bg-white'
                              : data.class + ' bg-[#f6f6f6]'
                          }
                        >
                          {data.name == 'check' ? (
                            <Checkbox
                              id={item.id}
                              onChange={(e) => props.checkedBox(e)}
                              color="primary"
                              sx={{ width: '5px' }}
                            />
                          ) : data.name == 'id' ? (
                            index + 1
                          ) : data.name == 'action' ? (
                            <div className="flex gap-[30px]">
                              <i onClick={() => deleteItem(item.id)} className="bx bx-basket text-[35px]"></i>{' '}
                              {props.subtitle ? <OrderModal  client={item} dataa={props.subtitle} title='update' method={'update'}/> 
                              :  <UpdateModal email={props.email} getdata={props.getdata} ids={item.id} />}
                            </div>
                          ) : (
                            item[data.name]
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}

export default index;
