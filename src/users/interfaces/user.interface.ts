export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  googleId?: string; // Optional field for Google authentication
  role?: string | 'user' | 'admin'; // Optional field for user role, default is 'user'
}
