// src/pages/management/Sidebar.jsx
import { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { deleteToken } from '@/utils/auth';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/store/userSlice';
import { authController } from '@/utils/jwtHelper';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptIcon from '@mui/icons-material/Receipt';
const controlrole = authController();
const drawerWidth = 240;
const isEmployee = controlrole?.aud === 'employee';
const isCompany = controlrole?.aud === 'company';
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Sidebar() {

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook'u burada kullanılıyor
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Yeni menü öğesi ve yönlendirme işlemi
  const handleNavigateToAddUser = (path:string) => {
    navigate(path); // '/company/adduser' yoluna yönlendirme yapılır
  };

  const { unique_name } = useSelector((state: RootState & { user: { unique_name: string } }) => state.user);
  const { departmant } = useSelector((state: RootState & { user: { departmant: string } }) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => { 
    dispatch(clearUser());
    deleteToken();
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      {/* <DrawerAppBar key={} /> */}
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon /> 
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {unique_name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader 
              >
          <div className='flex flex-col py-3 justify-start w-full' >
            <div className='text-lg  flex'>
            {/* <p className='font-semibold'>Role : </p>  <span className='pl-2'>{ departmant.length > 11 ? departmant.slice(0,12) + ".." : departmant} </span> */}
            <p className='font-semibold'>Role : </p>  <span className='pl-2'>{ departmant} </span>
            </div>
            <div style={{ display: !open ? 'none' : 'flex' }} className='text-lg flex'>
            <p  className='font-semibold'>Type : </p>  <span className='pl-2'>{(controlrole?.aud ?? '').charAt(0).toUpperCase() + (controlrole?.aud ?? '').slice(1)} </span>
            </div>
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />        
        <List>          
          {/* Yeni AddUser menü öğesi */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => handleNavigateToAddUser('/')} // onClick ile yönlendirme fonksiyonunu çağırıyoruz
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: 'initial',
                    }
                  : {
                      justifyContent: 'center',
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: 'auto',
                      },
                ]}
              >
                <HomeIcon /> {/* Bu ikonu ihtiyaçlarınıza göre değiştirebilirsiniz */}
              </ListItemIcon>
              <ListItemText
                primary="Main Page" // Menüde görünen metin
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: isEmployee || isCompany ? 'block' : 'none'}}>
            <ListItemButton
              onClick={()=>handleNavigateToAddUser('/company/addwork')} // onClick ile yönlendirme fonksiyonunu çağırıyoruz
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: 'initial',
                    }
                  : {
                      justifyContent: 'center',
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: 'auto',
                      },
                ]}
              >
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText
                primary="Work Request"
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: isEmployee ? 'none' : 'block'}}>
            <ListItemButton
              onClick={()=>handleNavigateToAddUser('/company/usertransections')} 
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: 'initial',
                    }
                  : {
                      justifyContent: 'center',
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: 'auto',
                      },
                ]}
              >
                <ManageAccountsIcon /> 
              </ListItemIcon>
              <ListItemText
                primary="User Transections"
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: isEmployee || isCompany ? 'block' : 'none'}}>
            <ListItemButton
              onClick={()=>handleNavigateToAddUser('/company/bills')} // onClick ile yönlendirme fonksiyonunu çağırıyoruz
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: 'initial',
                    }
                  : {
                      justifyContent: 'center',
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: 'auto',
                      },
                ]}
              >
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText
                primary="Bills"
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={handleLogout}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: 'initial',
                    }
                  : {
                      justifyContent: 'center',
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: 'auto',
                      },
                ]}
              >
                <LogoutIcon /> {/* Bu ikonu ihtiyaçlarınıza göre değiştirebilirsiniz */}
              </ListItemIcon>
              <ListItemText
                primary="Logout" // Menüde görünen metin
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
            
        </List>
      </Drawer>
      
    </Box>
  );
}
