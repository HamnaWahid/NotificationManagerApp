import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';

const Footer: React.FC = () => {
  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    padding: '10px',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '20px',
  };

  const iconStyle = {
    marginLeft: '10px',
    marginRight: '10px',
    color: 'white', // Set the color to white
  };

  const rightContentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align items to the right
    width: '100%', // Make the right content take up the remaining width
  };

  return (
    <div style={footerStyle}>
      <div style={rightContentStyle}>
        <span style={{ fontSize: '14px', color: 'white', marginLeft: '10px' }}>
          Follow us on:
        </span>
        <IconButton
          style={iconStyle}
          aria-label='Facebook'
          component='a'
          href='https://www.facebook.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          style={iconStyle}
          aria-label='Instagram'
          component='a'
          href='https://www.instagram.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          style={iconStyle}
          aria-label='GitHub'
          component='a'
          href='https://github.com/HamnaWahid'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHubIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Footer;
