import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from "#auth";

import { getByUsernamePassword } from '../../repositories/users.js'

export default NuxtAuthHandler({
    secret: process.env.JWT_KEY,
    providers: [
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            authorize(credentials) {
                const user = getByUsernamePassword(credentials.username, credentials.password);

                if (!user) console.error('Warning: Malicious login attempt registered, bad credentials provided');
                return user;
            }
        })
    ]
})