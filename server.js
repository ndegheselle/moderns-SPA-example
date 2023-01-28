import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import config from './config.js'
import createApiRoutes from './routes/apiRoutes.js'

dotenv.config();

config.init();

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

createApiRoutes(app);

// Get port from .env and start server
const PORT = process.env.PORT || 80;
app.listen(PORT, console.log(`Running on http://localhost:${PORT}`));