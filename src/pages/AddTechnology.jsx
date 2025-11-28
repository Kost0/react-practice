import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddTechnology.css';

function AddTechnology() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'frontend',
        status: 'not-started',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const saved = localStorage.getItem('technologies');
        const technologies = saved ? JSON.parse(saved) : [];

        const newTechnology = {
            id: Date.now(),
            ...formData
        };

        technologies.push(newTechnology);
        localStorage.setItem('technologies', JSON.stringify(technologies));

        alert('Технология успешно добавлена!');
        navigate('/technologies');
    };

    return (
        <div className="page add-technology-page">
            <div className="page-header">
                <Link to="/technologies" className="back-link">
                    ← Назад к списку
                </Link>
                <h1>Добавить новую технологию</h1>
            </div>

            <form onSubmit={handleSubmit} className="technology-form">
                <div className="form-group">
                    <label htmlFor="title">Название технологии *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Например: React Hooks"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Краткое описание технологии и что вы хотите изучить"
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Категория *</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="database">База данных</option>
                        <option value="devops">DevOps</option>
                        <option value="mobile">Mobile</option>
                        <option value="other">Другое</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Начальный статус</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="not-started">Не начато</option>
                        <option value="in-progress">В процессе</option>
                        <option value="completed">Завершено</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Заметки (необязательно)</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Добавьте заметки о том, почему хотите изучить эту технологию"
                        rows="3"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        ✓ Добавить технологию
                    </button>
                    <Link to="/technologies" className="btn btn-secondary">
                        Отмена
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default AddTechnology;