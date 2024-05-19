import { Schema, model } from "mongoose";
import Favourites from "../../domain/favourites";
const favouriteSchema = new Schema<Favourites>({
  studentId: {
    type : String,
   required : true
  },
  favourites: [
    {
      
      type: String,
      ref: "course",
    },
  ],
});

const favouriteModel = model("favourite", favouriteSchema);

export default favouriteModel;
