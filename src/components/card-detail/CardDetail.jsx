import './CardDetail.css'

export const CardDetail = ({
    name,
    surname,
    fathername,
    birthdate,
    imageUrl,
    workingPlace,
    grade,
}) => {
    return (
    <div className="card-detail">
        <img src={imageUrl} alt="photo" width="250px" height="250px" className='card-image'/>
        <div>
            <div>
                <div className='card-data'>
                    <h1 className='card-header'>{`${surname}`}</h1>
                    <h1 className='card-header'>{name} {fathername}</h1>
                    <p>{birthdate}</p>
                </div>
                <div className='card-work-data'>
                    <p>{workingPlace}</p>
                    <p>{grade}</p>
                </div>
            </div>
        </div>
    </div>)
}
