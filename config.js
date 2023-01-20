import fs from 'fs';

export default {
    jwt: {
        private: fs.readFileSync('./ressources/private.key', 'utf-8'),
        public: fs.readFileSync('./ressources/public.pem', 'utf-8')
    }
}