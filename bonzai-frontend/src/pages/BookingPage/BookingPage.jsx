import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../stores/useSearchStore';
import { useRoomStore } from '../../stores/useRoomStore';
import './bookingPage.css';
import Logo from '../../components/Logo/Logo';
import { postBooking } from '../../api/bookings';
import { useAuthToken } from '../../hooks/useAuthToken';
import NavBar from '../../components/NavBar/NavBar';
import bg from '../../assets/bg2.jpg';

const BookingPage = () => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [aggregatedRooms, setAggregatedRooms] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const searchFilter = useSearchStore(state => state.searchFilter);
    const setSearchFilter = useSearchStore(state => state.setSearchFilter); 
    const roomTypes = useRoomStore(state => state.rooms);
    const navigate = useNavigate();
    const { token } = useAuthToken();

    const defaultFilter = {
        from: "",
        to: "",
        adults: 1,
        kids: 0,
        rooms: 1,
        specialRequest: ""
    };

    // Säkerställ att searchFilter alltid är initierat
    useEffect(() => {
        if (!searchFilter || Object.keys(searchFilter).length === 0) {
        setSearchFilter(defaultFilter);
        }
    }, []);

    useEffect(() => {
        setSelectedRooms(Array.from({ length: searchFilter.rooms || 0 }, () => ""));
    }, [searchFilter?.rooms]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSearchFilter({ ...searchFilter, [id]: value });
    };

    const handleRoomsChange = (e) => {
        const num = Number(e.target.value) || 0;
        setSearchFilter({ ...searchFilter, rooms: num });
    };

    const handleRoomSelect = (index, value) => {
        const updated = [...selectedRooms];
        updated[index] = value;

        const aggregated = updated.reduce((acc, type) => {
            if (!type) return acc;
            const found = acc.find(r => r.type === type.toUpperCase());
            if (found) {
                found.count += 1;
            } else {
                acc.push({ type: type.toUpperCase(), count: 1 });
            }
            return acc;
        }, []);

        setSelectedRooms(updated);
        setAggregatedRooms(aggregated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = {
            rooms : aggregatedRooms,
            guests : parseInt(searchFilter.adults) + parseInt(searchFilter.kids),
            specialRequest : searchFilter.specialRequest || ''
        }
        console.log("Booking data:", bookingData);
        const response = await postBooking(bookingData, token);
        console.log(response);      
        if(response.status !== 200)
            setErrorMsg(response);
        else {
            setErrorMsg('');
            navigate('/bookings');
        }
    };

  return (
    <section className="booking-page" style={{ backgroundImage: `url(${bg})`}}>
        <Logo />
        <NavBar />
        <section className="booking">
            <h2 className="booking__title">Booking</h2>
            {
                errorMsg.length > 0
                ? <p className="booking__error">{errorMsg}</p>
                : ''
            }
            <form className="booking__form" onSubmit={handleSubmit}>
                <section className="booking__input-group booking__input-group--span-three">
                    <input
                    id="from"
                    type="text"
                    className="booking__input"
                    value={searchFilter?.from}
                    onChange={handleChange}
                    />
                    <label htmlFor="from" className="booking__label">From (Date)</label>
                </section>

                <section className="booking__input-group booking__input-group--span-three">
                    <input
                    id="to"
                    type="text"
                    className="booking__input"
                    value={searchFilter?.to}
                    onChange={handleChange}
                    />
                    <label htmlFor="to" className="booking__label">To (Date)</label>
                </section>

                <section className="booking__input-group">
                    <input
                    id="adults"
                    type="number"
                    className="booking__input"
                    value={searchFilter?.adults}
                    onChange={handleChange}
                    required
                    />
                    <label htmlFor="adults" className="booking__label">Adults</label>
                </section>

                <section className="booking__input-group">
                    <input
                    id="kids"
                    type="number"
                    className="booking__input"
                    value={searchFilter?.kids}
                    onChange={handleChange}
                    />
                    <label htmlFor="kids" className="booking__label">Children</label>
                </section>

                <section className="booking__input-group">
                    <input
                    id="rooms"
                    type="number"
                    className="booking__input"
                    value={searchFilter?.rooms}
                    onChange={handleRoomsChange}
                    required
                    />
                    <label htmlFor="rooms" className="booking__label">Rooms</label>
                </section>

                { Array.from({ length: searchFilter?.rooms || 0 }, (_, i) => (
                    <section className="booking__input-group" key={i}>
                        <select
                            id={`room-${i}`}
                            className="booking__input"
                            value={selectedRooms[i] || ""}
                            onChange={(e) => handleRoomSelect(i, e.target.value)}
                        >
                            <option value="">Choose option</option>
                            {
                                roomTypes?.map((room) => (
                                    <option key={room.name} value={room.name}>
                                        {room.name}
                                    </option>
                                ))
                            }
                        </select>
                    </section>
                )) }
                <section className="booking__input-group booking__input-group--span-six">
                    <input
                    id="specialRequest"
                    type="text"
                    className="booking__input"
                    value={searchFilter?.specialRequest}
                    onChange={handleChange}
                    required
                    />
                    <label htmlFor="specialRequest" className="booking__label">Special Requests</label>
                </section>
                <button onClick={ handleSubmit } className="booking__button">Create booking</button>
            </form>
        </section>
    </section>
    );
};

export default BookingPage;
