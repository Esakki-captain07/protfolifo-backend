import mongoose from "./index.js";
import {validateEmail} from '../common/validate.js'

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email`
        }
    },
    message:{
        type:String,
       required:[true,'Message Is Required ']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    collection: 'user',
    versionKey: false
});

const userModel = mongoose.model('user', userSchema);

export default userModel;