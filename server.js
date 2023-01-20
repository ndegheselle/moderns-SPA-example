import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import config from './config.js'
import createApiRoutes from './routes/apiRoutes.js'

dotenv.config();
global.config = config;

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
// Manage cookies
app.use((req, res, next) => {
    const { headers: { cookie } } = req;
    if (cookie) {
        const values = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return { ...res, [data[0]]: data[1] };
        }, {});
        res.locals.cookie = values;
    }
    else res.locals.cookie = {};
    next();
});

createApiRoutes(app);

// Get port from .env and start server
const PORT = process.env.PORT || 80;
app.listen(PORT, console.log(`Running on http://localhost:${PORT}`));