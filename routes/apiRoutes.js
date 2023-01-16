import express from 'express'
import { apiNotFound, apiErrorHandler } from '../middlewares/apiErrorMiddleware.js'

const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({msg: "Some API data."});
});

export default function(app) {
    app.use(`/api/v${process.env.API_VERSION}`, router);
    app.use('/api', apiNotFound);
    app.use('/api', apiErrorHandler);
};