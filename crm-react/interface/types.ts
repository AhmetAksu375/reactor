// src/types.ts
export interface User {
    id: string;
    name: string;
    email: string;
    // diğer kullanıcı özellikleri buraya eklenebilir
  }
  
  export interface RegisterResponse {
    user: User;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  
  export interface AuthError {
    message: string;
  }
  