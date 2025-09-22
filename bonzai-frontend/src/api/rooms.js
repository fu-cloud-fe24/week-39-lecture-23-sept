import axios from 'axios';

export const fetchRooms = async () => {
    const response = await axios.get('https://zrj3mqpb1e.execute-api.eu-north-1.amazonaws.com/api/rooms')
        .then(response => { return response })
        .catch(error => { return error });
    if(response.status === 200) {
        return response.data.rooms;
    } else {
        return [];
    }
}