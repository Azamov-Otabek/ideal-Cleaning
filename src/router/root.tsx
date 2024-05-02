import {Clients, Settings, Message, Home, Orders, Services} from "@pages"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
export const root = [
    {
        name: "Asosiy",
        path: "/mainlayout",
        element: <Home/>,
        icon: <HomeOutlinedIcon/>
    },
    {
        path: "/mainlayout/orders",
        element: <Orders/>,
        icon: <ListAltOutlinedIcon/>,
        name: "Buyurtmalar"
    },
    {
        path: "/mainlayout/clients",
        element: <Clients/>,
        icon: <PeopleOutlinedIcon/>,
        name: "Mijozlar"
    },
    {
        path: "/mainlayout/message",
        element: <Message/>,
        icon: <EmailOutlinedIcon/>,
        name: "SMS marketing"
    },
    {
        path: "/mainlayout/services",
        element: <Services/>,
        icon: <SupportAgentOutlinedIcon/>,
        name: "Xizmatlar"
    },
    {
        path: "/mainlayout/settings",
        element: <Settings/>,
        icon: <SettingsOutlinedIcon/>,
        name: "Sozlamalar"
    }

]