import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '17px', 
        background: 'white', 
        color: 'black', 
        mt: 'auto',
      }}
    >
      <Typography variant="body2" align="center">
        Developed by {' '}
        <MuiLink href="www.linkedin.com/in/amrit-mishra-1b8bb518a" target="_blank" rel="noopener" sx={{ color: 'inherit' }}>
          Amrit Mishra
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Footer;
