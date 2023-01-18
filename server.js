import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import createApiRoutes from './routes/apiRoutes.js'

dotenv.config();

const app = express();
app.use(morgan('tiny'));

createApiRoutes(app);

// Get port from .env and start server
const PORT = process.env.PORT || 80;
app.listen(PORT, console.log(`Running on http://localhost:${PORT}`));