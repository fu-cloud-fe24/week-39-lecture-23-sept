import './bookingBar.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useSearchStore } from '../../stores/useSearchStore';

const BookingBar = () => {
    const fromRef = useRef();
    const toRef = useRef();
    const adultsRef = useRef();
    const kidsRef = useRef();
    const roomsRef = useRef();
    const setSearchFilter = useSearchStore(state => state.setSearchFilter);
    const navigate = useNavigate();

    const checkAvailability = (e) => {
        e.preventDefault();
        const preferences = {
            from : fromRef.current.value,
            to : toRef.current.value,
            adults : adultsRef.current.value,
            kids : kidsRef.current.value,
            rooms : roomsRef.current.value
        }
        setSearchFilter(preferences);
        navigate('/booking');
    }

    return (
        <section className="booking-bar">
            <section className="booking-bar__upper">
                <h2 className="booking-bar__title">Hotel Booking</h2>
                <form className="booking-bar__form">
                    <section className="booking-bar__input-group">
                        <input id="from" type="text" className="booking-bar__input" placeholder="" ref={ fromRef } />
                        <label htmlFor="from" className="booking-bar__label">From (Date)</label>
                    </section>
                    <section className="booking-bar__input-group">
                        <input id="to" type="text" className="booking-bar__input" placeholder="" ref={ toRef } />
                        <label htmlFor="to" className="booking-bar__label">To (Date)</label>
                    </section>
                    <section className="booking-bar__input-group">
                        <input id="adults" type="number" className="booking-bar__input" placeholder="" ref={ adultsRef } required />
                        <label htmlFor="adults" className="booking-bar__label">Adults</label>
                    </section>
                    <section className="booking-bar__input-group">
                        <input id="children" type="number" className="booking-bar__input" placeholder="" ref={ kidsRef } />
                        <label htmlFor="children" className="booking-bar__label">Children</label>
                    </section>
                    <section className="booking-bar__input-group">
                        <input id="rooms" type="number" className="booking-bar__input" placeholder="" ref={ roomsRef } required />
                        <label htmlFor="rooms" className="booking-bar__label">Rooms</label>
                    </section>
                    <button onClick={ checkAvailability } className="booking-bar__button">Check Availability</button>
                </form>
            </section>
            <section className="booking-bar__lower">
                <p className="booking-bar__text">To request an invitation to this exceptional New Year’s Jazz Festival, please contact the Bolza Family’s private office via email at reservations@reschio.com</p>
            </section>
        </section>
    )
}

export default BookingBar;
