import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#cf482b', // Adjust the primary color to your desired color
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              borderColor: '#ea3c2d', // Change the highlight color to red
            },
        },
      },
    },
  },
});

export default theme;
