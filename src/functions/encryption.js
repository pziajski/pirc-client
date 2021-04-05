import CryptoJS from "react-native-crypto-js";

export const encryptData = (data) => {
    const stringifiedData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringifiedData, process.env.REACT_APP_HASH_KEY).toString();
}

export const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_HASH_KEY);
    const response = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(response);
}