import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';

export const UpdateButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'white',
  color: 'black',
  border: `2px solid black`,
  borderRadius: theme.spacing(2),
  '&:hover': {
    borderColor: 'black', // Change border color to black on hover
    backgroundColor: 'white',
  },
  '&.Mui-focusVisible': {
    borderColor: 'black', // Change border color when button is focused
    backgroundColor: 'white',
  },
  '&:active': {
    borderColor: 'black', // Change border color when clicked
  },
}));

export const DeleteButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'white',
  color: 'red',
  border: `2px solid red`,
  borderRadius: theme.spacing(2),
  '&:hover': {
    borderColor: 'red', // Change border color to red on hover
    backgroundColor: 'white',
  },
  '&.Mui-focusVisible': {
    borderColor: 'red', // Change border color when button is focused
    backgroundColor: 'white',
  },
  '&:active': {
    borderColor: 'red', // Change border color when clicked
  },
}));

export const ToggleButton = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#ea3c2d',
    '&:hover': {
      backgroundColor: '#ea3c2d',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#ea3c2d',
  },
  '& .MuiSwitch-switchBase.Mui-checked:hover + .MuiSwitch-track': {
    backgroundColor: '#ea3c2d',
  },
}));
