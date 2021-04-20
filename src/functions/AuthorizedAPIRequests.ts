import axios from "axios";
import { decryptData, encryptData } from "./encryption";

export const authGetRequest = (endpoint: String) => {
    return axios.get(`${process.env.REACT_APP_API}/${endpoint}`, {
        headers: {
            token: !!localStorage.getItem("authToken") ? localStorage.getItem("authToken") : ""
        }
    })
        .then(response => {
            const decryptedData = decryptData(response.data.data);
            return decryptedData;
        });
};

export const authPostRequest = (endpoint: String, data: {}) => {
    return axios.post(`${process.env.REACT_APP_API}/${endpoint}`, {
        data: encryptData(data)
    }, {
        headers: {
            token: !!localStorage.getItem("authToken") ? localStorage.getItem("authToken") : ""
        }
    })
        .then(response => {
            const decryptedData = decryptData(response.data.data);
            return decryptedData;
        });
};