import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        allowNull: false
    },
    lastName: {
        type: String,
        required: true,
        allowNull: false
    },
    email: {
        type: String,
        required: true,
        allowNull: false,
        unique: true
    },
    password: {
        type: String,
        allowNull: false,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
export default User;