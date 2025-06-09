export class CreateUserDto {
  username: string;
  email: string;
  googleId?: string; // Optional field for Google authentication
  password: string | undefined; // Password can be null for Google users ;
  role?: string | 'user' | 'admin'; // Optional field for user role, default is 'user'
}
