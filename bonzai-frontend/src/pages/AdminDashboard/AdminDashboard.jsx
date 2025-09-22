import Logo from '../../components/Logo/Logo';
import NavBar from '../../components/NavBar/NavBar';
import BookingsList from '../../components/BookingsList/BookingsList';
import bg from '../../assets/bg5.jpg';

const AdminDashboard = () => {
    
    return (
        <section className="bookings-page" style={{ backgroundImage: `url(${bg})`}}>
            <Logo />
            <NavBar />
            <section className="bookings">
                <h1 className="bookings__title">All bookings</h1>
                <BookingsList type="admin" />
            </section>
        </section>
    )
}

export default AdminDashboard;
