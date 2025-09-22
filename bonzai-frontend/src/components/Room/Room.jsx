import './room.css';

const Room = ({ room }) => {
    return (
        <article className="room">
            <figure className="room__top">
                <img src={ room.imageUrl } alt="room image" className="room__img" />
            </figure>
            <section className="room__details">
                <h3 className="room__name">{ room.name }</h3>
                <p className="room__capacity">Capacity: { room.capacity }</p>
                <p className="room__description">
                    { room.description }
                </p>
                <p className="room__price">Price: { room.price } USD</p>
            </section>
        </article>
    )
}

export default Room;
