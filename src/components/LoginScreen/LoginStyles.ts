import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const LoginContainer = styled('div')`
  background-color: #f5ebd6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px; /* Change the min-height to half */
  border-radius: 20px;
  padding: 10px;
  width: 400px;
  box-shadow: 0px 0px 10px rgba(184, 34, 2, 0.7);
  h3 {
    color: #585150;
  }
`;

export const LoginButton = styled(Button)`
  && {
    background-color: #cf482b;
    border-radius: 20px;
    color: white;
    transition: box-shadow 0.3s ease;
    &:active {
      background-color: #cf482b;
      box-shadow: 0px 0px 20px rgba(207, 72, 43, 0.7);
    }
    &:hover {
      background-color: #ad3c1f;
    }
  }
`;
