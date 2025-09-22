import { useState, useEffect } from 'react'
import { fetchRooms } from '../../api/rooms';
import Room from '../Room/Room';
import './roomSection.css';
import { useRoomStore } from '../../stores/useRoomStore';

const RoomSection = () => {
    const rooms = useRoomStore(state => state.rooms);
    const setRooms = useRoomStore(state => state.setRooms);

    useEffect(() => {
        const setupRooms = async () => {
            const response = await fetchRooms();
            const r = [];
            console.log(response);
            response.map(item => {
                r.push(item.attributes);
            })
            setRooms(r);
        }
        setupRooms();
    }, []);

    useEffect(() => {
        console.log('Rooms:', rooms);
    }, [rooms]);

    return (
        <section id="rooms" className="rooms">
            {
                rooms && rooms.map((room, index) => <Room key={ index } room={ room } />)
            }
        </section>
    )
}

export default RoomSection;
