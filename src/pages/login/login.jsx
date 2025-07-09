import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Link,
  InputAdornment,
  IconButton,
  Fade,
  Grow
} from '@mui/material';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { login } from '../../api/authApi/authApi';
import { useNavigate } from 'react-router-dom';
import loginIcon from '../../assets/loginIcon.png';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  async function loginAdmin() {
    setLoading(true);
    const user = {
      userName: email,
      password: password
    };

    try {
      await dispatch(login(user));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Fade in={true} timeout={800}>
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
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
        background: 'linear-gradient(135deg, #f6f9fc, #f0f4f8)',
        transition: 'all 0.5s ease'
      }}>
        <Grow in={true} timeout={1000}>
          <Box sx={{
            flex: 1,
            backgroundImage: `url(${loginIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            '@media (max-width: 900px)': {
              display: 'none'
            }
          }} />
        </Grow>

        <Grow in={true} timeout={1200}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              '@media (max-width: 900px)': {
                padding: 2,
                width: '100%'
              }
            }}
          >
            <Box sx={{
              width: '100%',
              maxWidth: 450,
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
              '&:hover': {
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.16)'
              }
            }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 4,
                  fontWeight: '800',
                  color: '#1a2b49',
                  textAlign: 'left',
                  letterSpacing: '-0.5px',
                  lineHeight: '1.2',
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                  background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Welcome Back
              </Typography>

              <Typography variant="body1" sx={{
                mb: 4,
                color: '#5a6b82',
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}>
                Sign in to continue to your dashboard
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Username"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    mb: 3,
                    backgroundColor: 'rgba(240, 244, 248, 0.6)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    input: { 
                      color: '#1a2b49',
                      padding: '14px 16px',
                      fontSize: '16px'
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s ease'
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(33, 150, 243, 0.4)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2196f3',
                        boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)'
                      },
                    }
                  }}
                  InputLabelProps={{
                    sx: { 
                      color: '#7a8ba6',
                      fontWeight: '500',
                      transform: 'translate(16px, 16px) scale(1)',
                      '&.Mui-focused': {
                        color: '#2196f3',
                        transform: 'translate(14px, -9px) scale(0.75)'
                      },
                      '&.MuiFormLabel-filled': {
                        transform: 'translate(14px, -9px) scale(0.75)'
                      }
                    }
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
                    backgroundColor: 'rgba(240, 244, 248, 0.6)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    input: { 
                      color: '#1a2b49',
                      padding: '14px 16px',
                      fontSize: '16px'
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s ease'
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(33, 150, 243, 0.4)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2196f3',
                        boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)'
                      },
                    }
                  }}
                  InputLabelProps={{
                    sx: { 
                      color: '#7a8ba6',
                      fontWeight: '500',
                      transform: 'translate(16px, 16px) scale(1)',
                      '&.Mui-focused': {
                        color: '#2196f3',
                        transform: 'translate(14px, -9px) scale(0.75)'
                      },
                      '&.MuiFormLabel-filled': {
                        transform: 'translate(14px, -9px) scale(0.75)'
                      }
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          sx={{ 
                            color: '#7a8ba6',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              color: '#2196f3',
                              backgroundColor: 'rgba(33, 150, 243, 0.1)'
                            }
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ 
                  textAlign: 'right', 
                  mb: 3,
                  transition: 'all 0.3s ease'
                }}>
                  <Link
                    href="#"
                    sx={{
                      color: '#7a8ba6',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#2196f3',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <LoadingButton
                  onClick={loginAdmin}
                  type="submit"
                  fullWidth
                  loading={loading}
                  variant="contained"
                  sx={{
                    backgroundColor: '#2196f3',
                    color: 'white',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textTransform: 'none',
                    borderRadius: '12px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 14px rgba(33, 150, 243, 0.4)',
                    '&:hover': {
                      backgroundColor: '#1976d2',
                      boxShadow: '0 8px 20px rgba(33, 150, 243, 0.5)',
                      transform: 'translateY(-2px)'
                    },
                    '&:active': {
                      backgroundColor: '#1565c0',
                      transform: 'translateY(0)'
                    },
                    '&.MuiLoadingButton-loading': {
                      backgroundColor: '#2196f3 !important'
                    }
                  }}
                >
                  {!loading && (
                    <span>Log in</span>
                  )}
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Grow>
      </Box>
    </Fade>
  );
};

export default Login;