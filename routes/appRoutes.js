import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

router.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default function(app) {
    app.use('/', router);
    app.use(express.static(path.join(__dirname, '../public')));
};