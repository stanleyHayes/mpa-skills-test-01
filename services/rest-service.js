import axios from "axios";
import {PRODUCTION_SERVER_URL} from "../constants/constants";

export const fetchUser = email => {
    return axios({
        method: 'get',
        url: `${PRODUCTION_SERVER_URL}/api/v1/users/${email}`,
        headers: {
            'Access-Control-Allow-Origin': "*"
        }
    });
}