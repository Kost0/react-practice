import { Link } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon,
    Warning as WarningIcon,
    Info as InfoIcon,
} from '@mui/icons-material';

function MuiDemo() {
    const handleShowNotification = (type) => {
        const messages = {
            success: 'Успех!',
            error: 'Ошибка',
            warning: 'Предупреждение',
            info: 'Информационное сообщение'
        };

        if (window.showNotification) {
            window.showNotification(messages[type], type);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
                        ← Назад на главную
                    </Typography>
                </Link>
                <Typography variant="h3" component="h1" gutterBottom>
                    Уведомления
                </Typography>
            </Box>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        Snackbar уведомления
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Нажмите на кнопки ниже, чтобы увидеть различные типы уведомлений
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                startIcon={<CheckCircleIcon />}
                                onClick={() => handleShowNotification('success')}
                            >
                                Success
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Button
                                variant="contained"
                                color="error"
                                fullWidth
                                startIcon={<ErrorIcon />}
                                onClick={() => handleShowNotification('error')}
                            >
                                Error
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Button
                                variant="contained"
                                color="warning"
                                fullWidth
                                startIcon={<WarningIcon />}
                                onClick={() => handleShowNotification('warning')}
                            >
                                Warning
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Button
                                variant="contained"
                                color="info"
                                fullWidth
                                startIcon={<InfoIcon />}
                                onClick={() => handleShowNotification('info')}
                            >
                                Info
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default MuiDemo;