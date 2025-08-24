import {Circle} from "../comp1/circle.jsx"


import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Container,
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Label } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Layout = ({
  children,
  title = 'Летняя IT-школа 2025',
  showMenuButton = true,
  onMenuClick,
}) => {
  const menuItems = [
    { text: 'Студенты', path: '/children' },
    { text: 'ВПС', path: '/vps' },
  ];

  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position='static'
        sx={{
          backgroundColor: 'white',
          color: 'orange',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)',
        }}>
        <Toolbar>
          {showMenuButton && (
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}>
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}>
          <Typography variant='h6' sx={{ p: 2, color: 'orange' }}>
            Меню
          </Typography>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text}>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Box component='main'>{children}</Box>
      </Container>
      <Circle></Circle>
    </>
  );
};

export default Layout;
