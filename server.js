import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import config from './config.js'
import createApiRoutes from './routes/apiRoutes.js'

dotenv.config();
global.config = config;

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

createApiRoutes(app);

// Get port from .env and start server
const PORT = process.env.PORT || 80;
app.listen(PORT, console.log(`Running on http://localhost:${PORT}`));