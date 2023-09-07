import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import LogoImage from '../assets/logo-gosaas.png'; // Replace with the actual path to your logo image

const AppNavbar = () => {
  return (
    <AppBar position='static' sx={{ backgroundColor: '#3f51b5' }}>
      <Toolbar>
        {/* Image on the left side */}
        <img
          src={LogoImage}
          alt='Logo'
          style={{ width: '50px', marginRight: '16px' }}
        />

        {/* App title */}
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          GoSaaS
        </Typography>

        {/* Notification icon with an avatar */}
        <div style={{ marginRight: '16px' }}>
          <IconButton color='inherit' aria-label='Notifications'>
            <Badge badgeContent={5} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
        <Avatar alt='User Avatar' src='/your-avatar-path.png' />
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
