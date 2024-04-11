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
categorySchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });
let categoryModel = model<Category>('category', categorySchema);
export default categoryModel;
