import axios from "axios";

const DOMAIN = 'http://localhost:4001';

const requestAPI = async ({method = 'GET', url = '' , data = {}}) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios({
            method: method,
            url: `${DOMAIN}${url}`,
            data: data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res;
    }catch(err) {
        alert(err);
        return null;
    }
}

export default requestAPI;