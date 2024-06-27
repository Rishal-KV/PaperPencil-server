import mongoose, { Schema } from "mongoose";
import Instructor from "../../domain/instructor";
const instructorShema = new Schema<Instructor>({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  is_blocked: {
    type: Boolean,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
  },
  phone: {
    type: Number,
  },
  about: {
    type: String,
  },
  googleId: {
    type: String,
  },
  googleAuth : {
    type : Boolean,
    default : false
  }
});

const instructorModel = mongoose.model<Instructor>(
  "instructor",
  instructorShema
);
export default instructorModel;
