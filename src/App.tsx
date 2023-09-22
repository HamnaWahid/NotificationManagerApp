import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // extra small screens
      sm: 800, // small screens
      md: 960, // medium screens
      lg: 1280, // large screens
      xl: 1920, // extra large screens
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
