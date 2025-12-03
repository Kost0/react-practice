import { useState, useEffect } from 'react';
import './BulkEditForm.css';

function BulkEditForm({ onSave, onCancel }) {
    const [technologies, setTechnologies] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [newStatus, setNewStatus] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            setTechnologies(JSON.parse(saved));
        }
    }, []);

    const filteredTechnologies = filterCategory === 'all'
        ? technologies
        : technologies.filter(tech => tech.category === filterCategory);

    const handleToggleTechnology = (id) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(selectedId => selectedId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedIds([]);
        } else {
            const allIds = filteredTechnologies.map(tech => tech.id);
            setSelectedIds(allIds);
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        if (filteredTechnologies.length > 0) {
            const allFiltered = filteredTechnologies.map(tech => tech.id);
            const allSelected = allFiltered.every(id => selectedIds.includes(id));
            setSelectAll(allSelected);
        }
    }, [selectedIds, filteredTechnologies]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedIds.length === 0) {
            alert('Выберите хотя бы одну технологию');
            return;
        }

        if (!newStatus) {
            alert('Выберите новый статус');
            return;
        }

        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const updatedTechnologies = technologies.map(tech => {
            if (selectedIds.includes(tech.id)) {
                return { ...tech, status: newStatus };
            }
            return tech;
        });

        localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));

        setIsSubmitting(false);
        setSubmitSuccess(true);

        onSave(updatedTechnologies);

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 2000);
    };

    const categories = [...new Set(technologies.map(tech => tech.category))];

    const getStatusLabel = (status) => {
        const labels = {
            'not-started': 'Не начато',
            'in-progress': 'В процессе',
            'completed': 'Завершено'
        };
        return labels[status] || status;
    };

    return (
        <div className="bulk-edit-container">
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {isSubmitting && `Обновление статусов для ${selectedIds.length} технологий...`}
                {submitSuccess && `Статусы успешно обновлены для ${selectedIds.length} технологий!`}
            </div>

            {submitSuccess && (
                <div className="success-banner" role="alert">
                    ✓ Статусы успешно обновлены для {selectedIds.length} технологий!
                </div>
            )}

            <form onSubmit={handleSubmit} className="bulk-edit-form">
                <h2>Массовое редактирование статусов</h2>

                <div className="filters-panel">
                    <div className="form-group">
                        <label htmlFor="filter-category">Фильтр по категории</label>
                        <select
                            id="filter-category"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            disabled={isSubmitting}
                            aria-describedby="filter-help"
                        >
                            <option value="all">Все категории</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <span id="filter-help" className="help-text">
                            Фильтруйте список для удобного выбора
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="new-status">Новый статус</label>
                        <select
                            id="new-status"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            disabled={isSubmitting}
                            aria-required="true"
                            aria-describedby="status-help"
                        >
                            <option value="">Выберите статус</option>
                            <option value="not-started">Не начато</option>
                            <option value="in-progress">В процессе</option>
                            <option value="completed">Завершено</option>
                        </select>
                        <span id="status-help" className="help-text">
                            Этот статус будет применен ко всем выбранным технологиям
                        </span>
                    </div>
                </div>

                <div className="technologies-list">
                    <div className="list-header">
                        <div className="select-all-control">
                            <input
                                type="checkbox"
                                id="select-all"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                disabled={isSubmitting || filteredTechnologies.length === 0}
                                aria-label="Выбрать все технологии"
                            />
                            <label htmlFor="select-all">
                                Выбрать все ({filteredTechnologies.length})
                            </label>
                        </div>
                        <div className="selection-count" aria-live="polite" aria-atomic="true">
                            Выбрано: <strong>{selectedIds.length}</strong>
                        </div>
                    </div>

                    {filteredTechnologies.length === 0 ? (
                        <div className="empty-state">
                            <p>Нет технологий в выбранной категории</p>
                        </div>
                    ) : (
                        <fieldset className="technology-checkboxes" disabled={isSubmitting}>
                            <legend className="sr-only">Список технологий для редактирования</legend>
                            {filteredTechnologies.map(tech => (
                                <div key={tech.id} className="technology-checkbox-item">
                                    <input
                                        type="checkbox"
                                        id={`tech-${tech.id}`}
                                        checked={selectedIds.includes(tech.id)}
                                        onChange={() => handleToggleTechnology(tech.id)}
                                        aria-describedby={`tech-${tech.id}-info`}
                                    />
                                    <label htmlFor={`tech-${tech.id}`}>
                                        <div className="tech-info">
                                            <span className="tech-title">{tech.title}</span>
                                            <span id={`tech-${tech.id}-info`} className="tech-meta">
                                                <span className={`status-badge status-${tech.status}`}>
                                                    {getStatusLabel(tech.status)}
                                                </span>
                                                <span className="tech-category">{tech.category}</span>
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </fieldset>
                    )}
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={selectedIds.length === 0 || !newStatus || isSubmitting}
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting
                            ? `Обновление ${selectedIds.length} технологий...`
                            : `Применить к ${selectedIds.length} технологиям`
                        }
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

export default BulkEditForm;