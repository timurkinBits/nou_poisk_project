import './Card.css';

const CardPerson = ({ title, subtitle, text, imageUrl, onClick }) => {
  return (
    <div className='card' onClick={onClick}>
      {imageUrl && (
        <div className='card-image'>
          <img src={imageUrl} alt={title} />
        </div>
      )}
      <div className='card-content'>
        {subtitle && <h3 className='card-subtitle'>{subtitle}</h3>}
        <h2 className='card-title'>{title}</h2>
        <p className='card-text'>{text}</p>
      </div>
    </div>
  );
};

export default CardPerson;
