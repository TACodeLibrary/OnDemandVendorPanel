const AES_SECRET_KEY = import.meta.env.VITE_APP_AES_SECRET_KEY;
const AES_SECRET_IV = import.meta.env.VITE_APP_AES_SECRET_IV_KEY;


import * as CryptoJS from 'crypto-js';

const secretKey = CryptoJS.enc.Hex.parse(AES_SECRET_KEY);
const ivKey = CryptoJS.enc.Hex.parse(AES_SECRET_IV);


export const aesEncrypt = (data: string) => {
  const encrypted = CryptoJS.AES.encrypt(data, secretKey, {
    iv: ivKey,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  // Convert ciphertext to Hex string to match backend expectations
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
};

export const aesDecrypt = (encrypted: string) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted);
  const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypted = CryptoJS.AES.decrypt(encryptedBase64Str, secretKey, {
    iv: ivKey,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};


// export const decryptObjectValues = <T extends Record<string, any>>(object: T, keysToDecrypt: string[]): T => {
//   const decryptedObject: T = { ...object };

//   for (const key of keysToDecrypt) {
//     if (key in decryptedObject) {
//       decryptedObject[key] = decryptValue(decryptedObject[key], key);
//     }
//   }

//   return decryptedObject;
// };

export const decryptObjectValues = <T extends Record<string, any>>(object: T, keysToDecrypt: string[]): T => {
  const decryptedObject: T = { ...object };

  for (const key of keysToDecrypt) {
    if (key in decryptedObject) {
      // Use type assertion to allow assignment
      (decryptedObject as Record<string, any>)[key] = decryptValue(decryptedObject[key], key);
    }
  }

  return decryptedObject;
};


const decryptValue = (value: any, key: string | null = null): any => {
  if (typeof value === "string") {
    if (/Id*$/i.test(key || "") || key === "userRole") return Number(aesDecrypt(value));
    return aesDecrypt(value);
  } else if (Array.isArray(value)) {
    return value.map((item) => decryptValue(item));
  } else if (typeof value === "object" && value !== null) {
    const decryptedObj: Record<string, any> = {};
    for (const [subKey, subValue] of Object.entries(value)) {
      decryptedObj[subKey] = decryptValue(subValue, subKey);
    }
    return decryptedObj;
  } else {
    return value;
  }
};
