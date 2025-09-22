import axios from 'axios';

export const loginApi = async (data) => {
    const result = await axios.post('https://zrj3mqpb1e.execute-api.eu-north-1.amazonaws.com/api/auth/login', data)
    .then(response => { return response })
    .catch(error => {return error.response });

    if(result.status === 200) {
        return result;
    } else {
        return result.data.message;
    }
}

export const registerApi = async (data) => {
    const result = await axios.post('https://zrj3mqpb1e.execute-api.eu-north-1.amazonaws.com/api/auth/register', data)
    .then(response => { return response })
    .catch(error => {return error.response });

    if(result.status === 201) {
        return result;
    } else {
        return result.data.message;
    }
}