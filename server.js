import express from 'express'
import dotenv from 'dotenv'
import path from 'node:path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
app.use(morgan('tiny'));

// Return an HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Return JSON data
app.get('/api', (req, res) => {
    res.status(200).json({msg: "Some API data."});
});

// Get port from .env and start server
const PORT = process.env.PORT || 80;
app.listen(PORT, console.log(`Running on http://localhost:${PORT}`));