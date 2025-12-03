import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon,
    Warning as WarningIcon,
    Info as InfoIcon,
    Menu as MenuIcon,
    Close as CloseIcon
} from '@mui/icons-material';

function MuiDemo() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const [openDialog, setOpenDialog] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'frontend'
    });

    const handleShowNotification = (type) => {
        const messages = {
            success: 'Операция выполнена успешно!',
            error: 'Произошла ошибка при выполнении операции',
            warning: 'Внимание! Это предупреждение',
            info: 'Это информационное сообщение'
        };

        if (window.showNotification) {
            window.showNotification(messages[type], type);
        }
    };

    const handleDialogSubmit = () => {
        if (window.showNotification) {
            window.showNotification(`Технология "${formData.name}" добавлена!`, 'success');
        }
        setOpenDialog(false);
        setFormData({ name: '', category: 'frontend' });
    };

    const getScreenSize = () => {
        if (isMobile) return 'Мобильный (< 600px)';
        if (isTablet) return 'Планшет (600px - 960px)';
        return 'Десктоп (> 960px)';
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
                    Material-UI Демонстрация
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Практическое занятие 26 - Задания 1, 2, 3
                </Typography>
            </Box>

            <Card sx={{ mb: 3, background: theme.palette.mode === 'dark' ? '#1a202c' : '#f0f4ff' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        📱 Текущий размер экрана: {getScreenSize()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Тема: {theme.palette.mode === 'dark' ? 'Темная 🌙' : 'Светлая ☀️'}
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InfoIcon color="primary" />
                        Задание 1: Snackbar уведомления
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

                    <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Возможности уведомлений:
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body2">✓ Автоматическое закрытие через 6 секунд</Typography>
                            <Typography variant="body2">✓ Возможность закрыть вручную</Typography>
                            <Typography variant="body2">✓ Множественные уведомления стекируются</Typography>
                            <Typography variant="body2">✓ Адаптивное позиционирование</Typography>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        🎨 Задание 2: Переключение темы
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Используйте кнопку переключения темы в правом верхнем углу навигации
                    </Typography>

                    <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Возможности темы:
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body2">✓ Переключение между светлой и темной темой</Typography>
                            <Typography variant="body2">✓ Сохранение выбора в localStorage</Typography>
                            <Typography variant="body2">✓ Применяется ко всем MUI компонентам</Typography>
                            <Typography variant="body2">✓ Синхронизация с основной темой приложения</Typography>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        📐 Задание 3: Адаптивность и модальные окна
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Проверьте работу модальных окон и адаптивного дизайна
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => setOpenDialog(true)}
                            >
                                Открыть модальное окно (Dialog)
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<MenuIcon />}
                                onClick={() => setOpenDrawer(true)}
                            >
                                Открыть боковую панель (Drawer)
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Добавить технологию
                    <IconButton
                        onClick={() => setOpenDialog(false)}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Название технологии"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        select
                        label="Категория"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        margin="normal"
                    >
                        <MenuItem value="frontend">Frontend</MenuItem>
                        <MenuItem value="backend">Backend</MenuItem>
                        <MenuItem value="database">Database</MenuItem>
                        <MenuItem value="devops">DevOps</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>
                        Отмена
                    </Button>
                    <Button
                        onClick={handleDialogSubmit}
                        variant="contained"
                        disabled={!formData.name}
                    >
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>

            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <Box sx={{ width: 250, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Меню</Typography>
                        <IconButton onClick={() => setOpenDrawer(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Главная" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Технологии" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Статистика" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Настройки" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Container>
    );
}

export default MuiDemo;