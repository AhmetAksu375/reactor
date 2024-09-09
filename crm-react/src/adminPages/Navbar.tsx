import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom'; // Added useNavigate for navigation
import { auth,deleteToken } from '../../utils/auth'; // Assuming auth is a function or a boolean

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = auth ? ['Dashboard', 'Users', 'Products', 'Orders', 'Logout'] : ['Login', 'Register'];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate(); // For programmatically navigating

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    deleteToken(); // Assuming removeToken deletes the token from storage
    navigate('/admin/login'); // Redirect to login after logout
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          item === 'Logout' ? (
            <button key={item} onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink key={item} to={`/admin/${item.toLowerCase()}`} className="ml-2">
              {item}
            </NavLink>
          )
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
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              item === 'Logout' ? (
                <button key={item} onClick={handleLogout} style={{ marginLeft: '16px', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  Logout
                </button>
              ) : (
                <NavLink key={item} to={`/admin/${item.toLowerCase()}`} className="ml-2">
                  {item}
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
          {/* Main content */}
        </Typography>
      </Box>
    </Box>
  );
}
