import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import user_img from "@images/user_img.png";
import Logo from '@images/Logo.svg';
import {root} from '../router/root.tsx'
import './style.scss'
import Cookies from 'js-cookie';
const drawerWidth = 400;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {

  // APP Bar STYLES -----------------------------
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Search STYLE ------------------------------------
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '40ch',
        },
      },
    },
  }));

  const { pathname } = useLocation()
  const drawer = (
    <div className='bg-white'>
      <Toolbar className='mt-[21px] pb-[22px] pl-[68px]'>
       <Link to={'/mainlayout'}> <img src={Logo} alt="" /></Link>
      </Toolbar>
      <div className='mt-[63px]'>
        <List>
          {root.map((text, index) => (
            <ListItem key={index} disablePadding>
              <NavLink to={text.path} className={text.path === pathname ? "bg-[#2389DA] text-white mb-[40px] w-[360px] mr-8 ml-6 rounded-2xl": 'mb-[40px] w-[360px] mr-8 ml-6 rounded-2xl'}>
                  <div className='flex sm:ml-[50px] h-[71px] items-center px-[20px]'>
                      <ListItemIcon className={text.path === pathname ? 'rasm': ''}>{text.icon}</ListItemIcon>
                      <h1 className='text-[16px] sm:text-[24px] font-semibold'>{text.name}</h1>
                  </div>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );

  // USER PROFIL STYLES ----------------------------------------------------------------
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate()
  const goLogOut = () => {
    handleMenuClose();
    Cookies.remove('token')
    navigate('/')
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={myAccaunt}>My account</MenuItem>
      <MenuItem onClick={goLogOut}>Logout</MenuItem>
    </Menu>
  );

  if(!Cookies.get('token')){
    navigate('/')
  }

  function myAccaunt() {
    navigate('settings')
  }



  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#F9F9F9",
          boxShadow: "0 0 0 0px",
        }}
      >
        <Toolbar>
          <div className='pl-[47px] flex py-[30px] justify-between w-full'> 
            <div className='flex'>
              <IconButton
              color="inherit"  
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }, color: 'black'}}
            >
              <MenuIcon />
              </IconButton>       
            <Search sx={{display: {xs: 'none', sm:'flex'}, background: "#E2E2E2"}}>
              <SearchIconWrapper>
                <SearchIcon sx={{color: '#767676'}}/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Qidiruv"
                inputProps={{ 'aria-label': 'search' }}
                sx={{color: '#767676'}}
              />
            </Search>
            </div>
            <div className='flex gap-5 items-center'>
              <IconButton
                sx={{color: "black"}}
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <img src={user_img}
                onClick={handleProfileMenuOpen}
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup="true"
                className=' cursor-pointer'
                />
            </div>
          </div>

        </Toolbar>
      </AppBar>
      {renderMenu}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, background: "#F9F9F9"}}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
  
      <Box
        className='bg-[#E2E2E2]'
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
       <div className='w-full h-screen'>
        <div className='py-[68px] px-[57px] h-screen max-w-[1600px] mx-auto'>
            <Outlet />
          </div>
       </div>
      </Box>
    </Box>
  );
}

