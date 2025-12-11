import { useState, useEffect } from 'react';
import './DeadlineForm.css'

function DeadlineForm({ technologies, onSave, onCancel }) {
    const [selectedTechId, setSelectedTechId] = useState('');
    const [formData, setFormData] = useState({
        startDate: '',
        deadline: '',
        estimatedHours: '',
        priority: 'medium',
        notes: ''
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        if (selectedTechId) {
            const tech = technologies.find(t => t.id === parseInt(selectedTechId));
            if (tech) {
                setFormData({
                    startDate: tech.startDate || '',
                    deadline: tech. deadline || '',
                    estimatedHours: tech.estimatedHours || '',
                    priority:  tech.priority || 'medium',
                    notes: tech.notes || ''
                });
            }
        }
    }, [selectedTechId, technologies]);

    const validateForm = () => {
        const newErrors = {};

        if (!selectedTechId) {
            newErrors.technology = 'Выберите технологию';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Дата начала обязательна';
        } else {
            const startDate = new Date(formData. startDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (startDate < today) {
                newErrors. startDate = 'Дата начала не может быть в прошлом';
            }
        }

        if (!formData.deadline) {
            newErrors.deadline = 'Дедлайн обязателен';
        } else {
            const deadlineDate = new Date(formData.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (deadlineDate < today) {
                newErrors.deadline = 'Дедлайн не может быть в прошлом';
            }

            if (formData.startDate) {
                const startDate = new Date(formData. startDate);
                if (deadlineDate <= startDate) {
                    newErrors.deadline = 'Дедлайн должен быть позже даты начала';
                }
            }
        }

        if (!formData.estimatedHours) {
            newErrors.estimatedHours = 'Укажите предполагаемое время изучения';
        } else if (formData.estimatedHours < 1) {
            newErrors.estimatedHours = 'Минимум 1 час';
        } else if (formData.estimatedHours > 1000) {
            newErrors. estimatedHours = 'Максимум 1000 часов';
        }

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    useEffect(() => {
        validateForm();
    }, [formData, selectedTechId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTechnologyChange = (e) => {
        setSelectedTechId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid) {
            setIsSubmitting(true);

            await new Promise(resolve => setTimeout(resolve, 500));

            const selectedTech = technologies.find(t => t.id === parseInt(selectedTechId));

            onSave({
                ...selectedTech,
                ...formData
            });

            setIsSubmitting(false);
            setSubmitSuccess(true);

            setTimeout(() => {
                setSubmitSuccess(false);
                setSelectedTechId('');
                setFormData({
                    startDate: '',
                    deadline:  '',
                    estimatedHours: '',
                    priority: 'medium',
                    notes:  ''
                });
            }, 2000);
        }
    };

    const calculateDaysLeft = () => {
        if (!formData.startDate || !formData.deadline) return null;

        const start = new Date(formData.startDate);
        const end = new Date(formData.deadline);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    };

    const daysLeft = calculateDaysLeft();

    return (
        <div className="deadline-form-container">
            <form onSubmit={handleSubmit} className="deadline-form">
                <h2>Установить сроки изучения</h2>

                <div className="form-group">
                    <label htmlFor="technology">
                        Технология <span className="required">*</span>
                    </label>
                    <select
                        id="technology"
                        value={selectedTechId}
                        onChange={handleTechnologyChange}
                        className={errors.technology ? 'error' : ''}
                    >
                        <option value="">Выберите технологию... </option>
                        {technologies. map(tech => (
                            <option key={tech.id} value={tech.id}>
                                {tech.title} ({tech.category})
                            </option>
                        ))}
                    </select>
                    {errors.technology && (
                        <span className="error-message">{errors.technology}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">
                        Дата начала <span className="required">*</span>
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={errors.startDate ? 'error' : ''}
                    />
                    {errors.startDate && (
                        <span className="error-message">{errors.startDate}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="deadline">
                        Дедлайн <span className="required">*</span>
                    </label>
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className={errors.deadline ? 'error' : ''}
                    />
                    {errors.deadline && (
                        <span className="error-message">{errors.deadline}</span>
                    )}
                </div>

                {daysLeft !== null && (
                    <div className="days-info">
                        Запланировано на <strong>{daysLeft}</strong> {daysLeft === 1 ?  'день' : 'дней'}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="estimatedHours">
                        Предполагаемое время (часов) <span className="required">*</span>
                    </label>
                    <input
                        type="number"
                        id="estimatedHours"
                        name="estimatedHours"
                        value={formData.estimatedHours}
                        onChange={handleChange}
                        min="1"
                        max="1000"
                        className={errors.estimatedHours ?  'error' : ''}
                    />
                    {errors.estimatedHours && (
                        <span className="error-message">{errors.estimatedHours}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Приоритет</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Заметки</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Дополнительная информация о плане изучения..."
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="btn-primary"
                    >
                        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn-secondary"
                        >
                            Отмена
                        </button>
                    )}
                </div>

                {submitSuccess && (
                    <div className="success-message">
                        Сроки успешно сохранены!
                    </div>
                )}
            </form>
        </div>
    );
}

export default DeadlineForm;