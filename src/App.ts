import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5', // Adjust the primary color to your desired color
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              borderColor: '#3f51b5', // Change the highlight color to red
            },
        },
      },
    },
  },
});

export default theme;
