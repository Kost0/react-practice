import { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from './ThemeProviderWrapper';

function ThemeToggleButton() {
    const { mode, toggleTheme } = useContext(ThemeContext);

    return (
        <Tooltip title={mode === 'dark' ? 'Светлая тема' : 'Темная тема'}>
            <IconButton
                onClick={toggleTheme}
                color="inherit"
                aria-label="toggle theme"
            >
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Tooltip>
    );
}

export default ThemeToggleButton;