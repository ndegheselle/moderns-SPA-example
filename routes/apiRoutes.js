import express from 'express'
import { apiNotFound, apiErrorHandler } from '../middlewares/apiError.js'
import authController from '../controllers/auth.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router();

router.post('/auth/login', authController.login);
router.post('/auth/login', authController.logout);

router.get('/test', authMiddleware.check, (req, res) => {
    res.status(200).json({msg: "Some API data."});
});

export default function(app) {
    app.use(`/v${process.env.API_VERSION}`, router);
    app.use(apiNotFound);
    app.use(apiErrorHandler);
};