interface Instructor {
  _id: string;
  name: string;
  email: string;
  password: string;
  is_blocked: boolean;
  is_verified: boolean;
  about: string;
  googleId: string;
}
export default Instructor;
