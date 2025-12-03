import { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext();

function ThemeProviderWrapper({ children }) {
    const [mode, setMode] = useState(() => {
        const savedTheme = localStorage.getItem('muiThemeMode');
        return savedTheme || 'light';
    });

    useEffect(() => {
        localStorage.setItem('muiThemeMode', mode);
        document.documentElement.setAttribute('data-theme', mode === 'dark' ? 'dark' : 'light');
    }, [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#667eea',
                        light: '#8b9df8',
                        dark: '#4a5cc5',
                    },
                    secondary: {
                        main: '#764ba2',
                        light: '#9b6fc9',
                        dark: '#52357b',
                    },
                    ...(mode === 'dark'
                        ? {
                            background: {
                                default: '#1a202c',
                                paper: '#2d3748',
                            },
                            text: {
                                primary: '#e2e8f0',
                                secondary: '#cbd5e0',
                            },
                        }
                        : {
                            // Светлая тема
                            background: {
                                default: '#f7fafc',
                                paper: '#ffffff',
                            },
                            text: {
                                primary: '#2d3748',
                                secondary: '#4a5568',
                            },
                        }),
                },
                typography: {
                    fontFamily: [
                        '-apple-system',
                        'BlinkMacSystemFont',
                        '"Segoe UI"',
                        'Roboto',
                        '"Helvetica Neue"',
                        'Arial',
                        'sans-serif',
                    ].join(','),
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                                borderRadius: 8,
                            },
                        },
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                borderRadius: 12,
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default ThemeProviderWrapper;