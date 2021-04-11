import axios from "axios";

export const fetchUser = email => {
    return axios({
        method: 'get',
        url: `http://localhost:5000/api/v1/users/${email}`,
        headers: {
            'Access-Control-Allow-Origin': "*"
        }
    });
}