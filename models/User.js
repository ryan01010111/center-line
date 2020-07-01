import mongoose, {Schema} from 'mongoose';
import FlightLogSchema from './FlightLogSchema';

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    logs: [FlightLogSchema]
});

const User = mongoose.model('User', UserSchema);
export default User;
