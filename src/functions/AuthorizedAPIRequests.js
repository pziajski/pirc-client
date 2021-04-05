import axios from "axios";
import { decryptData, encryptData } from "./encryption";

const HTTP = axios.create({
    withCredentials: true
})

export const authGetRequest = (endpoint) => {
    return HTTP.get(`${process.env.REACT_APP_API}/${endpoint}`)
        .then(response => {
            const decryptedData = decryptData(response.data.data);
            console.log(decryptedData)
            return decryptedData;
        });
};

export const authPostRequest = (endpoint, data) => {
    return HTTP.post(`${process.env.REACT_APP_API}/${endpoint}`, {
        data: encryptData(data)
    })
        .then(response => {
            const decryptedData = decryptData(response.data.data);
            console.log(decryptedData)
            return decryptedData;;
        });
};