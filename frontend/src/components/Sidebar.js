import React, { useState } from "react";
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  IconButton, Toolbar, Typography, Avatar
} from "@mui/material";
import {
  Dashboard, ShowChart, AccountBalanceWallet, BarChart,
  ListAlt, Timeline, Settings, Menu
} from "@mui/icons-material";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);

  const drawerWidthOpen = 220;
  const drawerWidthClosed = 70;

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Markets", icon: <ShowChart /> },
    { text: "Portfolio", icon: <AccountBalanceWallet /> },
    { text: "Analytics", icon: <BarChart /> },
    { text: "Orders", icon: <ListAlt /> },
    { text: "Activity", icon: <Timeline /> },
    { text: "Settings", icon: <Settings /> }
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidthOpen : drawerWidthClosed,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidthOpen : drawerWidthClosed,
          transition: "width 0.3s",
          overflowX: "hidden"
        }
      }}
    >
      <Toolbar sx={{ justifyContent: open ? "space-between" : "center" }}>
        {open && <Typography variant="h6">TradePro</Typography>}
        <IconButton onClick={toggleDrawer}><Menu /></IconButton>
      </Toolbar>

      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>

      <div style={{ marginTop: "auto", padding: "1rem", textAlign: "center" }}>
        <Avatar sx={{ bgcolor: "#1976d2", margin: "auto" }}>JD</Avatar>
        {open && (
          <>
            <Typography variant="body1">John Doe</Typography>
            <Typography variant="body2" color="text.secondary">
              trader@example.com
            </Typography>
          </>
        )}
      </div>
    </Drawer>
  );
}
