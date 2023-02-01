import bcrypt from 'bcrypt';

export const usersRepository = {
    getByUsernamePassword: async function(username, password) {
        const user = await this.$prisma.findOne({ username }).select('+password').exec();
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return await this.$prisma.findById(user._id);
        };
        return null;
    },
    saveRefreshTokenId: async function(userId, tokenId) {
        const user = await this.$prisma.findById(userId);
        user.refreshTokenId = tokenId;
        user.save();
    }
};