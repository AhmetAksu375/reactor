import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, deleteToken } from '../utils/auth';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = auth 
  ? [
    ]
  : [ 
      { key: 'company/login', label: 'Company Login' },
      
    ];

export default function AdminLoginHeader(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    deleteToken();
    navigate('/login'); // or any path you want after logout
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        REACTOR
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.key} disablePadding>
            {item.key === 'logout' ? (
              <ListItemButton onClick={handleLogout} sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ) : (
              <ListItemButton sx={{ textAlign: 'center' }}>
                <NavLink to={`/${item.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemText primary={item.label} />
                </NavLink>
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            REACTOR
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              item.key === 'logout' ? (
                <ListItemButton key={item.key} onClick={handleLogout} sx={{ textAlign: 'center', display: 'inline-block', color: 'inherit', textDecoration: 'none' }}>
                  {item.label}
                </ListItemButton>
              ) : (
                <NavLink 
                  to={`/${item.key}`} 
                  key={item.key} 
                  style={{ margin: '0 10px', textDecoration: 'none', color: 'inherit' }}
                >
                  {item.label}
                </NavLink>
              )
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          {/* İçerik buraya gelecek */}
        </Typography>
      </Box>
    </Box>
  );
}
