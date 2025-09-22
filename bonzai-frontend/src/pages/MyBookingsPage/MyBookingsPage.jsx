import './myBookingsPage.css';
import Logo from '../../components/Logo/Logo';
import NavBar from '../../components/NavBar/NavBar';
import BookingsList from '../../components/BookingsList/BookingsList';
import bg from '../../assets/bg3.jpg';

const MyBookingsPage = () => {
    return (
        <section className="bookings-page" style={{ backgroundImage: `url(${bg})`}}>
            <Logo />
            <NavBar />
            <section className="bookings">
                <h1 className="bookings__title">My Bookings</h1>
                <BookingsList />
            </section>
        </section>
    )
}

export default MyBookingsPage;
