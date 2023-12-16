import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TokenInput from "./Components/TokenInput";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Header";
import ProtectedRoute from "./Components/ProtectedRoute";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000000"
    }
  },
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif'
    ].join(',')
  }
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Header />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="/login" element={<TokenInput />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;