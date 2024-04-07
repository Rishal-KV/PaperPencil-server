import {model,Schema} from 'mongoose';
import Category from '../../domain/categroy';
const categorySchema  = new Schema({
    name : {
        type: String,
        required : true
    },
    is_blocked : {
        type : Boolean,
        default : false
    }
});

let categoryModel = model<Category>('category', categorySchema);
export default categoryModel;
