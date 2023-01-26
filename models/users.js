import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});


export const usersModel = mongoose.model('users', usersSchema);
export const usersRepository = {
    getByUsernamePassword: async function(username, password) {
        const user = await userModel.findOne({ username }).select('+password').exec();
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) return user;
        return null;
    }
};