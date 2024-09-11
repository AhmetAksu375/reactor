// src/utils/jwtHelper.ts
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  aud: string;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  nameid: string;
  nbf: number;
  unique_name: string;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log('Decoded Token:', decoded); // Debugging için çıktıyı kontrol edin
    return decoded;
  } catch (error) {
    console.error('Token decode edilemedi:', error);
    return null;
  }
};
