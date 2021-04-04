import axios from "axios";
import { decryptData, encryptData } from "./encryption";

const HTTP = axios.create({
    withCredentials: true
})

export const authGetRequest = (endpoint) => {
    return HTTP.get(`${process.env.REACT_APP_API}/${endpoint}`)
        .then(response => {
            return decryptData(response.data.data);
        });
};

export const authPostRequest = (endpoint, data) => {
    return HTTP.post(`${process.env.REACT_APP_API}/${endpoint}`, {
        data: encryptData(data)
    })
        .then(response => {
            return decryptData(response.data.data);
        });
};