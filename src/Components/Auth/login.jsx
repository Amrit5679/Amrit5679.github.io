import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider,db} from '../../Firebase/firebase';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { login, setAuthState } from '../../Redux/Actions/auth';
import { useSelector,useDispatch } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const theme = createTheme({
  palette: {
    background: {
      default: 'rgba(119,62,135,1)', 
    },
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoggedIn}=useSelector((state) => state.auth);

  const handleLogin = async (event) => {
      event.preventDefault();
      const loginError=await dispatch(login(email,password));
      if(loginError){
        setError(loginError);
        return;
      }
      const user=auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'Users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(setAuthState({ isLoggedIn: true, user: userData }));
            navigate('/dashboard');
          } else {
            setError('User data not found!!');
          }
        } catch (err) {
          console.error('Error fetching user data:', err.message);
          setError('Error fetching user data.');
        }
      } else {
        setError('User is not authenticated.');
      }
  };
  
  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, 'Users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(setAuthState({ isLoggedIn: true, user: userData }));
      } else {
        const newUser = {
          email: user.email,
          firstName: user.displayName.split(' ')[0],
          lastName: user.displayName.split(' ')[1],
          userId: user.uid,
        };
        await setDoc(doc(db, 'Users', user.uid), newUser);
        dispatch(setAuthState({ isLoggedIn: true, user: newUser }));
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in with social provider:', error.message);
      setError(error.message);
    }
  };

  const handleGoogleLogin = () => handleSocialLogin(googleProvider);
  const handleFacebookLogin = () => handleSocialLogin(facebookProvider);


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{backgroundColor:'white', borderRadius: '20px'}} >
        <CssBaseline />
        <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',padding:'10px'}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Sign in
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "purple",  borderRadius: '15px' }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{ mt: 1, mb: 1, backgroundColor: "purple",  borderRadius: '15px' }}

            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<FacebookIcon />}
              onClick={handleFacebookLogin}
              sx={{ mt: 1, mb: 1, backgroundColor: "purple",  borderRadius: '15px' }}

            >
              Sign in with Facebook
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
