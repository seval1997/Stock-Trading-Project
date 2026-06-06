import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import StocksPage from "./pages/StockPage";
import CryptoPage from "./pages/CryptoPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  AppBar,
  Typography
} from "@mui/material";
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  ShowChart as StocksIcon,
  CurrencyBitcoin as CryptoIcon,
  Settings as SettingsIcon,
  AccountCircle as ProfileIcon,
  Menu as MenuIcon
} from "@mui/icons-material";

function Home() { return <h2>Home Page</h2>; }
function Dashboard() { return <h2>Dashboard Page</h2>; }
function Stocks() { return <h2>Stocks Page</h2>; }
function Crypto() { return <h2>Crypto Page</h2>; }
function Settings() { return <h2>Settings Page</h2>; }
function Profile() { return <h2>Profile Page</h2>; }

function App() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Stocks", icon: <StocksIcon />, path: "/stocks" },
    { text: "Crypto", icon: <CryptoIcon />, path: "/crypto" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { text: "Profile", icon: <ProfileIcon />, path: "/profile" }
  ];

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Trading Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="persistent" anchor="left" open={open}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main style={{ marginLeft: open ? 240 : 60, padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/crypto" element={<CryptoPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
