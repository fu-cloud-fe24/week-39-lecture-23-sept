import { useState, useEffect } from 'react';
import './homePage.css';
import { useNavigate } from 'react-router-dom';
import BookingBar from '../../components/BookingBar/BookingBar';
import Logo from '../../components/Logo/Logo';
import RoomSection from '../../components/RoomSection/RoomSection';
import Button from '../../components/Button/Button';
import NavBar from '../../components/NavBar/NavBar';
import bg from '../../assets/bg1.jpg';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <section className="home-page" >
            <Logo />
            <NavBar />
            <section className="home-page__hero" style={{ backgroundImage: `url(${bg})`}}>
                <BookingBar />
                <i className="arrow fa-solid fa-angles-down"></i>
            </section>
            <RoomSection />
        </section>
    )
}

export default HomePage;
