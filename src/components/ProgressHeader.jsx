function ProgressHeader({amount, studied}) {
    let progress = Math.round(studied / amount * 100)

    return (
        <div className="progress-header">
            <div className="progress-bar-label">
                <p>Всего технологий: {amount}</p>
                <p>Изучено: {studied}</p>
            </div>

            <span className="progress-bar">{progress}%</span>
        </div>
    );
}

export default ProgressHeader;