export class CreateUserDto {
  username: string;
  email: string;
  googleId?: string; // Optional field for Google authentication
  password: string | undefined; // Password can be null for Google users ;
}
