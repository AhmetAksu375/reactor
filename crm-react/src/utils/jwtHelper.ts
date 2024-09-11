// src/utils/jwtHelper.ts
import { jwtDecode } from 'jwt-decode';
import { auth } from './auth';
export const decodeToken = () => {
    const token = auth ?? "";
    try {
        // Token'ı decode ediyoruz
        const decoded = jwtDecode(token);

        // Çözülen bilgileri döndür
        return decoded; // Örneğin { username: 'user1', role: 'admin', exp: 1672531199 }
    } catch (error: any) {
        console.error('Token decode edilemedi:', error.message);
        return null;
    }
};
