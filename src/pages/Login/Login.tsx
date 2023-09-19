import React, { useEffect, useState } from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import apiClient from '../../apiServices/serviceClient'; // Adjust the import path for apiClient
import { useNavigate } from 'react-router-dom';

import logoImage from '../../assets/logo-gosaas.png';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Loading from '../../common/Loading';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [backendErrorMessage, setBackendErrorMessage] = useState<string | null>(
    null
  );

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError(null);
    }

    if (!emailError && !passwordError) {
      try {
        const response = await apiClient.post('/login', { email, password });
        const token = response.data.token;
        localStorage.setItem('token', token); // Set the token in local storage
        console.log('Login successful. Token:', token);
        navigate('/Dashboard');
      } catch (error) {
        console.log(error);
        console.error('Login failed:', error.response?.data.error);
        setBackendErrorMessage(
          error.response?.data.error ||
            error.response?.data.message ||
            'An error occurred'
        );
        setShowAlert(true);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      <Loading />;
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Container
      maxWidth='sm'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: '2rem', marginTop: '2rem', width: '100%' }}
      >
        <img
          src={logoImage}
          alt='Logo'
          style={{ display: 'block', margin: '0 auto', marginBottom: '2rem' }}
        />
        <Typography variant='h4' align='center' gutterBottom>
          Notification Manager
        </Typography>
        <TextField
          label='Email'
          variant='outlined'
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          required
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          required
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleLogin}
          style={{ marginTop: '1rem' }}
        >
          Login
        </Button>
        {backendErrorMessage && (
          <Snackbar
            open={showAlert}
            autoHideDuration={1500}
            onClose={handleCloseAlert}
            style={{
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Alert onClose={handleCloseAlert} severity='error'>
              {backendErrorMessage}
            </Alert>
          </Snackbar>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
