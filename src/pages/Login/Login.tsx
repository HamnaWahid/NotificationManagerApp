// src/Login.tsx

import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';

import logoImage from '../../assets/logo-gosaas.png'; // Import your logo image

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    // Basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    // Validate email and password
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

    // If both email and password are valid, proceed with login logic
    if (!emailError && !passwordError) {
      // Handle login logic here (e.g., send a request to the server)
      console.log('Email:', email);
      console.log('Password:', password);
    }
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
      </Paper>
    </Container>
  );
};

export default Login;
