import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ThemeProviderWrapper from './components/MUI/ThemeProviderWrapper.jsx'
import NotificationSnackbar from './components/MUI/NotificationSnackbar.jsx'

createRoot(document. getElementById('root')).render(
    <StrictMode>
        <ThemeProviderWrapper>
            <App />
            <NotificationSnackbar />
        </ThemeProviderWrapper>
    </StrictMode>
)