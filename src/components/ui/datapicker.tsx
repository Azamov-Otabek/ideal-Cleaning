import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LicenseInfo } from '@mui/x-data-grid-pro';
LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

export default function CommonlyUsedComponents(props:any) {
  function handlechange(e:any){
    const start =e[0]?.format('YYYY-MM-DD')
    const end = e[1]?.format('YYYY-MM-DD')
    if(start && end)
      props.chengData(start, end)
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DateRangePicker',
        ]}
      >
        <DemoItem
          component="DateRangePicker"
        >
          <DateRangePicker
          format='YYYY-MM-DD'
            onChange={handlechange}
            localeText={{
              start: '',
              end: '',
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}