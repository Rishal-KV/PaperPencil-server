import mongoose,{Schema} from "mongoose";

let adminSchema = new  Schema({
    email :{
        type :String,
          require:true

    },
    password : {
        type : String,
        require : true

    }
})

const adminModel = mongoose.model('admin',adminSchema);
export default adminModel