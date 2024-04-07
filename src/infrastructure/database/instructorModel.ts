import mongoose, { Schema } from "mongoose";
import Instructor from "../../domain/instructor";
const instructorShema = new Schema({
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
  about: {
    type: String,
  },
  googleId:{
    type : String
}
});

const instructorModel = mongoose.model<Instructor>(
  "instructor",
  instructorShema
);
export default instructorModel;
