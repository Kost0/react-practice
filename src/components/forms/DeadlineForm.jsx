import { useState, useEffect } from 'react';
import './DeadlineForm.css';

function DeadlineForm({ technology, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        startDate: technology.startDate || '',
        deadline: technology.deadline || '',
        estimatedHours: technology.estimatedHours || '',
        priority: technology.priority || 'medium',
        notes: technology.notes || ''
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.startDate) {
            newErrors.startDate = 'Дата начала обязательна';
        } else {
            const startDate = new Date(formData.startDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (startDate < today) {
                newErrors.startDate = 'Дата начала не может быть в прошлом';
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
                const startDate = new Date(formData.startDate);
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
            newErrors.estimatedHours = 'Максимум 1000 часов';
        }

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid) {
            setIsSubmitting(true);

            // Имитация отправки
            await new Promise(resolve => setTimeout(resolve, 500));

            onSave({
                ...technology,
                ...formData
            });

            setIsSubmitting(false);
            setSubmitSuccess(true);

            setTimeout(() => {
                setSubmitSuccess(false);
            }, 2000);
        }
    };

    // Вычисление количества дней до дедлайна
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
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {isSubmitting && 'Сохранение сроков изучения...'}
                {submitSuccess && 'Сроки успешно сохранены!'}
            </div>

            {submitSuccess && (
                <div className="success-banner" role="alert">
                    ✓ Сроки изучения успешно сохранены!
                </div>
            )}

            <form onSubmit={handleSubmit} className="deadline-form" noValidate>
                <h2>Установка сроков изучения: {technology.title}</h2>

                <div className="form-group">
                    <label htmlFor="startDate" className="required">
                        Дата начала изучения
                    </label>
                    <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={errors.startDate ? 'error' : ''}
                        aria-required="true"
                        aria-invalid={!!errors.startDate}
                        aria-describedby={errors.startDate ? 'startDate-error' : undefined}
                        disabled={isSubmitting}
                    />
                    {errors.startDate && (
                        <span id="startDate-error" className="error-message" role="alert">
                            {errors.startDate}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="deadline" className="required">
                        Дедлайн
                    </label>
                    <input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={handleChange}
                        className={errors.deadline ? 'error' : ''}
                        aria-required="true"
                        aria-invalid={!!errors.deadline}
                        aria-describedby={errors.deadline ? 'deadline-error' : 'deadline-help'}
                        disabled={isSubmitting}
                    />
                    {errors.deadline && (
                        <span id="deadline-error" className="error-message" role="alert">
                            {errors.deadline}
                        </span>
                    )}
                    {!errors.deadline && daysLeft !== null && (
                        <span id="deadline-help" className="help-text">
                            Время на изучение: {daysLeft} {daysLeft === 1 ? 'день' : 'дней'}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="estimatedHours" className="required">
                        Предполагаемое время (часов)
                    </label>
                    <input
                        id="estimatedHours"
                        name="estimatedHours"
                        type="number"
                        min="1"
                        max="1000"
                        value={formData.estimatedHours}
                        onChange={handleChange}
                        className={errors.estimatedHours ? 'error' : ''}
                        placeholder="Например: 40"
                        aria-required="true"
                        aria-invalid={!!errors.estimatedHours}
                        aria-describedby={errors.estimatedHours ? 'hours-error' : 'hours-help'}
                        disabled={isSubmitting}
                    />
                    {errors.estimatedHours && (
                        <span id="hours-error" className="error-message" role="alert">
                            {errors.estimatedHours}
                        </span>
                    )}
                    {!errors.estimatedHours && formData.estimatedHours && daysLeft && (
                        <span id="hours-help" className="help-text">
                            Примерно {Math.ceil(formData.estimatedHours / daysLeft)} часов в день
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Приоритет</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        aria-describedby="priority-help"
                    >
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                        <option value="critical">Критичный</option>
                    </select>
                    <span id="priority-help" className="help-text">
                        Укажите важность изучения этой технологии
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Дополнительные заметки</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Любые заметки о планировании изучения..."
                        disabled={isSubmitting}
                        aria-describedby="notes-help"
                    />
                    <span id="notes-help" className="help-text">
                        Необязательное поле
                    </span>
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={!isFormValid || isSubmitting}
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting ? 'Сохранение...' : 'Сохранить сроки'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn-secondary"
                        disabled={isSubmitting}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeadlineForm;