import { useState, useEffect } from 'react';
import {
    Snackbar,
    Alert,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function NotificationSnackbar() {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (message, severity = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, severity, open: true }]);
    };

    const handleClose = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, open: false } : notif
            )
        );

        setTimeout(() => {
            setNotifications(prev => prev.filter(notif => notif.id !== id));
        }, 300);
    };

    useEffect(() => {
        window.showNotification = showNotification;

        return () => {
            delete window.showNotification;
        };
    }, []);

    return (
        <>
            {notifications.map((notification, index) => (
                <Snackbar
                    key={notification.id}
                    open={notification.open}
                    autoHideDuration={6000}
                    onClose={() => handleClose(notification.id)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    sx={{
                        bottom: { xs: 16, sm: 24 },
                        right: { xs: 16, sm: 24 },
                        transform: `translateY(-${index * 70}px)`,
                    }}
                >
                    <Alert
                        onClose={() => handleClose(notification.id)}
                        severity={notification.severity}
                        variant="filled"
                        sx={{ width: '100%' }}
                        action={
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={() => handleClose(notification.id)}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            ))}
        </>
    );
}

export default NotificationSnackbar;