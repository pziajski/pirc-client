import * as CryptoTS from "crypto-ts";

const HASH_KEY = process.env.REACT_APP_HASH_KEY as string;

export const encryptData = (data: {}) => {
    const stringifiedData = JSON.stringify(data);
    const encryptedString = CryptoTS.AES.encrypt(stringifiedData, HASH_KEY).toString();
    return encryptedString;
}

export const decryptData = (data: {}) => {
    const bytes = CryptoTS.AES.decrypt(data as string, HASH_KEY);
    const response = bytes.toString(CryptoTS.enc.Utf8);
    return JSON.parse(response);
}