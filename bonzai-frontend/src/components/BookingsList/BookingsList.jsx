import {useEffect, useState} from 'react'
import { useAuthToken } from '../../hooks/useAuthToken';
import './bookingsList.css';
import { cancelBooking, getBookings } from '../../api/bookings';

const BookingsList = ({type}) => {
    const [bookings, setBookings] = useState([]); 
    const { token } = useAuthToken();

    useEffect(() => {
        fetchBookings();
    }, [token]);
    
    useEffect(() => {
        console.log(bookings);        
    }, [bookings]);
    
    const fetchBookings = async () => {
        const response = await getBookings({}, token);
        setBookings(response.data.bookings);
    }

    const handleCancel = async (id) => {
        console.log(id);
        await cancelBooking(id, token);
        fetchBookings();
    }

    return (
        <ul className="bookings__list">
            {
                bookings && bookings.map((booking, index) => {
                    return (
                        <li key={index} className="bookings__item">
                            <p className="bookings__info">{`#${booking.GSI1SK}`}</p>
                            {
                                type === "admin"
                                && <p className="bookings__info">{booking.PK.split('#')[1]}</p>
                            }
                            <p className="bookings__info">Guests: {`${booking.attributes.guests}`}</p>
                            <p className="bookings__info">
                                Rooms: {
                                    (booking?.attributes?.rooms || []).reduce(
                                    (sum, room) => sum + (Number(room.count) || 0),
                                    0
                                    )
                                }
                            </p>                                   
                            <p className="bookings__info">{`${booking.attributes.status}`}</p>
                            {
                                booking.attributes.status === 'CONFIRMED'
                                && <button onClick={ () => handleCancel(booking.GSI1SK) } className="bookings__button">Cancel</button>
                            }                                   
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default BookingsList;
