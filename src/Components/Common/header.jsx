// import React, { useState} from 'react';
// import logo from '../../static/Software.jpeg';
// import { Link } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';

// const Header = () => {
//     const [token, setToken] = useState(null);
//     const handleLogout = () => {
//         setToken(null);
//     };
//     const navItems= [
//         {
//             title: "Explore",
//             link: "/explore",
//             show: true,
//         },
//         {
//             title: "Dashboard",
//             link: "/dashboard",
//             show: token ? true : false,
//         },
//         {
//             title: "Login",
//             link: "/auth/login",
//             show: token ? false : true,
//         },
//         {
//             title: "Signup",
//             link: "/auth/signup",
//             show: token ? false : true,
//         },
//     ];

//     return (
//         <AppBar position="fixed">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             <img src={logo} alt="Logo" style={{ height: '90px',width: '200px', verticalAlign: 'middle' }} />
//           </Typography>
//           <Box sx={{ display: 'flex', justifyItems:"flex-end",padding:'10px' }}>
//             {navItems.map((item, index) => (
//               item.show && (
//                 item.title === "Logout" ? (
//                   <Button key={index} color="inherit" onClick={handleLogout}>{item.title}</Button>
//                 ) : (
//                   <Button key={index} color="inherit" component={Link} to={item.link}>{item.title}</Button>
//                 )
//               )
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//     )
// }

// export default Header;

import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" color="transparent" sx={{ backdropBlur: '10px'}}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Event Management
        </Typography>
        <Button color="inherit" component={Link} to="/explore">
          Explore
        </Button>
        <Button color="inherit" component={Link} to="/auth/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/auth/signup">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
