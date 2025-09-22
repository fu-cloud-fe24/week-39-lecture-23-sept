import axios from 'axios';
import { useAuthToken } from '../hooks/useAuthToken';

export const postBooking = async (data, token) => {
    const result = await axios.post('https://zrj3mqpb1e.execute-api.eu-north-1.amazonaws.com/api/bookings', 
        data,
        {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(response => { return response })
    .catch(error => {return error.response });

    if(result.status === 200) {
        return result;
    } else {
        return result.data.message;
    }
}

export const getBookings = async (data, token) => {
    console.log(token);
    const result = await axios.get('https://zrj3mqpb1e.execute-api.eu-north-1.amazonaws.com/api/bookings', 
        {   
            params : data,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(response => { return response })
    .catch(error => {return error.response });

    if(result.status === 200) {
        return result;
    } else {
        return result.data.message;
    }
}

export const cancelBooking = async (id, token) => {
    const result = await axios.patch(`https://zrj3mqpb1e.execute-api.eu-north-1.amazonaws.com/api/bookings/${id}`, 
        {   
            status : 'CANCELLED' ,
        },
        {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(response => { return response })
    .catch(error => {return error.response });

    if(result.status === 201) {
        return result;
    } else {
        console.log(result.data);
        return result.data.message;
    }
}