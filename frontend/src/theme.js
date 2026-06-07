import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#f9f9f9", paper: "#fff" },
    success: { main: "#4caf50" },
    error: { main: "#f44336" }
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h5: { fontWeight: 600 },
    body1: { color: "#333" }
  }
});

export default theme;
