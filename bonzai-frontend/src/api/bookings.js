import axios from 'axios';

export const postBooking = async (data, token) => {
    const response = await axios.post('https://zrj3mqpb1e.execute-api.eu-north-1.amazonaws.com/api/bookings',
        data,
        {
            headers : {
                Authorization : token,
                'Content-Type' : 'application/json'
            }
        }
    )
    .then(response => { return response; })
    .catch(error => { return error; });

    if(response.status === 200) {
        return response;
    } else {
        return response.response.data.message;
    }
}

export const getBookings = async (data, token) => {
    const response = await axios.get('https://zrj3mqpb1e.execute-api.eu-north-1.amazonaws.com/api/bookings',
        {
            headers : {
                Authorization : token,
                'Content-Type' : 'application/json'
            }
        }
    )
    .then(response => { return response; })
    .catch(error => { return error; });

    if(response.status === 200) {
        return response;
    } else {
        return response.data.message;
    }
}

export const cancelBooking = async (id, token) => {
    const response = await axios.patch('https://zrj3mqpb1e.execute-api.eu-north-1.amazonaws.com/api/bookings/' + id,
        {
            status : 'CANCELLED'
        },
        {
            headers : {
                Authorization : token,
                'Content-Type' : 'application/json'
            }
        }
    )
    .then(response => { return response; })
    .catch(error => { return error; });

    if(response.status === 201) {
        return response;
    } else {
        return response.data.message;
    }
}