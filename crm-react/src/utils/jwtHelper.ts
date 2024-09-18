// src/utils/jwtHelper.ts
import {jwtDecode} from 'jwt-decode';
import { auth } from './auth';
export interface DecodedToken {
  aud: string;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  nameid: string;
  nbf: number;
  unique_name: string;
  departmant: string;
  departmantId: string;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error('Token decode edilemedi:', error);
    return null;
  }
};

export const authController = () => {
 if (auth !== null) {
   const decodedToken = decodeToken(auth);
   return decodedToken;
 }
}