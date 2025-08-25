import './CardDetail.css'

export const CardDetail = ({name, surname, fathername, birthdate, imageUrl, workingPlace, grade}) => {
    return (
    <div className='card-detail'>
        <img src={imageUrl} alt="фото" width='250px' height='250px' className='card-image' draggable="false"/>
        <div className='card-data'>
            <h1 className='card-header'>{surname}</h1>
            <h1 className='card-header'>{name} {fathername}</h1>
            <p>{birthdate}</p>
            <p>{workingPlace}</p>
            <p>{grade}</p>
        </div>
    </div>
    )
}