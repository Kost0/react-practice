import { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext();

function ThemeProviderWrapper({ children }) {
    const [mode, setMode] = useState(() => {
        const savedMuiTheme = localStorage.getItem('muiThemeMode');
        if (savedMuiTheme) return savedMuiTheme;

        const savedAppSettings = localStorage.getItem('appSettings');
        if (savedAppSettings) {
            const parsed = JSON.parse(savedAppSettings);
            return parsed.theme || 'light';
        }

        return 'light';
    });

    useEffect(() => {
        localStorage. setItem('muiThemeMode', mode);
        localStorage.setItem('appSettings', JSON.stringify({ theme: mode }));
        document.body.setAttribute('data-theme', mode);
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
                        contrastText: '#ffffff', // Белый текст на основном цвете
                    },
                    secondary: {
                        main: '#764ba2',
                        light: '#9b6fc9',
                        dark: '#52357b',
                        contrastText: '#ffffff',
                    },
                    success: {
                        main: '#48bb78',
                        light: '#68d391',
                        dark: '#2f855a',
                        contrastText: '#ffffff', // Явно указываем белый текст
                    },
                    error: {
                        main: '#f56565',
                        light: '#fc8181',
                        dark: '#c53030',
                        contrastText: '#ffffff',
                    },
                    warning: {
                        main: '#ed8936',
                        light: '#f6ad55',
                        dark: '#c05621',
                        contrastText: '#ffffff',
                    },
                    info: {
                        main: '#4299e1',
                        light: '#63b3ed',
                        dark: '#2b6cb0',
                        contrastText: '#ffffff',
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
                    h3: {
                        fontWeight: 700,
                    },
                    h5: {
                        fontWeight: 600,
                    },
                    h6: {
                        fontWeight: 600,
                    },
                    button: {
                        textTransform: 'none',
                        fontWeight: 500,
                    },
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                                borderRadius: 8,
                                padding: '8px 16px',
                                fontWeight: 500,
                            },
                            contained: {
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                                },
                            },
                            containedSuccess: {
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#38a169',
                                },
                            },
                            containedError: {
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#c53030',
                                },
                            },
                            containedWarning: {
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#c05621',
                                },
                            },
                            containedInfo: {
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#2b6cb0',
                                },
                            },
                        },
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                borderRadius: 12,
                                boxShadow: mode === 'dark'
                                    ? '0 2px 8px rgba(0, 0, 0, 0.4)'
                                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                            },
                        },
                    },
                    MuiDialog: {
                        styleOverrides: {
                            paper: {
                                borderRadius: 12,
                            },
                        },
                    },
                    MuiTextField: {
                        styleOverrides: {
                            root: {
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 8,
                                },
                            },
                        },
                    },
                    MuiAlert: {
                        styleOverrides: {
                            filledSuccess: {
                                color: '#ffffff',
                                backgroundColor: '#48bb78',
                            },
                            filledError: {
                                color: '#ffffff',
                                backgroundColor: '#f56565',
                            },
                            filledWarning: {
                                color: '#ffffff',
                                backgroundColor: '#ed8936',
                            },
                            filledInfo: {
                                color: '#ffffff',
                                backgroundColor: '#4299e1',
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