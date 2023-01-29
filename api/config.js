import fs from 'fs';
import mongoose from "mongoose";

async function connectDB() {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb Connected: ${conn.connection.host}`)
    } catch (e) {
        console.error(`Error: ${e.message}`)
        process.exit(1)
    }
}

function init()
{
    connectDB();
    global.config = {
        jwt: {
            private: undefined, // fs.readFileSync('./ressources/private.key', 'utf-8'),
            public: undefined // fs.readFileSync('./ressources/public.pem', 'utf-8')
        }
    };
}

export default {
    init
}