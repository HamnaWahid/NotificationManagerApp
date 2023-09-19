import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../assets/logo.png';
import AvatarImage from '../assets/your-avatar-path.png';

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleLogoClick = () => {
    // Navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <AppBar position='static' sx={{ backgroundColor: '#3f51b5' }}>
      <Toolbar>
        {/* Logo image wrapped with an anchor tag */}
        <a href='/dashboard' onClick={handleLogoClick}>
          <img
            src={LogoImage}
            alt='Logo'
            style={{ width: '100px', marginRight: '16px' }}
          />
        </a>

        <Typography sx={{ flexGrow: 1 }}></Typography>

        <div style={{ marginRight: '16px' }}>
          <Tooltip title='Notifications'>
            <IconButton color='inherit' aria-label='Notifications'>
              <Badge badgeContent={5} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </div>

        <Tooltip title='Logout'>
          <IconButton
            color='inherit'
            aria-label='Logout'
            onClick={handleLogout}
          >
            <Avatar alt='User Avatar' src={AvatarImage} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
