import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import sessions from 'express-session'

import createApiRoutes from './routes/apiRoutes.js'

dotenv.config();

const app = express();
app.use(morgan('tiny'));
app.use(express.json());

app.use(sessions({
    secret: process.env.SESSION_SECRET,  
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // for HTTPS only
      maxAge: Number(process.env.SESSION_TIME)
    } 
  }));

createApiRoutes(app);

// Get port from .env and start server
const PORT = process.env.PORT || 80;
app.listen(PORT, console.log(`Running on http://localhost:${PORT}`));