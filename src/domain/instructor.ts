interface Instructor {
  _id: string;
  name: string;
  email: string;
  password: string;
  is_blocked: boolean;
  phone:number;
  is_verified: boolean;
  imageUrl:string
  about: string;
  googleId: string;
  googleAuth : boolean
}
export default Instructor;
