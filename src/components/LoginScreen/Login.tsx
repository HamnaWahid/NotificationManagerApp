import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { LoginContainer, LoginButton } from './LoginStyles';
interface LoginProps {
  onLogin: (username: string, password: string) => void;
}
const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setUsernameError(value === '');
  };
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(value === '');
  };
  return (
    <LoginContainer>
      {' '}
      <h3>Notification Manager</h3>{' '}
      <TextField
        label='Username'
        value={username}
        onChange={(e) => handleUsernameChange(e.target.value)}
        fullWidth
        margin='normal'
        variant='outlined'
        error={usernameError}
        helperText={usernameError ? 'Username is required' : ''}
        required
      />{' '}
      <TextField
        label='Password'
        type='password'
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        fullWidth
        margin='normal'
        variant='outlined'
        error={passwordError}
        helperText={passwordError ? 'Password is required' : ''}
        required
      />{' '}
      <LoginButton
        variant='contained'
        onClick={() => onLogin(username, password)}
      >
        {' '}
        Login{' '}
      </LoginButton>{' '}
    </LoginContainer>
  );
};
export default Login;
