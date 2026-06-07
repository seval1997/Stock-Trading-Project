import React from "react";
import { ThemeProvider, CssBaseline, Box, Grid } from "@mui/material";
import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import theme from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: "auto"
          }}
        >
          {/* Dashboard Header */}
          <Box sx={{ mb: 3 }}>
            <h1 style={{ margin: 0 }}>Dashboard</h1>
            <p style={{ color: "#555" }}>Welcome back, track your portfolio performance</p>
          </Box>

          {/* Summary Cards */}
          <SummaryCards />
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}
