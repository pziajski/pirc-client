import axios from "axios";

const HTTP = axios.create({
    withCredentials: true
})

export const authGetRequest = (endpoint) => {
    return HTTP.get(`${process.env.REACT_APP_API}/${endpoint}`);
};

export const authPostRequest = (endpoint, data) => {
    return HTTP.post(`${process.env.REACT_APP_API}/${endpoint}`, data);
};