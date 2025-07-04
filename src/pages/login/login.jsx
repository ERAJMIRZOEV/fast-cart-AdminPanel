import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Container,
  Grid,
  Paper
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  ShoppingCart
} from '@mui/icons-material';

import loginIcon from '../../assets/loginIcon.png'
import { useDispatch } from 'react-redux';
import { login } from '../../api/authApi/authApi'
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  function loginAdmin(){
    const user = {
      userName: email,
      password: password
    }
    dispatch(login(user))
    navigate('/dashboard')  
  }

  return (
    <Box sx={{
      height: '100dvh',
      width: '100dvw',
      display: 'flex',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      m: 0,
      p: 0,
      minHeight: '100dvh',
      minWidth: '100dvw',
      boxSizing: 'border-box',
    }}>
     
       <img src={loginIcon} alt="" />

      
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 4,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'left'
            }}
          >
            Log in
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Login"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#2196f3',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2196f3',
                  },
                }
              }}
              InputLabelProps={{
                sx: { color: '#666' }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#2196f3',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2196f3',
                  },
                }
              }}
              InputLabelProps={{
                sx: { color: '#666' }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: '#666' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Link 
                href="#" 
                sx={{ 
                  color: '#2196f3',
                  textDecoration: 'none',
                  fontSize: '14px',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              onClick={loginAdmin}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#2196f3',
                color: 'white',
                padding: '12px',
                fontSize: '16px',
                fontWeight: 'medium',
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
                '&:active': {
                  backgroundColor: '#1565c0',
                }
              }}
            >
              Log in
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;