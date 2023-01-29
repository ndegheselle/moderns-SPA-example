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
    },
    refreshTokenId: {
        type: mongoose.Schema.Types.ObjectId,
        select: false
    }
});


export const usersModel = mongoose.model('users', usersSchema);
export const usersRepository = {
    getByUsernamePassword: async function(username, password) {
        const user = await usersModel.findOne({ username }).select('+password').exec();
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return await usersModel.findById(user._id);
        };
        return null;
    },
    saveRefreshTokenId: async function(userId, tokenId) {
        const user = await usersModel.findById(userId);
        user.refreshTokenId = tokenId;
        user.save();
    }
};