import { useState, createContext, useContext, useEffect } from 'react';
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
  ThemeProvider,
  createTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';

// Контекст для темы
const ThemeContext = createContext();

// Хук для использования контекста темы
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

// Провайдер темы
export const CustomThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Инициализация темы при загрузке
  useEffect(() => {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(shouldUseDarkMode);
    
    // Устанавливаем атрибут data-theme сразу
    document.documentElement.setAttribute('data-theme', shouldUseDarkMode ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // Сохраняем тему в localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Обновляем data-theme атрибут для CSS переменных
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? 'rgb(90, 182, 204)' : 'rgb(37, 89, 88)',
      },
      background: {
        default: isDarkMode ? 'rgb(25, 48, 66)' : 'rgb(44, 191, 170)',
        paper: isDarkMode ? 'rgb(37, 61, 84)' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000',
        secondary: isDarkMode ? '#e0e0e0' : '#666666',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? 'rgb(37, 61, 84)' : '#ffffff',
            color: isDarkMode ? 'rgb(90, 182, 204)' : 'rgb(37, 89, 88)',
            boxShadow: isDarkMode 
              ? '0px 2px 4px -1px rgba(0,0,0,0.3)' 
              : '0px 2px 4px -1px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? 'rgb(37, 61, 84)' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            borderRight: isDarkMode ? '1px solid rgb(90, 182, 204)' : '1px solid #e0e0e0',
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: isDarkMode 
                ? 'rgba(90, 182, 204, 0.1)' 
                : 'rgba(37, 89, 88, 0.1)',
            },
            transition: 'background-color 0.3s ease',
          },
        },
      },
    },
  });

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

const Layout = ({
  children,
  title = 'Летняя IT-школа 2025',
  showMenuButton = true
}) => {
  const { isDarkMode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: 'Студенты', path: '/children' },
    { text: 'ВПС', path: '/vps' },
  ];

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
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: 'background.default',
      transition: 'background-color 0.3s ease',
    }}>
      <AppBar position='static'>
        <Toolbar>
          {showMenuButton && (
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}
              sx={{ 
                mr: 2,
                '&:hover': {
                  backgroundColor: isDarkMode 
                    ? 'rgba(90, 182, 204, 0.1)' 
                    : 'rgba(37, 89, 88, 0.1)',
                },
                transition: 'background-color 0.3s ease',
              }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant='h6' 
            component='div' 
            sx={{ 
              flexGrow: 1,
              fontWeight: 600,
            }}>
            {title}
          </Typography>
          <IconButton
            color='inherit'
            onClick={toggleTheme}
            aria-label='toggle theme'
            sx={{
              '&:hover': {
                backgroundColor: isDarkMode 
                  ? 'rgba(90, 182, 204, 0.1)' 
                  : 'rgba(37, 89, 88, 0.1)',
              },
              transition: 'all 0.3s ease',
              transform: 'rotate(0deg)',
              '&:active': {
                transform: 'rotate(180deg)',
              },
            }}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
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
          sx={{ width: 240 }}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}>
          <Typography 
            variant='h6' 
            sx={{ 
              p: 2, 
              color: isDarkMode ? 'rgb(90, 182, 204)' : 'rgb(37, 89, 88)',
              fontWeight: 600,
              borderBottom: isDarkMode 
                ? '1px solid rgba(90, 182, 204, 0.2)' 
                : '1px solid rgba(37, 89, 88, 0.2)',
            }}>
            Меню
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  onClick={() => navigate(item.path)}
                  sx={{
                    '&:hover': {
                      backgroundColor: isDarkMode 
                        ? 'rgba(90, 182, 204, 0.1)' 
                        : 'rgba(37, 89, 88, 0.1)',
                    },
                  }}>
                  <ListItemText 
                    primary={item.text}
                    sx={{
                      '& .MuiTypography-root': {
                        fontWeight: 500,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
      <Container 
        maxWidth='lg' 
        sx={{ 
          mt: 4, 
          mb: 4,
          backgroundColor: 'transparent',
        }}>
        <Box component='main'>{children}</Box>
      </Container>
    </Box>
  );
};

export default Layout;
