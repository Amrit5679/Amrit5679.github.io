import React from "react";
import { Link } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import Header from "./header";
import Footer from "./footer";
import { keyframes } from '@emotion/react';

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LandingPage = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
            background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(119,62,135,1) 63%, rgba(109,58,99,1) 100%)",
            backgroundSize: "400% 400%",
            animation: `${gradientBackground} 5s ease infinite`,
            height: "83vh",
            // width: '1440px',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
        }}
      >
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h2" sx={{fontFamily: 'Roboto', color: 'white'}} gutterBottom>
            The Simplese Way To
          </Typography>
          <Typography variant="h2" sx={{fontFamily: 'Roboto', color: 'white'}} gutterBottom>
            Manage Events
          </Typography>
          <Typography variant="h5" sx={{fontFamily: 'Roboto', color: 'white'}} gutterBottom>
            Manage your events effortlessly
          </Typography>
          <Box sx={{ mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/dashboard"
              sx={{ mx: 2, borderRadius: "25px", color: 'black', backgroundColor: "white" }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/explore"
              sx={{ mx: 2, borderRadius: "25px", color: 'black', backgroundColor: "white" }}
            >
              Explore
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default LandingPage;
