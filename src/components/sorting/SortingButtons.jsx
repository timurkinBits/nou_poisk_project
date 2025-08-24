import './SortingButtons.css';

const SortingButtons = ({ 
  onSortChange, 
  currentSort = 'name', 
  isReversed = false,
  showGradeSort = true, // Новый пропс для управления отображением кнопки сортировки по классу
}) => {
  const handleSortClick = (sortType) => {
    if (currentSort === sortType) {
      // Если уже выбран этот тип сортировки, переворачиваем порядок
      onSortChange(sortType, !isReversed);
    } else {
      // Если новый тип сортировки, начинаем с прямого порядка
      onSortChange(sortType, false);
    }
  };

  const getSortLabel = (type) => {
    const labels = {
      name: 'По алфавиту',
      grade: 'По классу'
    };
    return labels[type] || type;
  };

  return (
    <div className="sorting-container">
      <h3 className="sorting-title">Сортировка</h3>
      
      <div className="sorting-buttons">
        <div className="button-group">
          <button
            className={`sort-button ${currentSort === 'name' ? 'active' : ''}`}
            onClick={() => handleSortClick('name')}
          >
            {getSortLabel('name')}
          </button>

          {showGradeSort && (
            <button
              className={`sort-button ${currentSort === 'grade' ? 'active' : ''}`}
              onClick={() => handleSortClick('grade')}
            >
              {getSortLabel('grade')}
            </button>
          )}
        </div>

        <button
          className={`reverse-button ${isReversed ? 'active' : ''}`}
          onClick={() => onSortChange(currentSort, !isReversed)}
          title={`Порядок: ${isReversed ? 'по убыванию' : 'по возрастанию'}`}
        >
          <span className={`arrow ${isReversed ? 'reversed' : ''}`}>⇅</span>
        </button>
        
        <span className="sort-order">
          {isReversed ? 'По убыванию' : 'По возрастанию'}
        </span>
      </div>
    </div>
  );
};

export default SortingButtons;