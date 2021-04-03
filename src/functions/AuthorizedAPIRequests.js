import axios from "axios";

export const authGetRequest = (endpoint) => {
    return axios.get(`${process.env.REACT_APP_API}/${endpoint}`, {
        withCredentials: true
    });
};

export const authPostRequest = (endpoint, data) => {
    return axios.post(`${process.env.REACT_APP_API}/${endpoint}`, data, {
        withCredentials: true
    });
};